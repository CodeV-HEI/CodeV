import { getRepos } from '@/lib/github'
import Background3D from '@/components/background/Background3D'
import RepoCard from '@/components/repo/RepoCard'

export default async function ProjectsPage() {
    const repos = await getRepos()

    return (
        <>
            <Background3D />
            <main className="relative z-10 min-h-screen px-4 py-12 text-white md:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Projets de CodeV-HEI</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.map(repo => (
                            <RepoCard key={repo.name} {...repo} />
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}