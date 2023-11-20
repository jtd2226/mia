import { MetaTags } from 'metadata';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <MetaTags />
          <link rel="icon" href="/favicon.ico" />
          <script src="https://www.googletagmanager.com/gtag/js?id=G-BHRJGXLN8Z" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-BHRJGXLN8Z");
`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
