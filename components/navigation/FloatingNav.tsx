'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users, BarChart3, FolderGit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export default function FloatingNav() {
    const [activeSection, setActiveSection] = useState<string>('')

    const sections = useMemo(
        () => [
            { id: 'members', label: 'Membres', icon: Users },
            { id: 'languages', label: 'Langages', icon: BarChart3 },
            { id: 'projects', label: 'Projets', icon: FolderGit2 },
        ],
        []
    )

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    // Observer les sections pour mettre à jour l'icône active
    useEffect(() => {
        const observers = sections.map(({ id }) => {
            const el = document.getElementById(id)
            if (!el) return null
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id)
                    }
                },
                { threshold: 0.3 }
            )
            observer.observe(el)
            return observer
        })

        return () => {
            observers.forEach((obs) => obs?.disconnect())
        }
    }, [sections])

    return (
        <TooltipProvider>
            <motion.nav
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
            >
                {sections.map(({ id, label, icon: Icon }) => (
                    <Tooltip key={id}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => scrollToSection(id)}
                                className={cn(
                                    'h-12 w-12 rounded-full bg-background/10 backdrop-blur-sm border border-border text-foreground hover:bg-codev-primary/50 hover:border-codev-primary transition-all',
                                    activeSection === id &&
                                    'bg-codev-primary/70 border-codev-primary shadow-lg shadow-codev-primary/30'
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="sr-only">{label}</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="bg-codev-dark text-white border-codev-primary/20">
                            {label}
                        </TooltipContent>
                    </Tooltip>
                ))}
            </motion.nav>
        </TooltipProvider>
    )
}