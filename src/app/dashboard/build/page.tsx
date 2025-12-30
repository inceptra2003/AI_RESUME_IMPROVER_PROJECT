"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { type ResumeData } from "@/types/resume";
import { generateResumeAction } from "./actions";

export default function BuildResumePage() {
    const [formData, setFormData] = useState<ResumeData>({
        personalInfo: { fullName: "", email: "", phone: "", linkedin: "", website: "" },
        education: [],
        experience: [],
        projects: [],
        skills: "",
    });

    const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [name]: value },
        }));
    };

    // Generic handler for array fields (Education, Experience, Projects)
    const addParams = (section: "education" | "experience" | "projects") => {
        const id = Math.random().toString(36).substr(2, 9);
        const newItems = {
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

    const handleSave = async () => {
        try {
            const result = await generateResumeAction(formData);
            if (result.success) {
                alert("Resume saved! Check console for JSON.");
                console.log(result.data);
            }
        } catch (error) {
            console.error("Failed to save:", error);
            alert("Failed to save resume.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Build Your Resume</h1>
                    <p className="text-slate-600">Fill in the details below to generate your resume.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Save className="h-4 w-4" /> Save Progress
                </button>
            </div>

            <div className="space-y-8">
                {/* Personal Info */}
                <section className="bg-white p-6 rounded-xl border shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-slate-800">1. Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.personalInfo.fullName}
                            onChange={handlePersonalChange}
                            className="border p-2 rounded-lg w-full"
                        />
                        <input
                            name="email"
                            placeholder="Email Address"
                            value={formData.personalInfo.email}
                            onChange={handlePersonalChange}
                            className="border p-2 rounded-lg w-full"
                        />
                        <input
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.personalInfo.phone}
                            onChange={handlePersonalChange}
                            className="border p-2 rounded-lg w-full"
                        />
                        <input
                            name="linkedin"
                            placeholder="LinkedIn URL"
                            value={formData.personalInfo.linkedin}
                            onChange={handlePersonalChange}
                            className="border p-2 rounded-lg w-full"
                        />
                    </div>
                </section>

                {/* Education */}
                <section className="bg-white p-6 rounded-xl border shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-slate-800">2. Education</h2>
                        <button onClick={() => addParams("education")} className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline">
                            <Plus className="h-4 w-4" /> Add Education
                        </button>
                    </div>
                    <div className="space-y-4">
                        {formData.education.map((edu) => (
                            <div key={edu.id} className="p-4 bg-slate-50 rounded-lg relative group">
                                <button
                                    onClick={() => removeItem("education", edu.id)}
                                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input
                                        placeholder="School / University"
                                        value={edu.school}
                                        onChange={(e) => handleArrayChange("education", edu.id, "school", e.target.value)}
                                        className="border p-2 rounded-md"
                                    />
                                    <input
                                        placeholder="Degree"
                                        value={edu.degree}
                                        onChange={(e) => handleArrayChange("education", edu.id, "degree", e.target.value)}
                                        className="border p-2 rounded-md"
                                    />
                                    <input
                                        type="date"
                                        placeholder="Start Date"
                                        value={edu.startDate}
                                        onChange={(e) => handleArrayChange("education", edu.id, "startDate", e.target.value)}
                                        className="border p-2 rounded-md"
                                    />
                                    <input
                                        type="date"
                                        placeholder="End Date"
                                        value={edu.endDate}
                                        onChange={(e) => handleArrayChange("education", edu.id, "endDate", e.target.value)}
                                        className="border p-2 rounded-md"
                                    />
                                </div>
                            </div>
                        ))}
                        {formData.education.length === 0 && <p className="text-slate-400 italic text-sm">No education added yet.</p>}
                    </div>
                </section>

                {/* Projects & Skills */}
                <section className="bg-white p-6 rounded-xl border shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-slate-800">3. Projects & Skills</h2>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Skills (Comma separated)</label>
                        <textarea
                            value={formData.skills}
                            onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                            placeholder="React, TypeScript, Node.js, Python..."
                            className="border p-2 rounded-lg w-full h-24"
                        />
                    </div>

                    <div className="flex justify-between items-center mb-4 border-t pt-4">
                        <h3 className="text-lg font-medium text-slate-800">Projects</h3>
                        <button onClick={() => addParams("projects")} className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline">
                            <Plus className="h-4 w-4" /> Add Project
                        </button>
                    </div>
                    <div className="space-y-4">
                        {formData.projects.map((proj) => (
                            <div key={proj.id} className="p-4 bg-slate-50 rounded-lg relative group">
                                <button
                                    onClick={() => removeItem("projects", proj.id)}
                                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                <div className="grid grid-cols-1 gap-3">
                                    <input
                                        placeholder="Project Name"
                                        value={proj.name}
                                        onChange={(e) => handleArrayChange("projects", proj.id, "name", e.target.value)}
                                        className="border p-2 rounded-md"
                                    />
                                    <input
                                        placeholder="Technologies Used"
                                        value={proj.technologies}
                                        onChange={(e) => handleArrayChange("projects", proj.id, "technologies", e.target.value)}
                                        className="border p-2 rounded-md"
                                    />
                                    <textarea
                                        placeholder="Brief Description"
                                        value={proj.description}
                                        onChange={(e) => handleArrayChange("projects", proj.id, "description", e.target.value)}
                                        className="border p-2 rounded-md h-20"
                                    />
                                </div>
                            </div>
                        ))}
                        {formData.projects.length === 0 && <p className="text-slate-400 italic text-sm">No projects added yet.</p>}
                    </div>
                </section>

                {/* Experience */}
                <section className="bg-white p-6 rounded-xl border shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-slate-800">4. Experience</h2>
                        <button onClick={() => addParams("experience")} className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline">
                            <Plus className="h-4 w-4" /> Add Experience
                        </button>
                    </div>
                    <div className="space-y-4">
                        {formData.experience.map((exp) => (
                            <div key={exp.id} className="p-4 bg-slate-50 rounded-lg relative group">
                                <button
                                    onClick={() => removeItem("experience", exp.id)}
                                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input
                                        placeholder="Company Name"
                                        value={exp.company}
                                        onChange={(e) => handleArrayChange("experience", exp.id, "company", e.target.value)}
                                        className="border p-2 rounded-md"
                                    />
                                    <input
                                        placeholder="Position / Title"
                                        value={exp.position}
                                        onChange={(e) => handleArrayChange("experience", exp.id, "position", e.target.value)}
                                        className="border p-2 rounded-md"
                                    />
                                    <input
                                        type="date"
                                        placeholder="Start Date"
                                        value={exp.startDate}
                                        onChange={(e) => handleArrayChange("experience", exp.id, "startDate", e.target.value)}
                                        className="border p-2 rounded-md"
                                    />
                                    <input
                                        type="date"
                                        placeholder="End Date"
                                        value={exp.endDate}
                                        onChange={(e) => handleArrayChange("experience", exp.id, "endDate", e.target.value)}
                                        className="border p-2 rounded-md"
                                    />
                                    <div className="col-span-1 md:col-span-2">
                                        <textarea
                                            placeholder="Responsibilities & Achievements"
                                            value={exp.description}
                                            onChange={(e) => handleArrayChange("experience", exp.id, "description", e.target.value)}
                                            className="border p-2 rounded-md w-full h-24"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {formData.experience.length === 0 && <p className="text-slate-400 italic text-sm">No work experience added yet.</p>}
                    </div>
                </section>
            </div>
        </div>
    );
}
