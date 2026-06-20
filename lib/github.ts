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

// Récupération du token depuis les variables d'environnement
const token = process.env.GITHUB_TOKEN

// Headers avec authentification si token présent
function getHeaders(): HeadersInit {
    const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
    }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    return headers
}

// Récupérer les dépôts publics de l'organisation
export async function getRepos(): Promise<Repo[]> {
    try {
        const res = await fetch(`${BASE}/orgs/${ORG}/repos?per_page=100`, { headers: getHeaders() })
        if (!res.ok) {
            console.error(`GitHub API error (repos): ${res.status} ${res.statusText}`)
            return []
        }
        return await res.json()
    } catch (error) {
        console.error('Failed to fetch repos:', error)
        return []
    }
}

// Récupérer les membres (y compris ceux des organisations privées si token valide)
export async function getMembers(): Promise<Member[]> {
    try {
        const res = await fetch(`${BASE}/orgs/${ORG}/members?per_page=100`, { headers: getHeaders() })
        if (!res.ok) {
            console.error(`GitHub API error (members): ${res.status} ${res.statusText}`)
            // Si l'erreur est 403 ou 404, on tente de récupérer les membres publics via une autre route ?
            // Par défaut, on retourne [].
            return []
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.error('Failed to fetch members:', error)
        return []
    }
}

// Récupérer les langages d'un dépôt
export async function getLanguages(repo: string) {
    try {
        const res = await fetch(`${BASE}/repos/${ORG}/${repo}/languages`, { headers: getHeaders() })
        if (!res.ok) return {}
        return await res.json()
    } catch {
        return {}
    }
}