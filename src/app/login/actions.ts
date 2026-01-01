'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        console.error('Login error:', error)
        redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/login?error=true')
    }


    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

const getURL = () => {
    let url =
        process.env.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'https://career-lift.vercel.app/' // Fallback to production URL directly

    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`

    // STRICT FIX: Use the origin property to strip ANY path segments (like /api, /api/, /v1, etc.)
    // This ensures we always get "https://domain.com" without trailing paths.
    try {
        const urlObj = new URL(url);
        url = urlObj.origin + '/'; // Always ensure trailing slash
    } catch (e) {
        // Fallback if URL parsing fails (shouldn't happen with valid env vars)
        console.error("URL Parsing failed in getURL:", e);
        url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
    }

    console.log('Resolved URL:', url)
    return url
}

export async function signInWithGoogle() {
    const supabase = await createClient()
    const origin = getURL()
    const redirectUrl = `${origin}dashboard`


    console.log('Attempting Google Sign-in with redirect:', redirectUrl)

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: redirectUrl,
        },
    })

    if (error) {
        redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    if (data.url) {
        redirect(data.url)
    }
}

export async function signInWithGithub() {
    const supabase = await createClient()
    const origin = getURL()
    const redirectUrl = `${origin}dashboard`

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: redirectUrl,
        },
    })

    if (error) {
        redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    if (data.url) {
        redirect(data.url)
    }
}

export async function loginAsDemo() {
    // Set 24h expiration for demo session
    const oneDay = 24 * 60 * 60 * 1000
    const expires = Date.now() + oneDay

    // @ts-ignore
    const cookieStore = await import('next/headers').then(mod => mod.cookies())
    cookieStore.set('demo_mode', 'true', {
        path: '/',
        httpOnly: true,
        expires: expires,
        sameSite: 'lax'
    })

    redirect('/dashboard')
}
