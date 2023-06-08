// import "./styles/style.scss";
import "./globals.css";

import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Deeplink Redirector",
  description: "Redirect to the Instagram app or website",
  image: "https://instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico",
  url: "https://instagram.com",
  keywords: "instagram, deeplink, redirect, app, website",
};

// set up pwa

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Antonio:wght@600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="manifest"
          href="/manifest.json"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
