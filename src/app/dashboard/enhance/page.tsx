"use client";

import { useState, useEffect } from "react";
import { Upload, Sparkles, FileText, CheckCircle, AlertTriangle, ArrowRight, Download, BarChart3, Search, Zap, CheckCircle2, Cpu, ScanLine, ListChecks, ArrowUpRight } from "lucide-react";
import { bindToTemplate, StandardResumeJSON } from "@/lib/templates/standard";
import { ResumeData } from "@/types/resume";

// Mock Data for "Optimized" Result
const mockOptimizedData: ResumeData = {
    personalInfo: {
        fullName: "Alex Taylor",
        email: "alex.taylor@example.com",
        phone: "+1 (555) 123-4567",
        linkedin: "linkedin.com/in/alextaylor",
        website: "alextaylor.dev"
    },
    education: [
        { id: "1", school: "University of Tech", degree: "B.S. Computer Science", startDate: "2018", endDate: "2022" }
    ],
    experience: [
        {
            id: "1",
            company: "TechFlow Systems",
            position: "Senior Frontend Engineer",
            startDate: "2022",
            endDate: "Present",
            description: "Spearheaded the migration of legacy codebase to React 18, improving page load time by 40%. Implemented responsive design systems used across 5 products."
        },
        {
            id: "2",
            company: "WebSolutions Inc",
            position: "Frontend Developer",
            startDate: "2020",
            endDate: "2022",
            description: "Developed and maintained client-facing web applications using Next.js and TypeScript. Collaborated with UX designers to implement pixel-perfect interfaces."
        }
    ],
    projects: [
        {
            id: "1",
            name: "E-Commerce Dashboard",
            technologies: "React, Redux, Node.js",
            description: "Built a real-time analytics dashboard for e-commerce merchants, handling 10k+ daily events."
        }
    ],
    skills: "React, TypeScript, Next.js, Tailwind CSS, Node.js, GraphQL, AWS, CI/CD, Jest, Cypress"
};

export default function EnhanceResumePage() {
    const [file, setFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [progress, setProgress] = useState(0);

    // Simulated Analysis Flow
    const handleAnalyze = () => {
        setIsAnalyzing(true);
        // Simulate progress steps
        let step = 0;
        const interval = setInterval(() => {
            step += 10;
            setProgress(step);
            if (step >= 100) {
                clearInterval(interval);
                setIsAnalyzing(false);
                setIsComplete(true);
            }
        }, 300); // 3 seconds total
    };

    const [optimizedResume, setOptimizedResume] = useState<StandardResumeJSON>(bindToTemplate(mockOptimizedData));

    return (
        <div className="max-w-5xl mx-auto pb-20 space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="h-8 w-8 text-blue-600" />
                    Enhance Resume
                </h1>
                <p className="text-slate-600 mt-2 max-w-2xl">
                    Upload your current resume and the job description you are targeting.
                    Our AI will optimize keywords and formatting for you.
                </p>
            </div>

            {/* Input Section */}
            <div className={`grid md:grid-cols-2 gap-6 ${isComplete ? 'opacity-50 pointer-events-none' : ''}`}>
                {/* 1. Resume Upload */}
                <div className={`border-2 border-dashed rounded-xl p-8 transition-colors ${file ? 'border-green-500 bg-green-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${file ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                            {file ? <FileText className="h-8 w-8" /> : <Upload className="h-8 w-8" />}
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">{file ? file.name : "Upload Resume"}</h3>
                            <p className="text-sm text-slate-500 mt-1">{file ? "Resume loaded (Demo)" : "Drag & drop or browse (PDF, DOCX)"}</p>
                        </div>
                        {!file && (
                            <label className="cursor-pointer bg-white border border-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 relative overflow-hidden">
                                Select File
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept=".pdf,.docx"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                />
                            </label>
                        )}
                        {file && (
                            <button onClick={() => setFile(null)} className="text-xs text-red-500 hover:underline">Remove</button>
                        )}
                    </div>
                </div>

                {/* 2. Job Description */}
                <div className="relative">
                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the job description here..."
                        className="w-full h-full min-h-[240px] p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
                    />
                    <div className="absolute bottom-4 right-4 text-xs text-slate-400 bg-white px-2 py-1 rounded border">
                        {jobDescription.length} chars
                    </div>
                    {!jobDescription && (
                        <button
                            onClick={() => setJobDescription("We are looking for a Senior Frontend Developer with React, TypeScript, and Node.js experience to lead our web team. Knowledge of AWS and CI/CD pipelines is a plus.")}
                            className="absolute top-4 right-4 text-xs text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded"
                        >
                            Paste Example
                        </button>
                    )}
                </div>
            </div>

            {/* Action Button */}
            {!isComplete && (
                <div className="flex justify-center">
                    <form action={async (formData) => {
                        setIsAnalyzing(true);
                        try {
                            // 1. Parse File via API Route (More stable for PDFs)
                            console.log("Parsing file via API...");
                            const parseFormData = new FormData();
                            if (file) parseFormData.append("resume", file);

                            const parseRes = await fetch("/api/parse-resume", {
                                method: "POST",
                                body: parseFormData,
                            });

                            const parseData = await parseRes.json();

                            if (!parseRes.ok || !parseData.success) {
                                throw new Error(parseData.error || "Failed to parse resume file");
                            }

                            const resumeText = parseData.text;
                            console.log("Resume parsed via API. Text length:", resumeText?.length);

                            // 2. Call AI Action with Text
                            formData.set("jobDescription", jobDescription);
                            formData.set("resumeText", resumeText);
                            // Remove file from action payload to save bandwidth/avoid action limits if text is present
                            formData.delete("resume");

                            console.log("Submitting to AI Action...");
                            const result = await import("@/app/enhance-actions").then(m => m.enhanceResumeAction(null, formData));
                            console.log("Action result:", result);

                            if (result.success && result.data) {
                                setOptimizedResume(result.data);
                                setIsComplete(true);
                            } else {
                                console.error("Action returned error:", result.error);
                                alert(`Error: ${result.error}`);
                            }
                        } catch (e: any) {
                            console.error("Submission Error:", e);
                            alert(`Error: ${e.message}`);
                        } finally {
                            setIsAnalyzing(false);
                            setProgress(0);
                        }
                    }}>
                        <button
                            type="submit"
                            disabled={!file || !jobDescription || isAnalyzing}
                            className="w-full max-w-md bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-200 flex items-center justify-center gap-2"
                        >
                            {isAnalyzing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    This might take a moment...
                                </>
                            ) : (
                                <>
                                    Start Real AI Optimization <Sparkles className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            )}

            {/* Analysis & Results */}
            {isComplete && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

                    {/* AI Logic & Heuristics */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* AI Optimization Phases */}
                        <section className="bg-slate-900 rounded-xl p-6 text-white border border-slate-800 shadow-2xl">
                            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-700">
                                <Cpu className="h-5 w-5 text-purple-400" />
                                <h2 className="font-bold text-lg">AI Optimization Phases</h2>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { title: "Keyword Extraction", desc: "Extracts role-specific keywords from JD" },
                                    { title: "Resume Parsing", desc: "Analyzes structure for ATS readability" },
                                    { title: "Skill Alignment", desc: "Matches resume skills against job requirements" },
                                    { title: "Impact Rewriting", desc: "Enhances bullets with action verbs & metrics" },
                                    { title: "ATS Scoring", desc: "Calculates compatibility score" }
                                ].map((phase, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="mt-0.5">
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-200">{phase.title}</h4>
                                            <p className="text-xs text-slate-400">{phase.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-800 text-center">
                                <span className="text-[10px] text-green-400 bg-green-900/30 px-2 py-1 rounded-full border border-green-900/50">
                                    All Phases Complete (Simulated)
                                </span>
                            </div>
                        </section>

                        {/* ATS Heuristics */}
                        <section className="bg-slate-900 rounded-xl p-6 text-white border border-slate-800 shadow-2xl flex flex-col">
                            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-700">
                                <ScanLine className="h-5 w-5 text-blue-400" />
                                <h2 className="font-bold text-lg">ATS Scoring Heuristics</h2>
                            </div>
                            <ul className="space-y-3 flex-1">
                                {[
                                    "Keyword frequency & semantic placement",
                                    "Section naming consistency (Parsability)",
                                    "Bullet point clarity & length optimization",
                                    "Strong action verb usage (Impact scoring)",
                                    "Hard skills vs Soft skills ratio"
                                ].map((rule, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                                <p className="text-xs text-blue-300">
                                    <strong>Why this matters:</strong> These heuristics simulate real-world ATS algorithms used by efficient recruiting teams to filter candidates.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Preview Panel (Existing) */}
                    <section className="bg-slate-900 rounded-xl p-6 text-white border border-slate-800 shadow-2xl">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-700">
                            <BarChart3 className="h-5 w-5 text-blue-400" />
                            <h2 className="font-bold text-lg">ATS Optimization Analysis</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-300">Keyword Match</span>
                                    <span className={`font-bold ${optimizedResume.analysis?.keywords.score === "High" ? "text-green-400" :
                                        optimizedResume.analysis?.keywords.score === "Medium" ? "text-amber-400" : "text-red-400"
                                        }`}>
                                        {optimizedResume.analysis?.keywords.score || "N/A"}
                                    </span>
                                </div>
                                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                    <div className={`h-full ${optimizedResume.analysis?.keywords.score === "High" ? "bg-green-500 w-[85%]" :
                                        optimizedResume.analysis?.keywords.score === "Medium" ? "bg-amber-500 w-[50%]" : "bg-red-500 w-[30%]"
                                        }`} />
                                </div>
                                <p className="text-xs text-slate-400 mt-2">
                                    Found <strong className="text-white">{optimizedResume.analysis?.keywords.found?.length || 0}</strong> important keywords.
                                </p>
                            </div>

                            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-300">Optimization Score</span>
                                    <span className="text-blue-400 font-bold">{optimizedResume.analysis?.score || 0}/100</span>
                                </div>
                                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-blue-500 h-full transition-all duration-1000"
                                        style={{ width: `${optimizedResume.analysis?.score || 0}%` }}
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-1">Based on ATS compatibility rules.</p>
                            </div>

                            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-300">Suggested Skills</span>
                                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {(optimizedResume.analysis?.missingSkills || []).slice(0, 5).map(s => (
                                        <span key={s} className="text-[10px] bg-red-500/20 text-red-200 px-1.5 py-0.5 rounded border border-red-500/30">{s}</span>
                                    ))}
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Consider adding these if applicable.</p>
                            </div>
                        </div>
                    </section>

                    {/* Preview Panel */}
                    <section className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h2 className="font-bold text-slate-900">Optimized Resume Preview</h2>
                                <p className="text-xs text-slate-500">Generated using OpenRouter AI • Standardized Template</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={async () => {
                                        setIsDownloading(true);
                                        try {
                                            const result = await import("./download-actions").then(m => m.downloadPdfAction(optimizedResume));

                                            if (result.success && result.data) {
                                                // Convert Base64 to Blob
                                                const byteCharacters = atob(result.data);
                                                const byteNumbers = new Array(byteCharacters.length);
                                                for (let i = 0; i < byteCharacters.length; i++) {
                                                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                                                }
                                                const byteArray = new Uint8Array(byteNumbers);
                                                const blob = new Blob([byteArray], { type: result.type === 'pdf' ? 'application/pdf' : 'application/x-tex' });

                                                // Create Download Link
                                                const url = window.URL.createObjectURL(blob);
                                                const a = document.createElement('a');
                                                a.href = url;
                                                a.download = result.filename || "resume.pdf";
                                                document.body.appendChild(a);
                                                a.click();
                                                window.URL.revokeObjectURL(url);
                                                document.body.removeChild(a);
                                            } else {
                                                alert(result.message || "Failed to generate PDF");
                                            }
                                        } catch (e) {
                                            console.error(e);
                                            alert("Download failed. Please try again.");
                                        } finally {
                                            setIsDownloading(false);
                                        }
                                    }}
                                    disabled={isDownloading}
                                    className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-green-200">
                                    {isDownloading ? (
                                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Download className="h-3 w-3" />
                                    )}
                                    {isDownloading ? "Generating..." : "Download PDF"}
                                </button>
                            </div>
                        </div>

                        {/* Rendered Template */}
                        <div className="p-8 max-h-[600px] overflow-auto bg-white">
                            <div className="max-w-[21cm] mx-auto bg-white min-h-[29.7cm] shadow-sm p-[1cm] text-sm md:text-base">
                                {/* Header */}
                                <div className="text-center border-b-2 border-slate-900 pb-6 mb-6">
                                    <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-widest mb-2">{optimizedResume.header.name}</h1>
                                    <div className="flex flex-wrap justify-center gap-3 text-slate-600 text-sm">
                                        <span>{optimizedResume.header.contact.email}</span>
                                        <span>•</span>
                                        <span>{optimizedResume.header.contact.phone}</span>
                                        <span>•</span>
                                        <span className="text-blue-600">{optimizedResume.header.contact.linkedin}</span>
                                    </div>
                                </div>

                                {/* Sections */}
                                <div className="space-y-6">
                                    {optimizedResume.sections.map((section) => (
                                        <div key={section.id}>
                                            <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider border-b border-blue-100 mb-3 pb-1">
                                                {section.title}
                                            </h3>

                                            {/* Summary Content */}
                                            {section.type === "summary" && (
                                                <p className="text-slate-700 leading-relaxed text-justify">
                                                    Highly motivated Senior Frontend Engineer with 4+ years of experience building scalable web applications.
                                                    Proven expertise in <strong>React, TypeScript and AWS</strong>. Adept at optimizing performance (40% load time reduction)
                                                    and leading migration projects. Committed to delivering high-quality, pixel-perfect user experiences for B2B SaaS products.
                                                </p>
                                            )}

                                            {/* Skills Content */}
                                            {section.type === "skills" && (
                                                <div className="flex flex-wrap gap-2">
                                                    {(section.content as string[]).map((skill, i) => (
                                                        <span key={i} className="bg-slate-100 px-2 py-1 rounded text-xs font-medium text-slate-700 border border-slate-200">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Experience Content */}
                                            {section.type === "experience" && (
                                                <div className="space-y-4">
                                                    {(section.content as any[]).map((role: any, i: number) => (
                                                        <div key={i}>
                                                            <div className="flex justify-between items-baseline mb-1">
                                                                <h4 className="font-bold text-slate-800">{role.role}</h4>
                                                                <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded">{role.period}</span>
                                                            </div>
                                                            <div className="text-sm text-blue-700 font-medium mb-2">{role.institution}</div>
                                                            <ul className="list-disc pl-4 space-y-1 text-slate-600 text-sm">
                                                                {role.details.map((detail: string, j: number) => (
                                                                    <li key={j}>{detail}</li>
                                                                ))}
                                                                {/* Add simulated extra bullets for demo */}
                                                                {i === 0 && (
                                                                    <li className="text-green-700 font-medium bg-green-50/50 rounded px-1 -ml-1">
                                                                        <span className="text-[10px] uppercase mr-2 tracking-wider bg-green-100 px-1 rounded text-green-800">New (AI)</span>
                                                                        Engineered CI/CD pipelines using AWS, reducing deployment time by 50%.
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Projects Content */}
                                            {section.type === "projects" && (
                                                <div className="space-y-4">
                                                    {(section.content as any[]).map((proj: any, i: number) => (
                                                        <div key={i}>
                                                            <div className="flex justify-between items-baseline">
                                                                <h4 className="font-bold text-slate-800">{proj.name}</h4>
                                                                <span className="text-xs text-slate-500 italic">{proj.tech}</span>
                                                            </div>
                                                            <p className="text-sm text-slate-600 mt-1">{proj.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Education Content */}
                                            {section.type === "education" && (
                                                <div className="space-y-2">
                                                    {(section.content as any[]).map((edu: any, i: number) => (
                                                        <div key={i} className="flex justify-between items-center text-sm">
                                                            <div>
                                                                <span className="font-bold text-slate-800">{edu.institution}</span>
                                                                <span className="mx-2 text-slate-300">|</span>
                                                                <span className="text-slate-600">{edu.degree}</span>
                                                            </div>
                                                            <span className="text-slate-500">{edu.period}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer: Comparisons & Production Plan */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Comparison */}
                        <section className="md:col-span-3 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <ListChecks className="h-5 w-5 text-green-600" /> What Changed in Your Resume
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <span className="text-xs font-bold text-slate-500 uppercase">Impact</span>
                                    <p className="text-sm font-medium text-slate-800 mt-1">Improved action verbs</p>
                                    <div className="flex items-center gap-2 text-xs mt-1">
                                        <span className="text-red-500 line-through">Built</span>
                                        <ArrowRight className="h-3 w-3 text-slate-400" />
                                        <span className="text-green-600 font-bold">Engineered</span>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <span className="text-xs font-bold text-slate-500 uppercase">Keywords</span>
                                    <p className="text-sm font-medium text-slate-800 mt-1">Added technical terms</p>
                                    <div className="flex items-center gap-2 text-xs mt-1">
                                        <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">CI/CD</span>
                                        <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Docker</span>
                                        <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">AWS</span>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <span className="text-xs font-bold text-slate-500 uppercase">Structure</span>
                                    <p className="text-sm font-medium text-slate-800 mt-1">Reordered sections</p>
                                    <p className="text-xs text-slate-500 mt-1">Prioritized Skills over Education</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <span className="text-xs font-bold text-slate-500 uppercase">Sourcing</span>
                                    <p className="text-sm font-medium text-slate-800 mt-1">Quantified Achievements</p>
                                    <p className="text-xs text-slate-500 mt-1">Added specific metrics (e.g. "40%")</p>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            )}
        </div>
    );
}
