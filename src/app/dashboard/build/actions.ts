"use server";

import { ResumeData } from "@/types/resume";
import { bindToTemplate } from "@/lib/templates/standard";

export async function generateResumeAction(data: ResumeData) {
    // In a real app, this might save to DB or call an AI service.
    // For now, it purely binds the data to the standard template.

    const standardJSON = bindToTemplate(data);

    console.log("Generated Resume JSON:", JSON.stringify(standardJSON, null, 2));

    return {
        success: true,
        data: standardJSON
    };
}
