import "../globals.css";
import { Inter } from "next/font/google";
import Layout from "./_layout/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: 'Rocket by NLP4BIA',
    description: 'Resources of Rocket by NLP4BIA',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Layout>
                    {children}
                </Layout>
            </body>
        </html>
    )
}
