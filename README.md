# MSEdge Collections Exporter for Collection Extension 2.0

A web-based tool that allows users to export their Microsoft Edge Collections to a JSON file compatible with Collection Extension 2.0.

Visit the [live tool](https://mienaiyami.github.io/edge-collections-exporter/)

## Overview

This tool helps users transfer their saved collections from Microsoft Edge's SQLite database into a JSON format compatible with Collection Extension 2.0. The process happens entirely client-side using WebAssembly, ensuring your data never leaves your browser.

## Features

- **Client-side Processing**: Uses SQL.js (WebAssembly) to process SQLite files directly in the browser
- **Data Privacy**: All processing happens locally - no data is sent to any server
- **Simple Interface**: Easy-to-use drag-and-drop interface
- **Data Validation**: Ensures the exported JSON matches the Collection Extension 2.0 format

## How to Use

1. **Locate your Edge Collections SQLite file**:
   - Default location: `%LocalAppData%\Microsoft\Edge\User Data\Default\Collections\collectionsSQLite`
   - You can copy this path from the application

2. **Upload the file**:
   - Drag and drop or click to select the SQLite file
   - The tool will process the file and extract your collections

3. **Download the JSON**:
   - Review the extracted data
   - Click "Download JSON" to save the file

4. **Import into Collection Extension 2.0**:
   - Use the import feature in Collection Extension 2.0 to import the downloaded JSON file

## Data Format

The tool converts Edge Collections to the following JSON structure:

```typescript
type Collection = {
    id: UUID;
    title: string;
    items: {
        id: UUID;
        title: string;
        url: string;
        img: string;
        createdAt: number;
        orderUpdatedAt: number;
    }[];
    createdAt: number;
    updatedAt: number;
    orderUpdatedAt: number;
}
```

Date is in Unix timestamp format.

## Development

This project is built with:

- React
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- SQL.js

### Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm run dev
   ```

### Building for Production

```bash
pnpm run build
```

## License

MIT

## Related Projects

- [Collection Extension 2.0](https://github.com/mienaiyami/collection-extension-2.0) - The browser extension this importer is designed for
