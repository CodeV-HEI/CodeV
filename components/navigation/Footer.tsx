'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-white/10 bg-background/50 backdrop-blur-sm py-8 mt-20">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo & description */}
                    <div>
                        <div className="flex items-center gap-2">
                            <Image src="/icon/favicon.png" alt="CodeV-HEI" width={40} height={40} className="rounded-full"  />
                            <span className="text-xl font-bold text-codev-primary">CodeV</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Pôle de développement logiciel par des étudiants passionnés de l&apos;HEI.
                        </p>
                    </div>

                    {/* Liens rapides */}
                    <div>
                        <h3 className="font-semibold mb-3">Navigation</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-codev-primary transition-colors">Accueil</Link></li>
                            <li><Link href="/members" className="hover:text-codev-primary transition-colors">Membres</Link></li>
                            <li><Link href="/projects" className="hover:text-codev-primary transition-colors">Projets</Link></li>
                            <li><Link href="/stats" className="hover:text-codev-primary transition-colors">Statistiques</Link></li>
                        </ul>
                    </div>

                    {/* Réseaux sociaux */}
                    <div>
                        <h3 className="font-semibold mb-3">Nous suivre</h3>
                        <div className="flex gap-4">
                            <Link href="https://github.com/CodeV-HEI" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-codev-primary transition-colors">
                                <FaGithub size={24} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
                    Fait avec <Heart size={14} className="text-red-500 fill-red-500" /> par CodeV-HEI &bull; Copyright  &copy; {new Date().getFullYear()}. Tous droits réservés &bull;
                </div>
            </div>
        </footer>
    )
}