"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { FileText, Sparkles, Briefcase, CheckCircle, ArrowRight, ShieldCheck, TrendingUp, Target, Star, Users, Zap, Upload, Download, RefreshCw, BarChart3, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.round(current).toLocaleString() + suffix);

    useEffect(() => {
        if (inView) {
            spring.set(value);
        }
    }, [inView, spring, value]);

    return <motion.span ref={ref}>{display}</motion.span>;
}

export default function CareerLiftLandingPage() {
    const scrollToDemo = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById('demo-preview');
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-blue-600">
                        <Sparkles className="h-6 w-6" />
                        <span>CareerLift</span>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                        <Link href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</Link>
                        <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
                        <Link href="#demo-preview" className="hover:text-blue-600 transition-colors font-bold text-blue-600">Live Demo</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={scrollToDemo} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                            Try Demo
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-28">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto max-w-4xl space-y-6"
                    >
                        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 mb-4">
                            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                            v2.0 Live: Buildathon Ready
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-tight">
                            Land More Interviews with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI-Powered Resumes</span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-lg text-slate-600 md:text-xl leading-relaxed">
                            CareerLift instantly tailors your resume to pass ATS filters and match job descriptions with precision.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                            <button onClick={scrollToDemo} className="h-14 px-8 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-200 text-lg">
                                Enhance My Resume <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                            <button onClick={scrollToDemo} className="h-14 px-8 rounded-full border border-slate-200 bg-white text-slate-900 font-semibold flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all text-lg">
                                Build from Scratch
                            </button>
                        </div>
                        <p className="text-sm text-slate-500 pt-4 font-medium">
                            No login required · Free resume scan · Instant results
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-16 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">How CareerLift Works</h2>
                        <p className="text-slate-600 mt-2">Professional resumes in 3 simple steps</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center p-6">
                            <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                                <Upload className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">1. Upload Resume</h3>
                            <p className="text-slate-600">Upload your existing resume or start from scratch using our builder.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 relative">
                            <div className="hidden md:block absolute top-12 -left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                            <div className="h-16 w-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 z-10 bg-white">
                                <Sparkles className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">2. AI Optimization</h3>
                            <p className="text-slate-600">Our AI rewrites your resume to match the job description and ATS systems.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6">
                            <div className="h-16 w-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-4">
                                <Download className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">3. Download & Apply</h3>
                            <p className="text-slate-600">Get a clean, professional, ATS-friendly resume in PDF format in minutes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-slate-50 py-12 border-y border-slate-200">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        <div className="space-y-2 py-4 md:py-0">
                            <h3 className="text-5xl font-bold text-blue-600 tracking-tight">
                                <Counter value={50000} suffix="+" />
                            </h3>
                            <p className="text-sm font-bold text-slate-700 uppercase tracking-wider">Resumes Optimized</p>
                        </div>
                        <div className="space-y-2 py-4 md:py-0">
                            <h3 className="text-5xl font-bold text-blue-600 tracking-tight">
                                <Counter value={3} suffix="x" />
                            </h3>
                            <p className="text-sm font-bold text-slate-700 uppercase tracking-wider">Higher Callback Rate</p>
                        </div>
                        <div className="space-y-2 py-4 md:py-0">
                            <h3 className="text-5xl font-bold text-blue-600 tracking-tight">
                                <Counter value={95} suffix="%" />
                            </h3>
                            <p className="text-sm font-bold text-slate-700 uppercase tracking-wider">ATS Compatibility</p>
                        </div>
                    </div>
                    <p className="text-center text-xs text-slate-400 mt-6 italic">
                        *Results based on simulated ATS scoring models.
                    </p>
                </div>
            </section>

            {/* Live Demo Preview */}
            <section id="demo-preview" className="py-24 bg-slate-900 text-white overflow-hidden relative">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono mb-4 border border-blue-500/30">
                            LIVE PREVIEW MODE
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See CareerLift in Action</h2>
                        <p className="mt-4 text-slate-400">Simulation of the AI Enhancement Workflow</p>
                    </div>

                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Input */}
                        <div className="space-y-6">
                            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm relative overflow-hidden">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-semibold text-slate-200 flex items-center gap-2"><Upload className="h-4 w-4" /> Original Resume</h4>
                                    <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded font-mono">Score: 42/100</span>
                                </div>
                                <div className="h-32 bg-slate-900/50 rounded-lg p-4 space-y-2 opacity-60">
                                    <div className="h-2 w-3/4 bg-slate-700 rounded"></div>
                                    <div className="h-2 w-1/2 bg-slate-700 rounded"></div>
                                    <div className="h-2 w-full bg-slate-700 rounded"></div>
                                    <div className="h-2 w-2/3 bg-slate-700 rounded"></div>
                                </div>
                                {/* Scanning line animation */}
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />
                            </div>

                            <div className="flex justify-center">
                                <ArrowRight className="rotate-90 md:rotate-0 text-slate-500 h-8 w-8 animate-pulse" />
                            </div>

                            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-semibold text-slate-200 flex items-center gap-2"><Target className="h-4 w-4" /> Job Description</h4>
                                </div>
                                <div className="h-24 bg-slate-900/50 rounded-lg p-4 text-xs text-slate-400 font-mono">
                                    Seeking Senior Product Designer with Figma mastery and experience in B2B SaaS...
                                </div>
                            </div>
                        </div>

                        {/* Right: Output */}
                        <div className="bg-gradient-to-br from-blue-900/80 to-indigo-900/80 p-8 rounded-3xl border border-blue-500/30 shadow-2xl relative">
                            {/* AI Badge - Top Right */}
                            <div className="absolute top-4 right-4">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold shadow-lg shadow-blue-900/20 z-10">
                                    <Sparkles className="h-3 w-3 fill-blue-300 animate-pulse" /> AI Processing
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-1">AI Optimized Result</h3>
                            <p className="text-blue-200 mb-8 text-sm flex items-center gap-2">
                                <CheckCircle className="h-3 w-3" /> Targeting: Senior Product Designer
                            </p>

                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-900/40 p-3 rounded-xl border border-blue-500/20">
                                        <div className="flex justify-between text-xs mb-2 text-slate-300">
                                            <span>ATS Score</span>
                                            <span className="font-bold text-green-400">98/100</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "98%" }}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                className="h-full bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-slate-900/40 p-3 rounded-xl border border-blue-500/20">
                                        <div className="flex justify-between text-xs mb-2 text-slate-300">
                                            <span>Keyword Match</span>
                                            <span className="font-bold text-blue-400">High</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "92%" }}
                                                transition={{ duration: 1.5, delay: 0.7 }}
                                                className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* AI Insight Badges */}
                                <div className="flex flex-wrap gap-2">
                                    {["Keywords Optimized: +18", "Action Verbs Enhanced", "Structure Fixed"].map((badge, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1 + (i * 0.2) }}
                                            className="px-2 py-1 rounded bg-indigo-500/20 border border-indigo-400/20 text-indigo-300 text-[10px] font-semibold"
                                        >
                                            {badge}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Explanation Panel */}
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <h5 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1">
                                        <BarChart3 className="h-3 w-3" /> Why the score improved:
                                    </h5>
                                    <ul className="space-y-1.5">
                                        {[
                                            "Aligned skills with 'Figma' & 'SaaS' requirements",
                                            "Quantified impact: 'Increased conversion by 25%'",
                                            "Reordered sections for optimal parsing"
                                        ].map((item, i) => (
                                            <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                                                <Check className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-8">
                                    <Link href="/login" className="w-full block py-4 bg-white text-blue-900 font-bold rounded-xl text-center hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/50">
                                        Run on My Resume
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-20 text-center shadow-2xl sm:px-12 sm:py-24">
                        <div className="relative z-10 mx-auto max-w-2xl space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Ready to Land Your Dream Job?
                            </h2>
                            <p className="text-blue-100 text-lg">
                                Upload your resume and get an ATS-optimized version in minutes.
                            </p>
                            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/login" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 font-semibold text-blue-600 transition-colors hover:bg-blue-50">
                                    Enhance My Resume
                                </Link>
                                <Link href="/login" className="inline-flex h-12 items-center justify-center rounded-full bg-blue-700 border border-blue-500 px-8 font-semibold text-white transition-colors hover:bg-blue-800">
                                    Build Resume from Scratch
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 py-12 bg-slate-50">
                <div className="container mx-auto px-4 text-center text-slate-500 space-y-6">
                    <div className="flex justify-center items-center gap-2 mb-4 font-bold text-slate-900">
                        <Sparkles className="h-5 w-5 text-blue-600" /> CareerLift
                    </div>
                    <p className="text-sm max-w-md mx-auto">
                        CareerLift is designed to demonstrate how structured AI workflows can significantly improve resume outcomes at scale without compromising privacy.
                    </p>
                    <p>&copy; {new Date().getFullYear()} CareerLift. Built for the future of work.</p>
                    <div className="pt-8 border-t border-slate-200/60 max-w-sm mx-auto">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-2">Buildathon Demo Version</p>
                        <p className="text-[10px] text-slate-400">
                            AI outputs are simulated in this preview. Actual results use structured prompts and ATS heuristics.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
