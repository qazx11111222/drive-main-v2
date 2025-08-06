"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { NavLink } from './NavLink';
import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { User, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
  { href: "/", label: "トップページ" },
  { href: "/cars", label: "車両一覧" },
  { href: "/company", label: "会社概要" },
  { href: "/contact", label: "お問い合わせ" },
];

const navVariants: Variants = {
  closed: { scaleY: 0, opacity: 0 },
  open: { scaleY: 1, opacity: 1 },
};

const linkVariants: Variants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0 },
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    console.log('Header - Logout clicked');
    const { supabase } = await import('../../lib/supabaseClient');
    await supabase.auth.signOut();
    setUserMenuOpen(false);
  };



  console.log('Header - Auth state:', { user, loading });
  console.log('Header - User email:', user?.email);
  console.log('Header - User ID:', user?.id);
  console.log('Header - Loading state:', loading);

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
            <NavLink href="/" className="text-white/80 hover:text-white transition-colors">トップページ</NavLink>
            <NavLink href="/cars" className="text-white/80 hover:text-white transition-colors">車両一覧</NavLink>
            <NavLink href="/company" className="text-white/80 hover:text-white transition-colors">会社概要</NavLink>
            <NavLink href="/contact" className="text-white/80 hover:text-white transition-colors">お問い合わせ</NavLink>
            

            
            {/* ユーザー認証状態に応じた表示 */}
            {loading ? (
              <div className="text-white text-sm">認証状態を確認中...</div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                >
                  <UserCircle className="h-5 w-5" />
                  <span>{user.email || 'ユーザー'}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {user.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>ログアウト</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink href="/login" className="text-white/80 hover:text-white transition-colors">ログイン</NavLink>
                <NavLink href="/register">
                  <Button className="bg-yanbaru-sunset hover:bg-yanbaru-sunset/90 text-white">新規登録</Button>
                </NavLink>
              </>
            )}
          </nav>
          {/* モバイル用ハンバーガー */}
          <div className="md:hidden flex items-center space-x-2">
            {/* モバイル用ユーザーアイコン */}
            {!loading && user && (
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <UserCircle className="h-6 w-6" />
              </button>
            )}
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
                    <NavLink href={link.href} className="text-white/90 hover:text-white text-lg" onClick={() => setMenuOpen(false)}>{link.label}</NavLink>
                  </motion.li>
                ))}
                {/* モバイル用認証リンク */}
                {!loading && (
                  user ? (
                    <>
                      <motion.li
                        custom={navLinks.length}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <div className="text-white/90 text-lg border-t pt-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <UserCircle className="h-5 w-5" />
                            <span>{user.email}</span>
                          </div>
                          <button
                            onClick={() => {
                              handleLogout()
                              setMenuOpen(false)
                            }}
                            className="flex items-center space-x-2 text-white/80 hover:text-white"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>ログアウト</span>
                          </button>
                        </div>
                      </motion.li>
                    </>
                  ) : (
                    <>
                      <motion.li
                        custom={navLinks.length}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <NavLink href="/login" className="text-white/90 hover:text-white text-lg" onClick={() => setMenuOpen(false)}>ログイン</NavLink>
                      </motion.li>
                      <motion.li
                        custom={navLinks.length + 1}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <NavLink href="/register" onClick={() => setMenuOpen(false)}>
                          <Button className="w-full bg-yanbaru-sunset hover:bg-yanbaru-sunset/90 text-white">新規登録</Button>
                        </NavLink>
                      </motion.li>
                    </>
                  )
                )}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
} 