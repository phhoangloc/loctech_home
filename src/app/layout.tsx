import type { Metadata } from "next";
import { Crimson_Text, Roboto_Mono } from "next/font/google";
import "../style/globals.css";
import Header from "@/component/header";
import Provider from "@/redux/component/provider";
import Layout from "@/component/layout";

const crimson = Crimson_Text({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"]
});

const roboto = Roboto_Mono({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loctech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${crimson.variable} ${roboto.variable} bg-one`}>
        <Provider>
          <Layout>
            {children}
          </Layout>
        </Provider>
      </body>
    </html>
  );
}
