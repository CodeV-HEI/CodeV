'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu } from 'lucide-react'
import { useState } from 'react'

const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Membres', href: '/members' },
    { name: 'Projets', href: '/projects' },
    { name: 'Statistiques', href: '/stats' },
]

export default function Navbar() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl px-4 py-3 bg-white/10 dark:bg-codev-dark/80 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl shadow-lg"
        >
            <div className="flex items-center justify-between">
                {/* Logo et nom */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/icon/favicon.png" alt="CodeV-HEI" width={32} height={32} className="rounded-full" />
                    <span className="text-xl font-bold text-codev-primary hidden sm:inline">CodeV</span>
                </Link>

                {/* Navigation desktop */}
                <div className="hidden md:flex items-center gap-2">
                    {navItems.map(item => (
                        <Button
                            key={item.href}
                            asChild
                            variant="ghost"
                            className={cn(
                                'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/10',
                                pathname === item.href && 'text-codev-primary bg-white/30 dark:bg-white/5'
                            )}
                        >
                            <Link href={item.href}>{item.name}</Link>
                        </Button>
                    ))}
                </div>

                {/* Actions (thème + menu mobile) */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Changer le thème</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-gray-700 dark:text-gray-300"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Menu mobile */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-2"
                >
                    {navItems.map(item => (
                        <Button
                            key={item.href}
                            asChild
                            variant="ghost"
                            className={cn(
                                'justify-start text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white',
                                pathname === item.href && 'text-codev-primary bg-white/30 dark:bg-white/5'
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Link href={item.href}>{item.name}</Link>
                        </Button>
                    ))}
                </motion.div>
            )}
        </motion.nav>
    )
}