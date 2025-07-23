"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { NavLink } from './NavLink';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: "/cars", label: "車両一覧" },
  { href: "/company", label: "会社概要" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/login", label: "ログイン" },
  { href: "/register", label: "新規登録", isButton: true },
];

const navVariants = {
  closed: { scaleY: 0, opacity: 0, transition: { when: "afterChildren" } },
  open: { scaleY: 1, opacity: 1, transition: { staggerChildren: 0.07, when: "beforeChildren", duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

const linkVariants = {
  closed: { opacity: 0, y: 20 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07 + 0.2, duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-yanbaru-emerald shadow-sm border-b border-yanbaru-emerald/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.png" alt="やんばるドライブ ロゴ" width={32} height={32} className="rounded" />
            <h1 className="text-2xl font-bold text-white">やんばるドライブ</h1>
          </Link>
          {/* PC用メニュー */}
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink href="/cars" className="text-white/80 hover:text-white transition-colors">車両一覧</NavLink>
            <NavLink href="/company" className="text-white/80 hover:text-white transition-colors">会社概要</NavLink>
            <NavLink href="/contact" className="text-white/80 hover:text-white transition-colors">お問い合わせ</NavLink>
            <NavLink href="/login" className="text-white/80 hover:text-white transition-colors">ログイン</NavLink>
            <NavLink href="/register">
              <Button className="bg-yanbaru-sunset hover:bg-yanbaru-sunset/90 text-white">新規登録</Button>
            </NavLink>
          </nav>
          {/* モバイル用ハンバーガー */}
          <div className="md:hidden flex items-center">
            <button
              className={`burger text-white focus:outline-none ${menuOpen ? 'toggle' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニューを開く"
            >
              {/* ハンバーガーアイコン（アニメーション付き） */}
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-8 h-1 bg-white rounded mb-1"
                style={{ display: 'block' }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-8 h-1 bg-white rounded mb-1"
                style={{ display: 'block' }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block w-8 h-1 bg-white rounded"
                style={{ display: 'block' }}
              />
            </button>
          </div>
        </div>
        {/* モバイルメニュー（jQuery風アニメーション＋各リンク遅延フェードイン） */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              key="mobile-menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={navVariants}
              style={{ overflow: "hidden", originY: 0 }}
              className="md:hidden bg-yanbaru-emerald px-4 py-4 rounded-b-lg shadow-lg z-50"
            >
              <ul className="flex flex-col space-y-4">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    {link.isButton ? (
                      <NavLink href={link.href} onClick={() => setMenuOpen(false)}>
                        <Button className="w-full bg-yanbaru-sunset hover:bg-yanbaru-sunset/90 text-white">{link.label}</Button>
                      </NavLink>
                    ) : (
                      <NavLink href={link.href} className="text-white/90 hover:text-white text-lg" onClick={() => setMenuOpen(false)}>{link.label}</NavLink>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
} 