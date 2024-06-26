import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextDex",
  description: "Pokedex App Created w/ NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    //   <body className={inter.className}>{children}
    //     <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
    //         <Link href="/">
    //           <h2 className="text-2xl font-semibold">
    //             NextDex
    //           </h2>
    //         </Link>
    //       </div>
    //     </main>
    //   </body>
    // </html>
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <Link href="/">
            <h2 className="text-2xl font-semibold"> NextDex </h2>
          </Link>        
        </nav>
        {children}
      </body>
    </html>
  );
}
