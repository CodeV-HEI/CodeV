import { getRepos, getMembers } from '@/lib/github'
import Background3D from '@/components/background/Background3D'
import HomeClient from '@/components/home/Home'

export default async function Home() {
  const repos = await getRepos()
  const members = await getMembers()

  const langData: { [key: string]: number } = {}
  for (const repo of repos) {
    if (repo.language) {
      langData[repo.language] = (langData[repo.language] || 0) + 1
    }
  }

  return (
    <>
      <Background3D />
      <HomeClient repos={repos} members={members} langData={langData} />
    </>
  )
}