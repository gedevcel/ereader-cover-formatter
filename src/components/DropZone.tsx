import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface DropZoneProps {
  onImageUpload: (file: File) => void;
  preview: string | null;
  onClear: () => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ onImageUpload, preview, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative aspect-3/4 sm:aspect-square lg:aspect-16/10 xl:aspect-video rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-4 overflow-hidden
          ${preview ? 'border-library-leather/20 bg-library-sepia/20 shadow-inner' : 'border-library-green/30 hover:border-library-green/60 bg-library-sepia/30'}
          ${isDragging ? 'border-library-green border-solid bg-library-sepia/50' : ''}
        `}
        style={preview ? {
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(26, 58, 58, 0.05) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        } : {}}
      >
        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center group">
            <div className="relative h-[98%] aspect-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <img src={preview} alt="Preview" className="h-full w-auto object-contain rounded-md border border-black/10" />
            </div>
            <button
              onClick={onClear}
              className="absolute top-6 right-6 p-3 bg-library-leather text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110 active:scale-95 z-20"
            >
              <X size={24} />
            </button>
          </div>
        ) : (
          <>
            <div className="p-6 rounded-full bg-library-sepia text-library-leather mb-6 shadow-sm">
              <Upload size={48} className={isDragging ? 'animate-bounce' : ''} />
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
              <input type="file" className="hidden" accept="image/*" onChange={handleFileInput} />
            </label>
          </>
        )}
      </div>
    </div>
  );
};
