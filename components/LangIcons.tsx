import { getLanguageIcon } from '@/lib/langIcons'

interface LanguageIconProps {
    language: string
    className?: string
}

// Composant React pour afficher l'icône d'un langage
export function LanguageIcon({ language, className = "w-5 h-5" }: LanguageIconProps) {
    const svg = getLanguageIcon(language)

    if (!svg) {
        // Fallback: afficher la première lettre du langage
        return (
            <span className={`inline-flex items-center justify-center ${className} bg-gray-600 rounded-full text-xs font-bold text-white`}>
                {language.charAt(0).toUpperCase()}
            </span>
        )
    }

    // Injecter le SVG dans un div (les SVG de simple-icons sont sûrs, pas de risque XSS)
    return <div className={className} dangerouslySetInnerHTML={{ __html: svg }} />
}