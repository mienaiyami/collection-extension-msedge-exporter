import { Navbar } from "./components/Navbar";
import { SqliteProcessor } from "./components/SqliteProcessor";

export const EdgeExporter = () => {
    return (
        <div className="max-w-screen-md mx-auto py-8 px-4">
            <Navbar />
            <SqliteProcessor />
        </div>
    );
};
