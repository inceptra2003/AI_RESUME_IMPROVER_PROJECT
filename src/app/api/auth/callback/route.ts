import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://career-lift.vercel.app';
            if (baseUrl.endsWith('/api')) {
                baseUrl = baseUrl.replace('/api', '');
            }
            if (baseUrl.endsWith('/api/')) {
                baseUrl = baseUrl.replace('/api/', '/');
            }

            return NextResponse.redirect(`${baseUrl}${next}`)
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
