import { ResumeData } from "@/types/resume";

export interface StandardResumeJSON {
    meta: {
        templateId: string;
        version: string;
        generatedAt: string;
    };
    header: {
        name: string;
        contact: {
            email: string;
            phone: string;
            linkedin?: string;
            website?: string;
        };
    };
    sections: {
        id: string;
        title: string;
        type: "summary" | "education" | "experience" | "projects" | "skills";
        content: any; // Flexible content based on type
    }[];
}

export function bindToTemplate(data: ResumeData): StandardResumeJSON {
    return {
        meta: {
            templateId: "default-v1",
            version: "1.0.0",
            generatedAt: new Date().toISOString(),
        },
        header: {
            name: data.personalInfo.fullName,
            contact: {
                email: data.personalInfo.email,
                phone: data.personalInfo.phone,
                linkedin: data.personalInfo.linkedin || undefined,
                website: data.personalInfo.website || undefined,
            },
        },
        sections: [
            // Experience Section
            {
                id: "exp",
                title: "Professional Experience",
                type: "experience",
                content: data.experience.map((exp) => ({
                    institution: exp.company,
                    role: exp.position,
                    period: `${exp.startDate} - ${exp.endDate || "Present"}`,
                    details: exp.description ? [exp.description] : [], // Wrap single description in array for multiple bullets support later
                })),
            },
            // Projects Section
            {
                id: "proj",
                title: "Key Projects",
                type: "projects",
                content: data.projects.map((proj) => ({
                    name: proj.name,
                    tech: proj.technologies,
                    description: proj.description,
                })),
            },
            // Education Section
            {
                id: "edu",
                title: "Education",
                type: "education",
                content: data.education.map((edu) => ({
                    institution: edu.school,
                    degree: edu.degree,
                    period: `${edu.startDate} - ${edu.endDate || "Present"}`,
                })),
            },
            // Skills Section
            {
                id: "skills",
                title: "Technical Skills",
                type: "skills",
                content: data.skills.split(",").map(s => s.trim()).filter(Boolean),
            },
        ],
    };
}
