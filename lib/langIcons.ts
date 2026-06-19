// lib/langIcons.ts
import * as SimpleIcons from 'simple-icons'
import type { SimpleIcon } from 'simple-icons'

// Liste des langages/technologies supportés (dédupliquée)
export const supportedLanguages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'csharp',
    'php',
    'html5',
    'css3',
    'react',
    'vue.js',
    'angular',
    'node.js',
    'go',
    'rust',
    'swift',
    'kotlin',
    'ruby',
    'scala',
    'perl',
    'dart',
    'flutter',
    'c',
    'cpp',
    'objectivec',
    'r',
    'shell',
    'powershell',
    'docker',
    'kubernetes',
    'aws',
    'azure',
    'gcp',
    'firebase',
    'mongodb',
    'mysql',
    'postgresql',
    'redis',
    'elasticsearch',
    'graphql',
    'apollo',
    'next.js',
    'nuxt.js',
    'svelte',
    'tailwindcss',
    'bootstrap',
    'materialui',
    'chakraui',
    'antdesign',
    'webpack',
    'vite',
    'eslint',
    'prettier',
    'git',
    'github',
    'gitlab',
    'bitbucket',
    'jira',
    'confluence',
    'slack',
    'discord',
]

// Créer un mapping nom → icône (slug)
const iconMap = new Map<string, SimpleIcon>()

// Remplir le mapping à partir de simple-icons
Object.values(SimpleIcons).forEach((icon: unknown) => {
    const simpleIcon = icon as SimpleIcon
    if (simpleIcon.title && simpleIcon.slug && simpleIcon.svg) {
        // Nettoyer le slug (minuscules, remplacer les espaces par des tirets)
        const slug = simpleIcon.slug.toLowerCase().replace(/ /g, '-')
        iconMap.set(slug, simpleIcon)
        // Ajouter aussi avec le nom original
        iconMap.set(simpleIcon.title.toLowerCase(), simpleIcon)
        // Ajouter avec le nom en titre
        iconMap.set(simpleIcon.title, simpleIcon)
    }
})

// Fonction pour obtenir l'icône d'un langage (retourne le SVG en chaîne, ou null)
export function getLanguageIcon(language: string): string | null {
    const key = language.toLowerCase().trim()
    const icon = iconMap.get(key)
    if (icon) {
        return icon.svg
    }
    return null
}