'use client'

import { motion } from 'framer-motion'

interface LangData {
    [key: string]: number
}

export default function LanguageChart({ data }: { data: LangData }) {
    const total = Object.values(data).reduce((a, b) => a + b, 0)
    const sorted = Object.entries(data).sort((a, b) => b[1] - a[1])

    return (
        <div className="space-y-3">
            {sorted.map(([lang, bytes], index) => {
                const percent = ((bytes / total) * 100).toFixed(1)
                return (
                    <div key={lang} className="flex items-center gap-3">
                        <span className="w-20 text-sm font-medium text-foreground truncate">
                            {lang}
                        </span>
                        <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percent}%` }}
                                transition={{ delay: index * 0.05, duration: 0.6 }}
                                className="h-full bg-linear-to-r from-codev-primary to-purple-400 rounded-full flex items-center justify-end px-2 text-xs font-semibold text-white shadow-sm"
                                style={{ width: `${percent}%` }}
                            >
                                {percent}%
                            </motion.div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}