'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface MemberCardProps {
    login: string
    avatar_url: string
    html_url: string
}

export default function MemberCard({ login, avatar_url, html_url }: MemberCardProps) {
    return (
        <motion.a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 transition-all"
        >
            <Image
                src={avatar_url}
                alt={login}
                width={80}
                height={80}
                className="rounded-full border-2 border-codev-primary"
            />
            <span className="mt-2 text-sm font-medium text-white">{login}</span>
        </motion.a>
    )
}