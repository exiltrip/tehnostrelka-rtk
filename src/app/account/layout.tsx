import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Page",
    description: "Page description",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>)
{
    return (
        <html lang="en">
        <body className={inter.className}>
        <header>account layout</header>
        {children}
        </body>
        </html>
    );
}
