import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Diplomata+SC&family=Micro+5&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Diplomata+SC&family=Girassol&family=Micro+5&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body className="antialiased max-w-md">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
