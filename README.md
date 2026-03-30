# Kindle Cover Formatter

![Kindle Cover Formatter](./public/metadata-image.png)

A modern, responsive web application designed to help e-reader enthusiasts perfectly format their book cover images. Tailored for various devices, this tool ensures your library looks professional and consistent.

## 🚀 Features

-   **Device-Specific Presets**: Select from a range of popular e-reader models (Kindle, Kobo, etc.) to get the exact aspect ratio.
-   **Custom Dimensions**: Need a specific size? Input your own dimensions for full control.
-   **Live Preview**: See exactly how your cover will look before downloading.
-   **Intuitive Drag & Drop**: Easy-to-use interface for uploading and managing your images.
-   **Premium Aesthetics**: A clean, modern UI built with dark mode in mind and smooth micro-animations.

## 🛠️ Built With

-   **[React](https://reactjs.org/)** - For the interactive UI components.
-   **[TypeScript](https://www.typescriptlang.org/)** - For robust, type-safe development.
-   **[Vite](https://vitejs.dev/)** - For an ultra-fast build and development experience.
-   **[Tailwind CSS](https://tailwindcss.com/)** - For modern, responsive styling.
-   **[Lucide React](https://lucide.dev/)** - For beautiful, consistent iconography.

## 📂 Project Structure

```text
ereader-cover-formatter/
├── public/                 # Static assets
│   ├── metadata-image.png  # Project thumbnail/screenshot
│   ├── icons.svg           # Shared iconography
│   └── favicon.svg         # App favicon
├── src/                    # Source code
│   ├── components/         # Reusable React components
│   │   ├── DropZone.tsx    # Image upload and manipulation area
│   │   ├── Header.tsx      # Main navigation and application header
│   │   └── Sidebar.tsx     # Configuration and preset settings
│   ├── App.tsx             # Main application orchestrator
│   ├── index.css           # Global styles and Tailwind directives
│   └── main.tsx            # Application entry point
├── package.json            # Project dependencies and scripts
└── vite.config.ts          # Vite configuration
```

## 🏁 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/ereader-cover-formatter.git
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    # or
    pnpm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  **Build for production**:
    ```bash
    npm run build
    ```

---

*Transform your e-reader library one cover at a time.*
