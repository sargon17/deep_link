import "./styles/style.scss";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Deeplink Redirector",
  description: "Redirect to the Instagram app or website",
  image: "https://instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico",
  url: "https://instagram.com",
  keywords: "instagram, deeplink, redirect, app, website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
