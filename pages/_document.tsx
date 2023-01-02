import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const keywords = `Blog, ${process.env.NEXT_PUBLIC_WEBSITE_TITLE}, Matěj Kotrba, Matej Kotrba, matej kotrba`;
  const og_title = `${process.env.NEXT_PUBLIC_WEBSITE_TITLE} - Blog about web development`;

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
        <meta name="keywords" content={keywords}></meta>
        <meta property="og:title" content={og_title} />
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
