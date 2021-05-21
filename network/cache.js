import { useCallback, useEffect, useState, useRef } from 'react';
import { debounce } from './util';
import { uniqueId } from 'lodash';
import { ClientError } from 'network/error';

const Cache = {
  queue: [],
  get(url) {
    const { data, loading = false, error } = Cache[url]?.state ?? {};
    return { data, loading, error };
  },
  set(url, state = {}) {
    if (!Cache[url]) {
      logger.warn(`No data found in cache for url: ${url}`);
      return;
    }
    Cache[url].state = state;
    const { listeners } = Cache[url];
    for (const id in listeners) listeners[id](state);
  },
  fetch(url, fetcher, ...args) {
    const { data, loading, error } = Cache.get(url);
    if (loading) return Promise.resolve(data);
    Cache.set(url, { data, error, loading: true });
    const state = { data };
    return fetcher(url, ...args)
      .then(data => {
        state.data = data;
        return data;
      })
      .catch(error => {
        state.error = error;
      })
      .finally(() => {
        state.loading = false;
        Cache.set(url, state);
      });
  },
  mutate(url, fetcher, mutator) {
    const { data, error } = Cache.get(url);
    Cache.set(url, { data, error, loading: true });
    const state = { data };
    return mutator.then(data => {
      fetcher(url)
        .then(data => {
          state.data = data;
        })
        .catch(error => {
          state.error = error;
          throw error;
        })
        .finally(() => {
          state.loading = false;
          Cache.set(url, state);
        });
      return data;
    });
  },
  new(url, fetcher, once) {
    return {
      add(callback) {
        if (!Cache[url]) Cache[url] = { listeners: {} };
        const { listeners } = Cache[url];
        const id = uniqueId('cache-listener-');
        listeners[id] = callback;
        const { data } = Cache.get(url);
        const send = data && once ? () => Promise.resolve(data) : fetcher;
        Cache.fetch(url, send);
        return id;
      },
      remove(id) {
        delete Cache[url].listeners[id];
        // TODO: set up cache invalidation
      },
    };
  },
};

export function useCache({ url, fetcher, wait = 0, once }) {
  return (function usePromiseCallback(url) {
    const promise = useCallback(() => {
      const send = wait ? debounce(fetcher, wait) : fetcher;
      return send(url);
    }, [url]);
    return (function useAsync(promise) {
      const [state, setState] = useState(Cache.get(url));
      useEffect(() => {
        const cache = Cache.new(url, promise, once);
        const id = cache.add(setState);
        return () => {
          cache.remove(id);
        };
      }, [promise]);
      return state;
    })(promise);
  })(url);
}

function useSync({ url, fetcher, mutator, wait = 0 }) {
  const promise = wait ? debounce(mutator, wait) : mutator;
  return (function usePromiseCallback(url) {
    const [[data, loading, error], setData] = useState([
      Cache[url]?.data,
      false,
      null,
    ]);
    const isMounted = useRef();
    useEffect(() => {
      isMounted.current = true;
      return () => {
        isMounted.current = false;
      };
    }, []);
    const send = useCallback(
      (...args) => {
        if (loading) return Promise.reject('Already sending');
        setData(([data]) => [data, true, null]);
        return promise(...args)
          .then(data => {
            const query = Cache.fetch(url, fetcher, ...args);
            return data ?? query;
          })
          .then(data => {
            if (!isMounted.current) return data;
            setData([data, false, null]);
            return data;
          })
          .catch(err => {
            if (!isMounted.current) return;
            setData(([data]) => [data, false, err]);
            throw err;
          });
      },
      [url, loading]
    );
    return { send, data, loading, error };
  })(url);
}

export const Path = (...args) => args.filter(x => !!x).join('/');

const CacheRequest = (url = '', query = '', options) =>
  (fullURL => ({
    url: url,
    queryParams: query,
    fullURL,
    next: function (callback) {
      return callback(CacheRequest(url, query, options));
    },
    path: (...args) => CacheRequest(Path(url, ...args), query, options),
    headers: headers => CacheRequest(url, query, { ...options, headers }),
    query: obj => {
      if (!obj || !Object.keys(obj).length)
        return CacheRequest(url, query, options);
      if (!query) query += '?';
      else query += '&';
      return CacheRequest(
        url,
        query +
          Object.entries(obj || {})
            .filter(([key, value]) => !!key && !!value)
            .map(
              ([key, value]) =>
                `${key}=${
                  typeof value === 'object' ? JSON.stringify(value) : value
                }`
            )
            .join('&'),
        options
      );
    },
    get POST() {
      return CacheRequest(url, query, { ...options, method: 'POST' });
    },
    get PUT() {
      return CacheRequest(url, query, { ...options, method: 'PUT' });
    },
    json: body =>
      CacheRequest(url, query, { ...options, body: JSON.stringify(body) }),
    raw: body => CacheRequest(url, query, { ...options, body }),
    form: obj => {
      const body = Object.entries(obj).reduce((f, [key, value]) => {
        f.append(key, value);
        return f;
      }, new FormData());
      return CacheRequest(url, query, {
        ...options,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...(options?.headers ?? {}),
        },
        body: new URLSearchParams(body),
      });
    },
    send: function () {
      return fetch(fullURL, options)
        .then(r => r.json())
        .then(data => {
          if (data.error) {
            console.error(data);
            throw new ClientError(data.error);
          } else return data;
        });
    },
    cache: function () {
      return Cache.fetch(fullURL, this.send);
    },
    useCache: function ({ wait, once, options }) {
      return useCache({
        url: fullURL,
        fetcher: this.send,
        wait,
        once,
        options,
      });
    },
    useSync: function ({ mutator, wait }) {
      return useSync({ url: fullURL, fetcher: this.send, mutator, wait });
    },
  }))(url + query);

const CachedRequest = CacheRequest();
export default CachedRequest;
