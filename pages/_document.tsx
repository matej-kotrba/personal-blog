import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="dmchR1iKrhkYVD5fr6SeKdMuAadSjsiEbmRXWw8bM6U"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="Blog about web development technologies, tips and more. Read useful articles about React, CSS, Typescript and more."
        ></meta>
        <meta
          name="keywords"
          content="Blog, Sealblog, Matěj Kotrba, Matej Kotrba, matej kotrba"
        ></meta>
        <meta
          property="og:title"
          content="Sealblog - Blog about web development"
        />
        <meta
          property="og:description"
          content="Web development articles and tips."
        />
        <meta property="og:image" content="/imgs/general/logo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
