import { getMembers } from '@/lib/github'
import Background3D from '@/components/background/Background3D'
import MemberCard from '@/components/member/MemberCard'

export default async function MembersPage() {
    const members = await getMembers()

    return (
        <>
            <Background3D />
            <main className="relative z-10 min-h-screen px-4 py-12 text-white md:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Membres de CodeV-HEI</h1>
                    {members.length === 0 ? (
                        <p className="text-gray-400">Aucun membre public trouvé (l&apos;organisation est peut-être privée).</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
                            {members.map(m => (
                                <MemberCard key={m.login} {...m} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}