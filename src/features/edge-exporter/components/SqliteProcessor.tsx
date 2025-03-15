import { useState } from "react";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clipboard } from "lucide-react";
import { sqlitePath } from "@/lib/utils";
import { FileUpload } from "./FileUpload";
import { JsonDisplay } from "./JsonDisplay";
import { processSqliteFile } from "../services/sqliteService";

export const SqliteProcessor = () => {
    const [jsonData, setJsonData] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileSize, setFileSize] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        setFileSize(file.size);
        setIsLoading(true);
        setJsonData(null);

        try {
            const result = await processSqliteFile(file);

            if (result.jsonData) {
                setJsonData(result.jsonData);

                if (result.errorCount > 0) {
                    toast.error(
                        `Failed to parse ${result.errorCount} items. Please check the console for more details.`
                    );
                }

                toast.success(
                    `Successfully extracted ${result.collectionsCount} collections and ${result.itemsCount} items`,
                    {
                        duration: 20000,
                    }
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const copyPath = () => {
        navigator.clipboard.writeText(sqlitePath);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <Card className="mx-auto">
            <CardHeader>
                <CardTitle>
                    Upload{" "}
                    <code className="bg-muted p-1 rounded-md">
                        collectionsSQLite
                    </code>{" "}
                    File
                </CardTitle>
                <CardDescription className="text-xs flex items-center gap-2">
                    <Button
                        variant="outline"
                        size={"sm"}
                        className="text-xs"
                        onClick={copyPath}
                    >
                        {copied ? (
                            <>
                                <Check className="size-4" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Clipboard className="size-4" />
                                Copy
                            </>
                        )}
                    </Button>
                    <code className="bg-muted p-1 rounded-md">
                        {sqlitePath}
                    </code>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    <FileUpload
                        onFileSelect={handleFileUpload}
                        isLoading={isLoading}
                        fileName={fileName}
                        fileSize={fileSize}
                    />

                    {jsonData && (
                        <JsonDisplay jsonData={jsonData} fileName={fileName} />
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
