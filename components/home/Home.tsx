'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Users, FolderGit2, Code } from 'lucide-react'
import MemberCard from '@/components/member/MemberCard'
import RepoCard from '@/components/repo/RepoCard'
import LanguageChart from '@/components/LanguageChart'
import { Member, Repo } from '@/lib/github'
import FloatingNav from '@/components/navigation/FloatingNav'
import { Button } from '@/components/ui/button'

interface HomeClientProps {
    repos: Repo[]
    members: Member[]
    langData: { [key: string]: number }
}

export default function HomeClient({ repos = [], members = [], langData = {} }: HomeClientProps) {
    const displayedMembers = (members || []).slice(0, 6)
    const displayedRepos = (repos || []).slice(0, 6)
    const totalLanguages = Object.keys(langData).length

    return (
        <>
            <FloatingNav />
            <main className="relative z-10 min-h-screen px-4 py-12 text-foreground md:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-20 pt-20"
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold bg-linear-to-r from-codev-primary via-purple-400 to-pink-500 bg-clip-text text-transparent"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            CodeV
                        </motion.h1>
                        <motion.p
                            className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Pôle de développement logiciel par des étudiants passionnés.
                            Découvrez nos projets, nos membres et nos statistiques.
                        </motion.p>
                        <motion.div
                            className="mt-8 flex flex-wrap justify-center gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Button
                                asChild
                                variant="default"
                                size="lg"
                                className="bg-codev-primary hover:bg-codev-primary/80 text-white shadow-lg shadow-codev-primary/30 hover:shadow-codev-primary/50 transition-all duration-300"
                            >
                                <Link href="/projects">
                                    Explorer les projets <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="border-border bg-background text-foreground hover:bg-muted hover:border-codev-primary/50 transition-all duration-300"
                            >
                                <Link href="/members">Rencontrer l&apos;équipe</Link>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Stats rapides */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        {[
                            { icon: FolderGit2, label: 'Projets', value: repos.length },
                            { icon: Users, label: 'Membres', value: members.length },
                            { icon: Code, label: 'Langages', value: totalLanguages },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
                            >
                                <stat.icon className="h-8 w-8 mx-auto text-codev-primary" />
                                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Aperçu Membres */}
                    {members.length > 0 && (
                        <section className="mt-16" id="members">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold">Membres</h2>
                                <Link
                                    href="/members"
                                    className="text-codev-primary hover:underline flex items-center gap-1 transition-colors"
                                >
                                    Voir tous <ArrowRight size={16} />
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                                {displayedMembers.map(m => (
                                    <MemberCard key={m.login} {...m} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Aperçu Langages - amélioré */}
                    <section className="mt-16" id="languages">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold">Langages les plus utilisés</h2>
                            <Link
                                href="/stats"
                                className="text-codev-primary hover:underline flex items-center gap-1 transition-colors"
                            >
                                Voir les stats <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border shadow-sm">
                            <LanguageChart data={langData} />
                        </div>
                    </section>

                    {/* Aperçu Projets */}
                    <section className="mt-16" id="projects">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold">Projets récents</h2>
                            <Link
                                href="/projects"
                                className="text-codev-primary hover:underline flex items-center gap-1 transition-colors"
                            >
                                Voir tous <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedRepos.map(repo => (
                                <RepoCard key={repo.name} {...repo} />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}