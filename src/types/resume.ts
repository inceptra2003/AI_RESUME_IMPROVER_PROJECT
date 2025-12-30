export interface ResumeData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        linkedin: string;
        website: string;
    };
    education: Array<{
        id: string;
        school: string;
        degree: string;
        startDate: string;
        endDate: string;
    }>;
    experience: Array<{
        id: string;
        company: string;
        position: string;
        startDate: string;
        endDate: string;
        description: string;
    }>;
    projects: Array<{
        id: string;
        name: string;
        description: string;
        technologies: string;
    }>;
    skills: string; // Comma-separated for simplicity in MVP
}
