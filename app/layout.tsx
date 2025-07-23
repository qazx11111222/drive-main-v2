import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import AnimatedPage from './components/AnimatedPage';
import { NavLink } from './components/NavLink';
import { useState } from 'react';
import Header from './components/Header';

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <AnimatedPage>{children}</AnimatedPage>
      </body>
    </html>
  )
}
