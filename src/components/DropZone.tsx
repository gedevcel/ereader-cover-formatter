import React, { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";

interface DropZoneProps {
  onImageUpload: (file: File) => void;
  preview: string | null;
  onClear: () => void;
  fileName: string | null;
  currentResolution: string;
}

export const DropZone: React.FC<DropZoneProps> = ({
  onImageUpload,
  preview,
  onClear,
  fileName,
  currentResolution,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onImageUpload(file);
      }
    },
    [onImageUpload],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onImageUpload(file);
      }
    },
    [onImageUpload],
  );

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative aspect-3/4 sm:aspect-square lg:aspect-16/10 xl:aspect-video rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
          ${preview ? "border-library-leather/20 bg-library-sepia/20 shadow-inner" : "border-library-green/30 hover:border-library-green/60 bg-library-sepia/30"}
          ${isDragging ? "border-library-green border-solid bg-library-sepia/50" : ""}
        `}
        style={
          preview
            ? {
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(26, 58, 58, 0.15) 1.5px, transparent 0)`,
                backgroundSize: "24px 24px",
              }
            : {}
        }
      >
        {preview && (
          <div className="absolute top-0 left-0 right-0 h-15 bg-white/80 backdrop-blur-md border-b border-library-green/10 flex items-center justify-between px-6 z-30 shadow-sm animate-in fade-in slide-in-from-top duration-300">
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="text-md font-bold font-serif text-library-green/80 truncate max-w-[200px] sm:max-w-md">
                {fileName}
              </span>
              <div className="h-4 w-px bg-library-green/10" />
              <span className="text-sm font-mono text-library-green/40 uppercase tracking-wider">
                {currentResolution}
              </span>
            </div>
            <button
              onClick={onClear}
              className="p-2 bg-red-900/10 hover:bg-red-900 text-red-900 hover:text-white rounded-lg transition-all active:scale-90 hover:cursor-pointer"
              title="Clear Image"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center pt-16 group">
            <div className="relative h-[95%] aspect-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <img
                src={preview}
                alt="Preview"
                className="h-full w-auto object-contain rounded-md border border-black/10"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="p-6 rounded-full bg-library-sepia text-library-leather mb-6 shadow-sm">
              <Upload
                size={48}
                className={isDragging ? "animate-bounce" : ""}
              />
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-serif font-bold text-library-green">
                Drop your cover here
              </p>
              <p className="text-sm text-library-green/60">
                PNG, JPG, WebP (Max 10MB)
              </p>
            </div>
            <label className="mt-8 px-8 py-3 bg-library-green text-library-cream rounded-full font-bold cursor-pointer hover:bg-library-green/90 transition-colors shadow-lg active:scale-95">
              Browse Files
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileInput}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
};
