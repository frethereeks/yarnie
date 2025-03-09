import type { Metadata } from "next";
// import { Urbanist, Inspiration } from "next/font/google"
// import localFont from "next/font/local";
import "../../globals.css";
import {Toaster} from "react-hot-toast"
import { Header, Footer } from "@/components";
// import { authOptions } from "@/lib/authOptions";
// import { getServerSession } from "next-auth";
import { eugusto, inspiration, urbanist } from "../layout";
import { Provider } from "@/provider/SessionProvider";

export const metadata: Metadata = {
  title: "BC Lounge Restaurant",
  description: "Food for the body is not enough. There must be food for the soul.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`${eugusto.variable} ${inspiration.variable} ${urbanist.variable} antialiased font-urbanist`}
      >
        <Provider>
          <Header />
          <Toaster />
          <div className="font-urbanist min-h-[80vh]">
            {children}
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
