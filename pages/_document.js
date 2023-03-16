import { MetaTags } from 'metadata';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <MetaTags />
          <link rel="icon" href="/favicon.ico" />
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-166996249-1"
          ></Script>
          {/* <!-- Google Analytics Code--> */}
          <Script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                    dataLayer.push(arguments);
                }
                gtag("js", new Date());
                gtag("config", "UA-166996249-1");
            `,
            }}
          />
          {/* Global Site Code Pixel - Facebook Pixel */}
          <Script
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '410753493216771');
            `,
            }}
          />
          <noscript>
            <noscript>
              <img
                height="1"
                width="1"
                src="https://www.facebook.com/tr?id=410753493216771&ev=PageView&noscript=1"
              />
            </noscript>
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
