"use server";

import { parseResume } from "@/lib/parser";
import { optimizeResume } from "@/lib/ai";

export async function uploadAndAnalyze(prevState: any, formData: FormData) {
    try {
        const file = formData.get("resume") as File;
        const jobDescription = formData.get("jobDescription") as string;

        if (!file || file.size === 0) {
            return { success: false, message: "Please upload a valid resume file." };
        }

        if (!jobDescription || jobDescription.trim().length === 0) {
            return { success: false, message: "Please enter a job description." };
        }

        // 1. Extract Text
        const resumeText = await parseResume(file);

        // 2. Prepare Payload
        const payload = {
            resumeText: resumeText.trim(),
            jobDescription: jobDescription.trim(),
            timestamp: new Date().toISOString()
        };

        // 3. AI Optimization
        console.log("Starting AI Optimization...");
        const optimizedResume = await optimizeResume(payload.resumeText, payload.jobDescription);

        console.log("AI Optimization Complete. Payload size:", JSON.stringify(optimizedResume).length);

        return {
            success: true,
            message: "Resume optimized successfully! AI has rewritten your content.",
            payloadPreview: optimizedResume
        };

    } catch (error) {
        console.error("Enhancement Error:", error);
        return { success: false, message: "Failed to process resume. Please try again." };
    }
}
