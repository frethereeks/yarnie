import type { Metadata } from "next";
import { Play, Capriola } from "next/font/google"
import "../globals.css";

import NextTopLoader from "nextjs-toploader"
import { Toaster } from "react-hot-toast"
import { ClientProvider } from "@/provider/ClientProvider";
import ThemeProvider from "@/provider/ThemeProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import StoreProvider from "@/provider/ReduxProvider";
import { Footer, Header } from "@/modules/shared";

const play = Play({ subsets: ["latin"], variable: "--play", weight: ["400", "700"], fallback: ["Helvetica", "Arial", "sans-serif"] });
const capriola = Capriola({ subsets: ["latin"], variable: "--capriola", weight: ["400"], fallback: ["cursive"] });

export const metadata: Metadata = {
  title: "Yarnie Crotchet",
  description: "The Yarnie is all about a crochet making, crochet making is the process of creating fabric or other similar items using a crochet hook to interlock loops of yarn, thread, or other materials. It's a versatile craft that can be used to make a wide variety of items, from clothing and accessories to home décor and toys.",
};

export default async function OwnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${play.variable} ${capriola.variable} antialiased font-play`}>
        <ClientProvider>
          <AntdRegistry>
            <ThemeProvider>
              <StoreProvider>
                <NextTopLoader color="#e6e6e6" showSpinner={false} />
                <Header />
                <Toaster />
                <div className="font-play min-h-[80vh]">
                  {children}
                </div>
                <Footer />
              </StoreProvider>
            </ThemeProvider>
          </AntdRegistry>
        </ClientProvider>
      </body>
    </html>
  );
}
