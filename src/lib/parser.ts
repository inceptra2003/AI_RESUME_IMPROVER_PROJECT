/* eslint-disable */
export async function parseResume(file: File): Promise<string> {
    // @ts-ignore
    const pdf = require("pdf-parse");
    // @ts-ignore
    const mammoth = require("mammoth");

    const buffer = Buffer.from(await file.arrayBuffer());

    if (file.type === "application/pdf") {
        const data = await pdf(buffer);
        return data.text;
    }

    if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name.endsWith(".docx")
    ) {
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
    }

    throw new Error("Unsupported file format. Please upload PDF or DOCX.");
}
