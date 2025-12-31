"use server";

import { StandardResumeJSON } from "@/lib/templates/standard";
import { generateLatex } from "@/lib/latex/generator";

export async function downloadPdfAction(data: StandardResumeJSON) {
    try {
        const latex = generateLatex(data);
        // Use latexonline.cc public API via POST (better for large content)
        const formData = new FormData();
        formData.append("text", latex);

        const response = await fetch("https://latexonline.cc/compile", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            console.error("LatexOnline failed:", response.status, await response.text());
            throw new Error("Compilation failed");
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');

        return {
            success: true,
            type: "pdf",
            data: base64,
            filename: "resume.pdf"
        };
    } catch (error) {
        console.error("PDF Generation Error:", error);
        // Fallback: Return format for .tex file
        return {
            success: false,
            fallback: true,
            type: "tex",
            data: generateLatex(data), // Return raw latex
            filename: "resume.tex",
            message: "PDF generation failed (service might be busy). Downloading source .tex instead."
        };
    }
}
