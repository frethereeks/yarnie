import type { Metadata } from "next";
import { Montserrat, Sofia_Sans } from "next/font/google"
import "../globals.css";
import { Toaster } from "react-hot-toast"
import ThemeProvider from "@/provider/ThemeProvider";
import { AntdRegistry } from '@ant-design/nextjs-registry'
import DashLayout from "@/modules/admin/layout/DashLayout";
import DashImage from "@/modules/admin/layout/DashImage";

export const montserrat = Montserrat({ subsets: ["latin"], variable: "--montserrat", weight: "400", fallback: ["Helvetica", "Arial", "sans-serif"] });
export const sofia = Sofia_Sans({ subsets: ["latin"], variable: "--sofia", weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], fallback: ["cursive"] });

export const metadata: Metadata = {
    title: "Yarnie Crotchet",
    description: "The Yarnie is all about a crochet making, crochet making is the process of creating fabric or other similar items using a crochet hook to interlock loops of yarn, thread, or other materials. It's a versatile craft that can be used to make a wide variety of items, from clothing and accessories to home décor and toys.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body className={`${montserrat.variable} ${sofia.variable} antialiased font-montserrat relative`}>
                <AntdRegistry>
                    <ThemeProvider>
                        <Toaster />
                        <DashLayout image={<DashImage />}>
                            <div className="font-montserrat min-h-[80vh]"> {children} </div>
                        </DashLayout>
                    </ThemeProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}
