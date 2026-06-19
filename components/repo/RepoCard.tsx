'use client'

import { motion } from 'framer-motion'
import { Star, GitFork, Code } from 'lucide-react'

interface RepoCardProps {
    name: string
    description: string
    language: string
    stargazers_count: number
    forks_count: number
    html_url: string
}

export default function RepoCard({
    name,
    description,
    language,
    stargazers_count,
    forks_count,
    html_url,
}: RepoCardProps) {
    return (
        <motion.a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="block p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-codev-primary transition-colors"
        >
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            {description && <p className="mt-1 text-sm text-gray-300 line-clamp-2">{description}</p>}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                {language && (
                    <span className="flex items-center gap-1">
                        <Code size={14} /> {language}
                    </span>
                )}
                <span className="flex items-center gap-1">
                    <Star size={14} /> {stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                    <GitFork size={14} /> {forks_count}
                </span>
            </div>
        </motion.a>
    )
}