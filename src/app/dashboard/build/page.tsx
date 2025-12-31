"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Info, AlertCircle, Sparkles } from "lucide-react";
import { type ResumeData } from "@/types/resume";
import { bindToTemplate } from "@/lib/templates/standard";

export default function BuildResumePage() {
    const [formData, setFormData] = useState<ResumeData>({
        personalInfo: { fullName: "", email: "", phone: "", linkedin: "", website: "" },
        education: [],
        experience: [],
        projects: [],
        skills: "",
    });

    const [location, setLocation] = useState(""); // Local state for demo field
    const [isDownloading, setIsDownloading] = useState(false);

    const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [name]: value },
        }));
    };

    // Generic handler for array fields
    const addParams = (section: "education" | "experience" | "projects") => {
        const id = Math.random().toString(36).substr(2, 9);
        const newItems: any = {
            education: { id, school: "", degree: "", startDate: "", endDate: "" },
            experience: { id, company: "", position: "", startDate: "", endDate: "", description: "" },
            projects: { id, name: "", description: "", technologies: "" }
        };

        setFormData((prev) => ({
            ...prev,
            [section]: [...prev[section], newItems[section]],
        }));
    };

    const removeItem = (section: "education" | "experience" | "projects", id: string) => {
        setFormData((prev) => ({
            ...prev,
            [section]: (prev[section] as any[]).filter((item) => item.id !== id),
        }));
    };

    const handleArrayChange = (
        section: "education" | "experience" | "projects",
        id: string,
        field: string,
        value: string
    ) => {
        setFormData((prev) => {
            const sectionData = prev[section];
            const updatedSection = sectionData.map((item: any) =>
                item.id === id ? { ...item, [field]: value } : item
            );
            return {
                ...prev,
                [section]: updatedSection,
            };
        });
    };

    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Build Your Resume</h1>
                <p className="mt-2 text-slate-600">Create a professional resume from scratch. Our AI will help format it perfectly.</p>
            </div>

            {/* Form Container */}
            <div className="space-y-8">

                {/* Section 1: Personal Info */}
                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-bl-xl border-l border-b border-blue-100">
                        Step 1 of 4
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm">1</span>
                            Personal Information
                        </h2>
                        <p className="text-sm text-slate-500 ml-10 mt-1">
                            Contact details recruiters use to reach you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input
                                name="fullName"
                                placeholder="e.g. Jane Doe"
                                value={formData.personalInfo.fullName}
                                onChange={handlePersonalChange}
                                className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input
                                name="email"
                                placeholder="jane@example.com"
                                value={formData.personalInfo.email}
                                onChange={handlePersonalChange}
                                className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                            <input
                                name="phone"
                                placeholder="+1 (555) 000-0000"
                                value={formData.personalInfo.phone}
                                onChange={handlePersonalChange}
                                className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                            <input
                                name="location"
                                placeholder="City, Country"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn / Portfolio</label>
                            <input
                                name="linkedin"
                                placeholder="https://linkedin.com/in/jane"
                                value={formData.personalInfo.linkedin}
                                onChange={handlePersonalChange}
                                className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Section 2: Education */}
                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-bl-xl border-l border-b border-slate-200">
                        Step 2 of 4
                    </div>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-sm">2</span>
                                Education
                            </h2>
                            <p className="text-sm text-slate-500 ml-10 mt-1">
                                Multiple entries supported (Demo: Add at least one)
                            </p>
                        </div>
                        <button onClick={() => addParams("education")} className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition">
                            <Plus className="h-4 w-4" /> Add
                        </button>
                    </div>

                    <div className="space-y-6">
                        {formData.education.map((edu, idx) => (
                            <div key={edu.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100 relative group animate-in fade-in slide-in-from-bottom-2">
                                <div className="absolute -left-3 top-4 bg-slate-200 text-slate-500 text-xs w-6 h-6 flex items-center justify-center rounded-full border border-white font-bold">
                                    {idx + 1}
                                </div>
                                <button
                                    onClick={() => removeItem("education", edu.id)}
                                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-1"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <input
                                            placeholder="School / University"
                                            value={edu.school}
                                            onChange={(e) => handleArrayChange("education", edu.id, "school", e.target.value)}
                                            className="w-full border p-2 rounded-md focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                    <input
                                        placeholder="Degree (e.g. BSc Computer Science)"
                                        value={edu.degree}
                                        onChange={(e) => handleArrayChange("education", edu.id, "degree", e.target.value)}
                                        className="w-full border p-2 rounded-md focus:border-blue-500 outline-none"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            placeholder="Start Year"
                                            value={edu.startDate}
                                            onChange={(e) => handleArrayChange("education", edu.id, "startDate", e.target.value)}
                                            className="w-full border p-2 rounded-md focus:border-blue-500 outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="End Year"
                                            value={edu.endDate}
                                            onChange={(e) => handleArrayChange("education", edu.id, "endDate", e.target.value)}
                                            className="w-full border p-2 rounded-md focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {formData.education.length === 0 && (
                            <div className="text-center py-8 text-slate-400 bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
                                Click "Add" to enter your education details.
                            </div>
                        )}
                    </div>
                </section>

                {/* Section 3: Projects & Skills */}
                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-bl-xl border-l border-b border-slate-200">
                        Step 3 of 4
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-sm">3</span>
                            Projects & Skills
                        </h2>
                        <p className="text-sm text-slate-500 ml-10 mt-1">
                            Showcase your technical expertise.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                                <Sparkles className="h-4 w-4 text-indigo-500" /> Key Skills
                            </label>
                            <input
                                value={formData.skills}
                                onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                                placeholder="e.g. React, TypeScript, Node.js, Python, AWS..."
                                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 font-medium"
                            />
                            <p className="text-xs text-slate-500 mt-1.5 ml-1">Comma-separated values recommended for AI parsing.</p>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-slate-800">Projects</h3>
                                <button onClick={() => addParams("projects")} className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition">
                                    <Plus className="h-4 w-4" /> Add Project
                                </button>
                            </div>
                            <div className="space-y-4">
                                {formData.projects.map((proj, idx) => (
                                    <div key={proj.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100 relative group animate-in fade-in">
                                        <div className="absolute -left-3 top-4 bg-slate-200 text-slate-500 text-xs w-6 h-6 flex items-center justify-center rounded-full border border-white font-bold">
                                            {idx + 1}
                                        </div>
                                        <button
                                            onClick={() => removeItem("projects", proj.id)}
                                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-1"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                        <div className="space-y-3">
                                            <input
                                                placeholder="Project Title"
                                                value={proj.name}
                                                onChange={(e) => handleArrayChange("projects", proj.id, "name", e.target.value)}
                                                className="w-full border p-2 rounded-md focus:border-blue-500 outline-none font-medium"
                                            />
                                            <input
                                                placeholder="Tech Stack (e.g. Next.js, Supabase)"
                                                value={proj.technologies}
                                                onChange={(e) => handleArrayChange("projects", proj.id, "technologies", e.target.value)}
                                                className="w-full border p-2 rounded-md focus:border-blue-500 outline-none text-sm"
                                            />
                                            <textarea
                                                placeholder="What did you build? What was the outcome?"
                                                value={proj.description}
                                                onChange={(e) => handleArrayChange("projects", proj.id, "description", e.target.value)}
                                                className="w-full border p-2 rounded-md h-20 focus:border-blue-500 outline-none text-sm resize-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                                {formData.projects.length === 0 && <p className="text-slate-400 italic text-sm pl-2">No projects added yet.</p>}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Experience */}
                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-bl-xl border-l border-b border-slate-200">
                        Step 4 of 4
                    </div>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-sm">4</span>
                                Experience
                            </h2>
                            <p className="text-sm text-slate-500 ml-10 mt-1">
                                Clear achievements help AI quantify your impact.
                            </p>
                        </div>
                        <button onClick={() => addParams("experience")} className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition">
                            <Plus className="h-4 w-4" /> Add Experience
                        </button>
                    </div>

                    <div className="space-y-6">
                        {formData.experience.map((exp, idx) => (
                            <div key={exp.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100 relative group animate-in fade-in">
                                <div className="absolute -left-3 top-4 bg-slate-200 text-slate-500 text-xs w-6 h-6 flex items-center justify-center rounded-full border border-white font-bold">
                                    {idx + 1}
                                </div>
                                <button
                                    onClick={() => removeItem("experience", exp.id)}
                                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-1"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            placeholder="Job Title"
                                            value={exp.position}
                                            onChange={(e) => handleArrayChange("experience", exp.id, "position", e.target.value)}
                                            className="w-full border p-2 rounded-md focus:border-blue-500 outline-none font-medium"
                                        />
                                        <input
                                            placeholder="Company"
                                            value={exp.company}
                                            onChange={(e) => handleArrayChange("experience", exp.id, "company", e.target.value)}
                                            className="w-full border p-2 rounded-md focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Duration/Start"
                                            value={exp.startDate}
                                            onChange={(e) => handleArrayChange("experience", exp.id, "startDate", e.target.value)}
                                            className="w-full border p-2 rounded-md focus:border-blue-500 outline-none text-sm"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Duration/End"
                                            value={exp.endDate}
                                            onChange={(e) => handleArrayChange("experience", exp.id, "endDate", e.target.value)}
                                            className="w-full border p-2 rounded-md focus:border-blue-500 outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Responsibilities & Achievements</label>
                                        <textarea
                                            placeholder="• Led a team of 5 developers...&#10;• Increased revenue by 20%..."
                                            value={exp.description}
                                            onChange={(e) => handleArrayChange("experience", exp.id, "description", e.target.value)}
                                            className="w-full border p-2 rounded-md h-32 focus:border-blue-500 outline-none text-sm leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {formData.experience.length === 0 && (
                            <div className="text-center py-8 text-slate-400 bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
                                Click "Add" to enter your work experience.
                            </div>
                        )}
                    </div>
                </section>

                {/* Live Preview Section */}
                <section className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
                    <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-yellow-400" /> Standardized Resume Preview (Demo)
                            </h2>
                            <p className="text-xs text-slate-400 mt-0.5">Preview based on CareerLift’s fixed ATS-optimized template</p>
                        </div>
                        <div className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded border border-blue-500/30">
                            Live Output
                        </div>
                    </div>

                    <div className="p-6 grid gap-6 lg:grid-cols-2">
                        {/* Info Box */}
                        <div className="lg:col-span-2 bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg flex gap-3 text-sm text-blue-200">
                            <Info className="h-5 w-5 shrink-0 text-blue-400" />
                            <p>
                                All resumes generated by CareerLift follow a single, <strong>ATS-optimized template</strong> to ensure recruiter readability and fair comparison across candidates.
                            </p>
                        </div>

                        {/* JSON View */}
                        <div className="relative">
                            <div className="absolute top-2 right-2 text-[10px] text-slate-500 font-mono">JSON Structure</div>
                            <pre className="text-xs font-mono text-green-400 bg-black/50 p-4 rounded-lg h-96 overflow-auto border border-slate-800 shadow-inner">
                                {JSON.stringify(bindToTemplate(formData), null, 2)}
                            </pre>
                        </div>

                        {/* Visual Mockup */}
                        <div className="bg-white p-6 rounded-lg h-96 overflow-auto text-slate-900 text-[10px] font-serif leading-relaxed shadow-white">
                            <div className="text-center border-b pb-4 mb-4">
                                <h1 className="text-xl font-bold uppercase tracking-wider mb-1">{formData.personalInfo.fullName || "YOUR NAME"}</h1>
                                <p className="text-slate-600">
                                    {formData.personalInfo.email} • {formData.personalInfo.phone} • {location || "Location"}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold border-b border-slate-300 mb-1">PROFESSIONAL SUMMARY</h3>
                                    <p>Experienced professional with a proven track record. (AI Generated Placeholder)</p>
                                </div>

                                <div>
                                    <h3 className="font-bold border-b border-slate-300 mb-1">SKILLS</h3>
                                    <p>{formData.skills || "List your skills here..."}</p>
                                </div>

                                <div>
                                    <h3 className="font-bold border-b border-slate-300 mb-1">EXPERIENCE</h3>
                                    {formData.experience.length > 0 ? formData.experience.map((exp, i) => (
                                        <div key={i} className="mb-2">
                                            <div className="flex justify-between font-bold">
                                                <span>{exp.company}</span>
                                                <span>{exp.startDate} - {exp.endDate}</span>
                                            </div>
                                            <div className="italic mb-1">{exp.position}</div>
                                            <ul className="list-disc pl-4 space-y-0.5">
                                                {exp.description ? <li>{exp.description}</li> : <li>Achievements will appear here...</li>}
                                            </ul>
                                        </div>
                                    )) : <p className="italic text-slate-400">Add experience to see preview...</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Submit Action */}
                <div className="flex flex-col items-center gap-4 pt-8 border-t border-slate-100">
                    <div className="flex items-start gap-3 bg-blue-50 text-blue-800 p-4 rounded-lg max-w-2xl text-sm border border-blue-100">
                        <Info className="h-5 w-5 shrink-0 text-blue-600" />
                        <p>
                            <strong>Standardized Optimization:</strong> All resumes generated by CareerLift follow a standardized, ATS-optimized template for maximum consistency and recruiter readability.
                        </p>
                    </div>

                    <button
                        onClick={async () => {
                            setIsDownloading(true);
                            try {
                                const result = await import("@/app/actions/download-pdf").then(m => m.downloadPdfAction(bindToTemplate(formData)));

                                if (result.success && result.data) {
                                    const byteCharacters = atob(result.data);
                                    const byteNumbers = new Array(byteCharacters.length);
                                    for (let i = 0; i < byteCharacters.length; i++) {
                                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                                    }
                                    const byteArray = new Uint8Array(byteNumbers);
                                    const blob = new Blob([byteArray], { type: result.type === 'pdf' ? 'application/pdf' : 'application/x-tex' });

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
                            } catch (e: any) {
                                console.error(e);
                                alert("Download failed. Please try again.");
                            } finally {
                                setIsDownloading(false);
                            }
                        }}
                        disabled={isDownloading}
                        className="flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-slate-500/20"
                    >
                        {isDownloading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="h-5 w-5" />
                        )}
                        {isDownloading ? "Generating..." : "Generate Resume"}
                    </button>
                    <p className="text-xs text-slate-500">Ready for download</p>
                </div>
            </div>
        </div>
    );
}
