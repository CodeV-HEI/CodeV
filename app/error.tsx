'use client';

import Error from '@/components/error/Error'

export default function Loading() {
    return <Error reset={() => window.location.reload()} />
}