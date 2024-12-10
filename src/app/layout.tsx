import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextDex",
  description: "Pokedex App Created w/ NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        {/* <ThemeProvider atribute="class" defaultTheme="dark">

        </ThemeProvider> */}
        <main className="flex min-h-screen flex-col items-center p-12  bg-black">
          <div className="w-full max-w-5xl items-center justify-between text-sm lg:flex">
            <nav>
              <Link href="/">
                <div className="flex flex-row items-center">
                  <Image
                    src={"/nextdex.svg"}
                    alt="logo button"
                    width={50}
                    height={50}
                  >
                  </Image>
                  <h2 className="text-2xl font-semibold text-white"> NextDex </h2>
                </div>
              </Link>        
            </nav>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
