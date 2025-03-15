import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { EdgeExporter } from "./features/edge-exporter";

function App() {
    return (
        <ThemeProvider defaultTheme="dark">
            <EdgeExporter />
            <Toaster richColors />
        </ThemeProvider>
    );
}

export default App;
