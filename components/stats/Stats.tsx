"use client";

import { useEffect, useState } from 'react'
import { getRepos } from '@/lib/github'
import Background3D from '@/components/background/Background3D'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { LanguageIcon } from '@/components/LangIcons';

interface Repository {
    name: string
    language: string | null
    stargazers_count: number
    forks_count: number
}

export default function StatsPage() {
    const [repos, setRepos] = useState<Repository[]>([])

    useEffect(() => {
        const fetchRepos = async () => {
            const data = await getRepos()
            setRepos(data ?? [])
        }

        fetchRepos()
    }, [])

    // Agrégation des langages (compte)
    const langCount: { [key: string]: number } = {}
    repos.forEach(repo => {
        if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1
        }
    })

    // Données pour le camembert
    const pieData = Object.entries(langCount).map(([name, value]) => ({ name, value }))

    // Données pour l'histogramme des stars et forks par repo (top 10)
    const topRepos = repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .map(repo => ({
            name: repo.name,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
        }))

    const COLORS = ['#6C63FF', '#FF6B6B', '#4ECDC4', '#FFB347', '#A8E6CF', '#DDA0DD', '#FFD700', '#FF8C00', '#00CED1', '#FF1493']

    return (
        <>
            <Background3D />
            <main className="relative z-10 min-h-screen px-4 py-12 text-white md:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Statistiques de l&apos;organisation</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Camembert : répartition des langages */}
                        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                            <h2 className="text-xl font-semibold mb-4">Répartition des langages</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#0D0D1A', borderColor: '#6C63FF' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Histogramme : stars & forks des top repos */}
                        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                            <h2 className="text-xl font-semibold mb-4">Top 10 projets (stars & forks)</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={topRepos} layout="vertical" margin={{ left: 80 }}>
                                    <XAxis type="number" />
                                    <YAxis type="category" dataKey="name" tick={{ fill: '#ccc' }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0D0D1A', borderColor: '#6C63FF' }} />
                                    <Legend />
                                    <Bar dataKey="stars" fill="#6C63FF" name="⭐ Stars" />
                                    <Bar dataKey="forks" fill="#FF6B6B" name="🔀 Forks" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Tableau des langages avec icônes */}
                    <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                        <h2 className="text-xl font-semibold mb-4">Tous les langages utilisés</h2>
                        <div className="flex flex-wrap gap-4">
                            {Object.entries(langCount).map(([lang, count]) => (
                                <div key={lang} className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-full">
                                    <LanguageIcon language={lang} className="w-6 h-6" />
                                    <span>{lang}</span>
                                    <span className="text-xs text-gray-400">{count} repo{count > 1 ? 's' : ''}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}