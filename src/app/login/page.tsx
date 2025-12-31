"use client";

import { useTransition, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { login, signup, signInWithGoogle, signInWithGithub, loginAsDemo } from "./actions";
import { Loader2, Mail, Lock, CheckCircle, Github, Chrome, Sparkles } from "lucide-react";

function LoginForm() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 p-8 text-center">
                <h1 className="text-2xl font-bold text-white mb-2">Welcome to CareerLift</h1>
                <p className="text-slate-400 text-sm">Sign in to build and optimize your resume</p>
            </div>

            <div className="p-8 space-y-6">
                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200 flex items-center justify-center gap-2">
                        <span className="font-bold">Error:</span> {decodeURIComponent(error)}
                    </div>
                )}

                {/* Social Logic */}
                <div className="space-y-3">
                    <form action={signInWithGoogle}>
                        <button className="w-full flex items-center justify-center gap-3 bg-white text-slate-700 font-medium py-2.5 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                            <Chrome className="w-5 h-5 text-red-500" />
                            Continue with Google
                        </button>
                    </form>
                    <form action={signInWithGithub}>
                        <button className="w-full flex items-center justify-center gap-3 bg-[#24292F] text-white font-medium py-2.5 px-4 rounded-lg hover:bg-[#24292F]/90 transition-colors shadow-sm">
                            <Github className="w-5 h-5" />
                            Continue with GitHub
                        </button>
                    </form>
                </div>

                <div className="relative">
                    <form action={loginAsDemo}>
                        <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold py-3 px-4 rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all shadow-md">
                            <Sparkles className="w-5 h-5 text-white" />
                            Try Demo Mode (No Login)
                        </button>
                    </form>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-500">Or continue with email</span>
                    </div>
                </div>

                {/* Email Form */}
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700" htmlFor="email">Email address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <button formAction={login} className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-500/20">
                            Log in
                        </button>
                        <button formAction={signup} className="w-full bg-white text-slate-900 font-bold py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-slate-50 p-4 text-center border-t border-slate-200">
                <p className="text-xs text-slate-500">
                    By continuing, you agree to our <a href="#" className="underline hover:text-slate-700">Terms of Service</a> and <a href="#" className="underline hover:text-slate-700">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Suspense fallback={<div className="text-center">Loading login...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
