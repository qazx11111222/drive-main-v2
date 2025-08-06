import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "沖縄レンタカー",
  description: "沖縄の美しい景色を車で巡る",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="min-h-screen bg-yanbaru-sand">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
