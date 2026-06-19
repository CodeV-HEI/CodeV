export default function Error({ reset }: { reset: () => void }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
            <h2 className="text-2xl">Une erreur est survenue</h2>
            <button onClick={reset} className="mt-4 px-4 py-2 bg-codev-primary rounded-lg">
                Réessayer
            </button>
        </div>
    )
}