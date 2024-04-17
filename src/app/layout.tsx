"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/ui/header/header";
import {SnackbarProvider} from "notistack";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <title>Ростелеком Поддержка</title>
    </head>
      <body className={inter.className}>
      <Header/>
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={4500} maxSnack={3}>
        {children}
      </SnackbarProvider>
      </body>
    </html>
  );
}
