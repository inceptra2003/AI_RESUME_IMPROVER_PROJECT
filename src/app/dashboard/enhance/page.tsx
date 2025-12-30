"use client";

import { useActionState, useState } from "react";
import { Upload, Sparkles, Loader2, Download } from "lucide-react";
import { uploadAndAnalyze } from "./actions";
import { downloadPdfAction } from "./download-actions";

const initialState = {
    success: false,
    message: "",
};

export default function EnhanceResumePage() {
    const [state, formAction, isPending] = useActionState(uploadAndAnalyze, initialState);
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        if (!state.success || !(state as any).payloadPreview) return;

        setDownloading(true);
        try {
            const result = await downloadPdfAction((state as any).payloadPreview);

            if (result.success || result.fallback) {
                // Convert base64 to blob
                const byteCharacters = atob(result.data as string);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: result.type === 'pdf' ? 'application/pdf' : 'application/x-tex' });

                // Create download link
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = result.filename as string;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);

                if (result.fallback) {
                    alert(result.message);
                }
            }
        } catch (e) {
            console.error(e);
            alert("Download failed.");
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto pb-20">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="h-8 w-8 text-blue-600" />
                    Enhance Resume
                </h1>
                <p className="text-slate-600 mt-2">
                    Upload your current resume and the job description you are targeting.
                    Our AI will optimize keywords and formatting for you.
                </p>
            </div>

            <div className="bg-white rounded-xl border shadow-sm p-8">
                <form action={formAction} className="space-y-8">
                    {/* File Upload */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700">1. Upload Resume (PDF or DOCX)</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors">
                            <div className="flex flex-col items-center gap-2">
                                <Upload className="h-10 w-10 text-slate-400" />
                                <span className="text-sm text-slate-500">
                                    Drag and drop or <span className="text-blue-600 font-medium">browse</span>
                                </span>
                                <input
                                    type="file"
                                    name="resume"
                                    accept=".pdf,.docx"
                                    required
                                    className="w-full opacity-0 absolute inset-0 cursor-pointer h-32"
                                />
                                <p className="text-xs text-slate-400 mt-2">Supported formats: .pdf, .docx (Max 5MB)</p>
                            </div>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700">2. Paste Job Description</label>
                        <textarea
                            name="jobDescription"
                            required
                            placeholder="Paste the full job description here..."
                            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                            defaultValue=""
                        />
                    </div>

                    {/* Status Message */}
                    {state.message && (
                        <div className={`p-4 rounded-lg text-sm ${state.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {state.message}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" /> Analyzing...
                            </>
                        ) : (
                            <>
                                Start AI Optimization <Sparkles className="h-5 w-5" />
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Results Preview & Download */}
            {state.success && (state as any).payloadPreview && (
                <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-800">Optimization Result</h3>
                        <button
                            onClick={handleDownload}
                            disabled={downloading}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-70"
                        >
                            {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                            Download PDF
                        </button>
                    </div>

                    <div className="bg-slate-100 p-6 rounded-lg text-xs font-mono text-slate-700 overflow-auto max-h-64">
                        <pre>{JSON.stringify((state as any).payloadPreview, null, 2)}</pre>
                    </div>
                </div>
            )}
        </div>
    );
}
