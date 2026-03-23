import React from 'react';
import { Maximize2, Move, Type, Palette, Monitor } from 'lucide-react';

export type FitMode = 'fill' | 'stretch' | 'fit';
export type Resolution = { width: number; height: number; label: string };
export type Alignment = 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br';

const RESOLUTIONS: Resolution[] = [
  { width: 600, height: 800, label: '600 x 800' },
  { width: 1072, height: 1448, label: '1072 x 1448' },
  { width: 1264, height: 1680, label: '1264 x 1680' },
  { width: 1404, height: 1872, label: '1404 x 1872' },
];

interface SidebarProps {
  selectedRes: Resolution;
  onResChange: (res: Resolution) => void;
  originalRes: Resolution | null;
  fitMode: FitMode;
  onFitModeChange: (mode: FitMode) => void;
  alignment: Alignment;
  onAlignmentChange: (align: Alignment) => void;
  bgColor: string;
  onBgColorChange: (color: string) => void;
  onDownload: () => void;
  hasImage: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedRes,
  onResChange,
  originalRes,
  fitMode,
  onFitModeChange,
  alignment,
  onAlignmentChange,
  bgColor,
  onBgColorChange,
  onDownload,
  hasImage
}) => {
  return (
    <aside className="w-80 bg-white/50 backdrop-blur-md border border-library-green/10 rounded-3xl p-6 shadow-xl flex flex-col gap-8 h-fit sticky top-8">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-library-green/40 mb-4 flex items-center gap-2">
          <Monitor size={14} /> Size & Resolution
        </h3>
        <div className="grid grid-cols-1 gap-2">
          <button
            disabled={!hasImage}
            onClick={() => originalRes && onResChange(originalRes)}
            className={`text-left px-4 py-3 rounded-xl transition-all border ${
              selectedRes.label === 'Original'
                ? 'bg-library-green text-library-cream border-library-green shadow-md'
                : 'bg-white/50 border-library-green/5 hover:border-library-green/20 text-library-green/70'
            } ${!hasImage ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            <div className="flex justify-between items-center w-full">
              <span className="block text-sm font-bold font-serif">Original</span>
              {originalRes && (
                <span className="text-[10px] opacity-40 font-mono">
                  {originalRes.width}x{originalRes.height}
                </span>
              )}
            </div>
            <span className="text-[10px] opacity-60 uppercase tracking-tighter">Source Dimensions</span>
          </button>

          {RESOLUTIONS.map((res) => (
            <button
              key={res.label}
              onClick={() => onResChange(res)}
              className={`text-left px-4 py-3 rounded-xl transition-all border ${
                selectedRes.label === res.label
                  ? 'bg-library-green text-library-cream border-library-green shadow-md'
                  : 'bg-white/50 border-library-green/5 hover:border-library-green/20 text-library-green/70'
              }`}
            >
              <span className="block text-sm font-bold font-serif">{res.label}</span>
              <span className="text-[10px] opacity-60 uppercase tracking-tighter">e-reader standard</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-library-green/40 mb-4 flex items-center gap-2">
          <Maximize2 size={14} /> Fit Mode
        </h3>
        <div className="flex bg-library-sepia/50 p-1 rounded-xl">
          {(['fill', 'stretch', 'fit'] as FitMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onFitModeChange(mode)}
              className={`flex-1 py-2 px-3 rounded-lg capitalize text-sm font-bold transition-all ${
                fitMode === mode
                  ? 'bg-white text-library-green shadow-sm'
                  : 'text-library-green/40 hover:text-library-green/60'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-library-green/40 mb-4 flex items-center gap-2">
          <Move size={14} /> Alignment
        </h3>
        <div className="grid grid-cols-3 gap-1 w-24 bg-library-sepia/30 p-1 rounded-lg">
          {(['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br'] as Alignment[]).map((pos) => (
            <button
              key={pos}
              onClick={() => onAlignmentChange(pos)}
              className={`w-6 h-6 rounded-sm border transition-all ${
                alignment === pos
                  ? 'bg-library-green border-library-green'
                  : 'bg-white/50 border-library-green/10 hover:border-library-green/30'
              }`}
            />
          ))}
        </div>
      </div>

      {fitMode === 'fit' && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-library-green/40 mb-4 flex items-center gap-2">
            <Palette size={14} /> Background Fill
          </h3>
          <div className="flex items-center gap-4 p-3 bg-white/50 rounded-xl border border-library-green/5">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => onBgColorChange(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
            />
            <span className="text-sm font-mono text-library-green/60 uppercase">{bgColor}</span>
          </div>
        </div>
      )}

      <button
        disabled={!hasImage}
        onClick={onDownload}
        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg
          ${hasImage 
            ? 'bg-library-leather text-white hover:bg-library-leather/90 active:scale-95' 
            : 'bg-library-green/10 text-library-green/30 cursor-not-allowed shadow-none'}
        `}
      >
        Format & Download
      </button>

      <div className="pt-4 border-t border-library-green/5">
        <p className="text-[10px] text-library-green/40 text-center leading-relaxed font-serif italic">
          "A library is not a luxury but one of the necessities of life."
        </p>
      </div>
    </aside>
  );
};
