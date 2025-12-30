import { StandardResumeJSON } from "@/lib/templates/standard";

function escapeLatex(str: string | undefined | null): string {
    if (!str) return "";
    return str
        .replace(/\\/g, "\\textbackslash{}")
        .replace(/&/g, "\\&")
        .replace(/%/g, "\\%")
        .replace(/\$/g, "\\$")
        .replace(/#/g, "\\#")
        .replace(/_/g, "\\_")
        .replace(/\{/g, "\\{")
        .replace(/\}/g, "\\}")
        .replace(/\^/g, "\\textasciicircum{}")
        .replace(/~/g, "\\textasciitilde{}");
}

export function generateLatex(data: StandardResumeJSON): string {
    const { header, sections } = data;

    let latex = `
\\documentclass[a4paper,10pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{geometry}

\\geometry{left=0.7in, top=0.6in, right=0.7in, bottom=0.6in}

\\titleformat{\\section}{\\Large\\bfseries\\uppercase}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{12pt}{8pt}

\\begin{document}

%----------HEADER----------
\\begin{center}
    {\\Huge \\textbf{${escapeLatex(header.name)}}} \\\\ \\vspace{4pt}
    ${header.contact.email ? `\\href{mailto:${header.contact.email}}{${escapeLatex(header.contact.email)}}` : ""} 
    ${header.contact.phone ? ` $|$ ${escapeLatex(header.contact.phone)}` : ""}
    ${header.contact.linkedin ? ` $|$ \\href{${header.contact.linkedin}}{LinkedIn}` : ""}
    ${header.contact.website ? ` $|$ \\href{${header.contact.website}}{Portfolio}` : ""}
\\end{center}

`;

    sections.forEach((section) => {
        latex += `\\section{${escapeLatex(section.title)}}\n`;

        if (section.type === "experience" || section.type === "projects") {
            latex += `\\begin{itemize}[leftmargin=*, label={}]\n`;

            section.content.forEach((item: any) => {
                const title = item.role || item.name;
                const subtitle = item.institution || item.tech;
                const period = item.period || "";

                latex += `    \\item\n`;
                latex += `    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}\n`;
                latex += `      \\textbf{${escapeLatex(title)}} & ${escapeLatex(period)} \\\\\n`;
                if (subtitle) latex += `      \\textit{${escapeLatex(subtitle)}} & \\\\\n`;
                latex += `    \\end{tabular*}\\vspace{-5pt}\n`;

                if (Array.isArray(item.details) && item.details.length > 0) {
                    latex += `    \\begin{itemize}[leftmargin=0.2in, label=$\\bullet$]\n`;
                    item.details.forEach((detail: string) => {
                        latex += `        \\item ${escapeLatex(detail)}\n`;
                    });
                    latex += `    \\end{itemize}\n`;
                } else if (item.description) {
                    latex += `    \\begin{itemize}[leftmargin=0.2in, label=$\\bullet$]\n`;
                    latex += `        \\item ${escapeLatex(item.description)}\n`;
                    latex += `    \\end{itemize}\n`;
                }
                latex += `    \\vspace{2pt}\n`;
            });

            latex += `\\end{itemize}\n`;
        } else if (section.type === "education") {
            latex += `\\begin{itemize}[leftmargin=*, label={}]\n`;
            section.content.forEach((item: any) => {
                latex += `    \\item\n`;
                latex += `    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}\n`;
                latex += `      \\textbf{${escapeLatex(item.institution)}} & ${escapeLatex(item.period)} \\\\\n`;
                latex += `      \\textit{${escapeLatex(item.degree)}} & \\\\\n`;
                latex += `    \\end{tabular*}\\vspace{-5pt}\n`;
            });
            latex += `\\end{itemize}\n`;
        } else if (section.type === "skills") {
            latex += `\\begin{itemize}[leftmargin=0.2in, label=$\\bullet$]\n`;
            latex += `    \\item \\textbf{Skills}: ${escapeLatex(section.content.join(", "))}\n`;
            latex += `\\end{itemize}\n`;
        } else {
            // Fallback for generic sections (like summary)
            latex += `${escapeLatex(String(section.content))}\n`;
        }

        latex += `\\vspace{2pt}\n\n`;
    });

    latex += `\\end{document}`;
    return latex;
}
