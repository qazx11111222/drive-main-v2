"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-yanbaru-emerald">
              沖縄レンタカー
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-yanbaru-emerald px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                ホーム
              </Link>
              <Link
                href="/cars"
                className="text-gray-700 hover:text-yanbaru-emerald px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                車両一覧
              </Link>
              <Link
                href="/reservation"
                className="text-gray-700 hover:text-yanbaru-emerald px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                予約
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-yanbaru-emerald px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                会社概要
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-yanbaru-emerald px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                お問い合わせ
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-yanbaru-emerald focus:outline-none focus:text-yanbaru-emerald"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              href="/"
              className="text-gray-700 hover:text-yanbaru-emerald block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link
              href="/cars"
              className="text-gray-700 hover:text-yanbaru-emerald block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              車両一覧
            </Link>
            <Link
              href="/reservation"
              className="text-gray-700 hover:text-yanbaru-emerald block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              予約
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-yanbaru-emerald block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              会社概要
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-yanbaru-emerald block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
} 