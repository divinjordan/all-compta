import Header from "../shared/header";
import Footer from "../shared/footer";
import Head from "next/head";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="relative bg-primary  h-screen">
        <div className="bg-white mx-auto max-w-xl h-screen p-4">{children}</div>
      </main>
    </>
  );
}
