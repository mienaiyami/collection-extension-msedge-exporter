import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type JsonDisplayProps = {
    jsonData: string;
    fileName: string | null;
};

export const JsonDisplay = ({ jsonData, fileName }: JsonDisplayProps) => {
    const downloadJson = () => {
        if (!jsonData) return;

        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName
            ? `${fileName.replace(".sqlite", "")}_exported.json`
            : "exported_data.json";
        a.click();
        URL.revokeObjectURL(url);

        toast.success("JSON file downloaded successfully");
    };

    if (!jsonData) return null;

    return (
        <div className="mt-6 overflow-hidden">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Extracted JSON Data</h3>
                <Button onClick={downloadJson} variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download JSON
                </Button>
            </div>
            <div className="bg-muted rounded-lg cursor-text overflow-clip">
                <pre className="text-sm max-h-[500px] p-4 overflow-auto ">
                    {jsonData}
                </pre>
            </div>
        </div>
    );
};
