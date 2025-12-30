"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles, Briefcase, CheckCircle, ArrowRight, ShieldCheck, TrendingUp, Target } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CareerLiftLandingPage() {
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
                        <Link href="#" className="hover:text-blue-600 transition-colors">Features</Link>
                        <Link href="#" className="hover:text-blue-600 transition-colors">Pricing</Link>
                        <Link href="#" className="hover:text-blue-600 transition-colors">About</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 hidden sm:block">
                            Log in
                        </Link>
                        <Link href="/login" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-40">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto max-w-3xl space-y-6"
                    >
                        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                            v2.0 is now live for Buildathon
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900">
                            Land More Interviews with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI-Powered Resumes</span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-lg text-slate-600 md:text-xl">
                            CareerLift transforms your resume into an ATS-optimized, job-specific document using advanced AI — no expensive resume writers required.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/dashboard" className="h-12 px-8 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                Enhance My Resume <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <Link href="#" className="h-12 px-8 rounded-full border border-slate-200 bg-white text-slate-900 font-semibold flex items-center justify-center hover:bg-slate-50 transition-all">
                                Build Resume from Scratch
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-y border-slate-100 bg-slate-50/50 py-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
                        <div className="space-y-2">
                            <h3 className="text-4xl font-bold text-blue-600">50,000+</h3>
                            <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Resumes Optimized</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-4xl font-bold text-blue-600">3×</h3>
                            <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Higher Callback Rate</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-4xl font-bold text-blue-600">95%</h3>
                            <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">ATS Compatibility</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">Everything you need to get hired</h2>
                        <p className="mt-4 text-lg text-slate-600">Our AI analyzes your profile against job descriptions to ensure a perfect match.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Feature 1 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-slate-900">ATS Compliance</h3>
                            <p className="text-slate-600">
                                Our algorithms ensure your resume parses correctly on Greenhouse, Lever, and Workday systems.
                            </p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <Target className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-slate-900">Job Role Matching</h3>
                            <p className="text-slate-600">
                                Paste the job description and let CareerLift tailor your skills and keywords for that specific role.
                            </p>
                        </motion.div>

                        {/* Feature 3 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-slate-900">Resume Score Improvement</h3>
                            <p className="text-slate-600">
                                Get an instant score (0-100) and actionable tips to improve readability and impact.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust / Social Proof */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900">Trusted by ambitous professionals</h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale">
                        {["Built for Students", "Trusted by Job Seekers", "Used in Buildathons", "Hackathon Winners"].map((label) => (
                            <div key={label} className="flex items-center gap-2 text-lg font-semibold text-slate-500">
                                <CheckCircle className="h-5 w-5 text-blue-500" />
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-20 text-center shadow-2xl sm:px-12 sm:py-24">
                        <div className="relative z-10 mx-auto max-w-2xl space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Ready to land your dream job?
                            </h2>
                            <p className="text-blue-100 text-lg">
                                Join thousands of candidates who are getting hired faster with CareerLift.
                            </p>
                            <div className="pt-4">
                                <Link href="/dashboard" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 font-semibold text-blue-600 transition-colors hover:bg-blue-50">
                                    Start Enhancing Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 py-12">
                <div className="container mx-auto px-4 text-center text-slate-500">
                    <p>&copy; {new Date().getFullYear()} CareerLift. Built for the future of work.</p>
                </div>
            </footer>
        </div>
    );
}
