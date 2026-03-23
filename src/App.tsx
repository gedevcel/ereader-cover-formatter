import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DropZone } from './components/DropZone';
import { Sidebar } from './components/Sidebar';
import type { FitMode, Resolution, Alignment } from './components/Sidebar';

const App: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processedPreview, setProcessedPreview] = useState<string | null>(null);
  const [originalRes, setOriginalRes] = useState<Resolution | null>(null);
  const [resolution, setResolution] = useState<Resolution>({ width: 0, height: 0, label: 'Original' });
  const [fitMode, setFitMode] = useState<FitMode>('fit');
  const [alignment, setAlignment] = useState<Alignment>('mc');
  const [bgColor, setBgColor] = useState('#ffffff');

  const handleImageUpload = (file: File) => {
    setImage(file);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const res = { width: img.width, height: img.height, label: 'Original' };
        setOriginalRes(res);
        setResolution(res);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setImage(null);
    setFileName(null);
    setPreview(null);
    setProcessedPreview(null);
    setOriginalRes(null);
    setResolution({ width: 0, height: 0, label: 'Original' });
    setFitMode('fit');
    setAlignment('mc');
    setBgColor('#ffffff');
  };

  useEffect(() => {
    if (!preview) {
      setProcessedPreview(null);
      return;
    }

    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = resolution.width;
      canvas.height = resolution.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const ratio = img.width / img.height;
      const targetRatio = resolution.width / resolution.height;

      let drawW, drawH;

      if (fitMode === 'stretch') {
        drawW = resolution.width;
        drawH = resolution.height;
      } else if (fitMode === 'fill') {
        if (ratio > targetRatio) {
          drawH = resolution.height;
          drawW = drawH * ratio;
        } else {
          drawW = resolution.width;
          drawH = drawW / ratio;
        }
      } else { // fit
        if (ratio > targetRatio) {
          drawW = resolution.width;
          drawH = drawW / ratio;
        } else {
          drawH = resolution.height;
          drawW = drawH * ratio;
        }
      }

      // Calculate position based on alignment
      const alignX = alignment.endsWith('l') ? 0 : alignment.endsWith('r') ? resolution.width - drawW : (resolution.width - drawW) / 2;
      const alignY = alignment.startsWith('t') ? 0 : alignment.startsWith('b') ? resolution.height - drawH : (resolution.height - drawH) / 2;

      ctx.drawImage(img, alignX, alignY, drawW, drawH);
      setProcessedPreview(canvas.toDataURL('image/jpeg', 0.8));
    };
  }, [preview, resolution, fitMode, alignment, bgColor]);

  const processAndDownload = () => {
    if (!processedPreview) return;
    const link = document.createElement('a');
    link.download = `cover-${resolution.label.replace(/\s/g, '')}.jpg`;
    link.href = processedPreview;
    link.click();
  };

  return (
    <div className="min-h-screen bg-library-cream selection:bg-library-leather/20 text-library-green font-sans antialiased">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Header />
        
        <main className="flex flex-col lg:flex-row gap-12 items-center lg:items-start mt-8">
          <div className="flex-1 w-full flex justify-center">
            <DropZone 
              onImageUpload={handleImageUpload} 
              preview={processedPreview || preview} 
              onClear={handleClear}
              fileName={fileName}
              currentResolution={
                resolution.label === 'Original' 
                  ? `${resolution.width} x ${resolution.height}` 
                  : resolution.label
              }
            />
          </div>
          
          <Sidebar 
            selectedRes={resolution}
            onResChange={setResolution}
            originalRes={originalRes}
            fitMode={fitMode}
            onFitModeChange={setFitMode}
            alignment={alignment}
            onAlignmentChange={setAlignment}
            bgColor={bgColor}
            onBgColorChange={setBgColor}
            onDownload={processAndDownload}
            hasImage={!!image}
          />
        </main>

        <footer className="mt-20 border-t border-library-green/5 pt-12 text-center text-library-green/30 text-xs">
          <p>© {new Date().getFullYear()} eReader Cover Formatter. Crafted for bibliophiles.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
