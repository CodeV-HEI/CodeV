const ORG = 'CodeV-HEI'
const BASE = 'https://api.github.com'

export interface Repo {
    name: string
    description: string
    language: string
    stargazers_count: number
    forks_count: number
    html_url: string
    pushed_at: string
}

export interface Member {
    login: string
    avatar_url: string
    html_url: string
}

// Récupérer les dépôts publics de l'organisation – renvoie [] en cas d'erreur
export async function getRepos(): Promise<Repo[]> {
    try {
        const res = await fetch(`${BASE}/orgs/${ORG}/repos?per_page=100`)
        if (!res.ok) return []
        return await res.json()
    } catch {
        return []
    }
}

// Récupérer les membres – renvoie [] en cas d'erreur
export async function getMembers(): Promise<Member[]> {
    try {
        const res = await fetch(`${BASE}/orgs/${ORG}/members`)
        if (!res.ok) return []
        return await res.json()
    } catch {
        return []
    }
}

// (Optionnel) Récupérer les langages d'un dépôt
export async function getLanguages(repo: string) {
    try {
        const res = await fetch(`${BASE}/repos/${ORG}/${repo}/languages`)
        if (!res.ok) return {}
        return await res.json()
    } catch {
        return {}
    }
}