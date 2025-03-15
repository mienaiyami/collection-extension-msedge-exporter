import { FileUp, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatFileSize } from "@/lib/utils";
import { FILE_SIZE_WARNING_THRESHOLD } from "../constants";

type FileUploadProps = {
    onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    fileName: string | null;
    fileSize: number | null;
};

export const FileUpload = ({
    onFileSelect,
    isLoading,
    fileName,
    fileSize,
}: FileUploadProps) => {
    const isFileTooLarge = (size: number) => size > FILE_SIZE_WARNING_THRESHOLD;

    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor="sqlite-file"
                className="select-none cursor-pointer border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-muted-foreground/50 transition-colors focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        document.getElementById("sqlite-file")?.click();
                    }
                }}
            >
                <FileUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">
                    {isLoading
                        ? "Processing..."
                        : "Click to upload a SQLite file"}
                </p>
                <input
                    id="sqlite-file"
                    type="file"
                    onChange={onFileSelect}
                    className="hidden"
                    disabled={isLoading}
                />
            </label>

            {fileName && fileSize && (
                <div className="text-sm text-muted-foreground mt-2">
                    {fileName} ({formatFileSize(fileSize)})
                </div>
            )}

            {fileSize && isFileTooLarge(fileSize) && (
                <Alert variant="default" className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                        This file is larger than{" "}
                        {formatFileSize(FILE_SIZE_WARNING_THRESHOLD)} and may
                        cause performance issues in the browser. The process
                        might take longer or potentially crash.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
};
