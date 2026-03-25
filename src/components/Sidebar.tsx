import React from "react";
import {
  Maximize2,
  Move,
  Palette,
  Monitor,
  Settings2,
  Download,
} from "lucide-react";

export type FitMode = "fill" | "stretch" | "fit";
export type Resolution = { width: number; height: number; label: string };
export type Alignment =
  | "tl"
  | "tc"
  | "tr"
  | "ml"
  | "mc"
  | "mr"
  | "bl"
  | "bc"
  | "br";

const RESOLUTIONS: Resolution[] = [
  { width: 1072, height: 1448, label: "Kindle Basic" },
  { width: 1236, height: 1648, label: "Kindle Paperwhite" },
  { width: 1264, height: 1680, label: "Kindle Colorsoft" },
  { width: 1072, height: 1448, label: "Kobo Clara BW" },
  { width: 480, height: 800, label: "Xteink X4" },
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
  hasImage,
}) => {
  return (
    <aside className="w-full lg:w-80 bg-white/50 backdrop-blur-md border border-library-green/10 rounded p-6 shadow-xl flex flex-col gap-8 h-fit sticky top-8">
      <div className={!hasImage ? "opacity-40 pointer-events-none" : ""}>
        <h3 className="text-xs font-bold uppercase tracking-widest text-library-green/40 mb-4 flex items-center gap-2">
          <Monitor size={14} /> Size and Resolution
        </h3>
        <div className="flex flex-col gap-2">
          <button
            disabled={!hasImage}
            onClick={() => originalRes && onResChange(originalRes)}
            className={`text-left px-4 py-3 rounded-sm transition-all border cursor-pointer ${
              selectedRes.label === "Original"
                ? "bg-library-green text-library-cream border-library-green shadow-md"
                : "bg-white/50 border-library-green/5 hover:border-library-green/20 text-library-green/70"
            }`}
          >
            <div className="flex justify-between items-center gap-4">
              <span className="text-xs font-semibold font-sans">
                Original Dimensions
              </span>
              {originalRes && (
                <span className="text-xs font-mono opacity-50">
                  {originalRes.width} x {originalRes.height}
                </span>
              )}
            </div>
          </button>

          <div className="flex flex-col gap-2">
            {RESOLUTIONS.map((res, index) => (
              <button
                key={index}
                disabled={!hasImage}
                onClick={() => onResChange(res)}
                className={`text-left px-4 py-3 rounded-sm transition-all border cursor-pointer ${
                  selectedRes.label === res.label
                    ? "bg-library-green text-library-cream border-library-green shadow-md"
                    : "bg-white/50 border-library-green/5 hover:border-library-green/20 text-library-green/70"
                }`}
              >
                <div className="flex justify-between items-center gap-4">
                  <span className="text-xs font-semibold font-sans leading-tight">
                    {res.label}
                  </span>
                  <span className="text-[11px] font-mono opacity-60">
                    {res.width} x {res.height}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="">
            <button
              disabled={!hasImage}
              onClick={() =>
                onResChange({
                  width: originalRes?.width || 0,
                  height: originalRes?.height || 0,
                  label: "Custom",
                })
              }
              className={`w-full text-left px-4 py-3 rounded-sm transition-all border cursor-pointer flex items-center justify-between ${
                selectedRes.label === "Custom"
                  ? "bg-library-green text-library-cream border-library-green shadow-md"
                  : "bg-white/50 border-library-green/5 hover:border-library-green/20 text-library-green/70"
              }`}
            >
              <span className="text-xs font-semibold font-sans">
                Custom Resolution
              </span>
              <Settings2 size={14} className="opacity-40" />
            </button>

            {selectedRes.label === "Custom" && (
              <div className="grid grid-cols-2 gap-3 mt-3 animate-in fade-in slide-in-from-top-2 duration-300 px-1">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-library-green/40 px-1">
                    Width
                  </label>
                  <input
                    type="number"
                    value={selectedRes.width || ""}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      onResChange({
                        ...selectedRes,
                        width: Math.min(val, 5000),
                      });
                    }}
                    max={5000}
                    min={0}
                    className="w-full bg-white/50 border border-library-green/10 rounded-sm px-3 py-2 text-sm font-mono text-library-green outline-none focus:border-library-green/30 cursor-text"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-library-green/40 px-1">
                    Height
                  </label>
                  <input
                    type="number"
                    value={selectedRes.height || ""}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      onResChange({
                        ...selectedRes,
                        height: Math.min(val, 5000),
                      });
                    }}
                    max={5000}
                    min={0}
                    className="w-full bg-white/50 border border-library-green/10 rounded-sm px-3 py-2 text-sm font-mono text-library-green outline-none focus:border-library-green/30 cursor-text"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={!hasImage ? "opacity-40 pointer-events-none" : ""}>
        <h3 className="text-xs font-bold uppercase tracking-widest text-library-green/40 mb-4 flex items-center gap-2">
          <Maximize2 size={14} /> Fit Mode
        </h3>
        <div className="flex bg-library-sepia/50 p-1 rounded-sm">
          {(["fit", "stretch", "fill"] as FitMode[]).map((mode) => (
            <button
              key={mode}
              disabled={!hasImage}
              onClick={() => onFitModeChange(mode)}
              className={`flex-1 py-2 px-3 rounded-sm capitalize text-sm font-bold transition-all cursor-pointer ${
                fitMode === mode
                  ? "bg-white text-library-green shadow-sm"
                  : "text-library-green/40 hover:text-library-green/60"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {fitMode === "fit" && (
        <div className={!hasImage ? "opacity-40 pointer-events-none" : ""}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-library-green/40 mb-4 flex items-center gap-2">
            <Palette size={14} /> Background Fill
          </h3>
          <div className="flex items-center gap-4 p-3 bg-white/50 rounded-sm border border-library-green/5">
            <div className="relative w-8 h-8 overflow-hidden rounded-sm border border-library-green/10">
              <input
                type="color"
                disabled={!hasImage}
                value={bgColor}
                onChange={(e) => onBgColorChange(e.target.value)}
                className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer border-none bg-transparent"
              />
            </div>
            <span className="text-sm font-mono text-library-green/60 uppercase">
              {bgColor}
            </span>
          </div>
        </div>
      )}

      <div className={!hasImage ? "opacity-40 pointer-events-none" : ""}>
        <h3 className="text-xs font-bold uppercase tracking-widest text-library-green/40 mb-4 flex items-center gap-2">
          <Move size={14} /> Alignment
        </h3>
        <div className="grid grid-cols-3 gap-1 w-24 bg-library-sepia/30 p-1 rounded-sm">
          {(
            [
              "tl",
              "tc",
              "tr",
              "ml",
              "mc",
              "mr",
              "bl",
              "bc",
              "br",
            ] as Alignment[]
          ).map((pos) => (
            <button
              key={pos}
              disabled={!hasImage}
              onClick={() => onAlignmentChange(pos)}
              className={`w-6 h-6 rounded-sm border transition-all cursor-pointer ${
                alignment === pos
                  ? "bg-library-green border-library-green"
                  : "bg-white/50 border-library-green/10 hover:border-library-green/30"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        disabled={!hasImage}
        onClick={onDownload}
        className={`w-full py-4 rounded-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg
          ${
            hasImage
              ? "bg-library-leather text-white hover:bg-library-leather/90 active:scale-95 cursor-pointer"
              : "bg-library-green/10 text-library-green/30 cursor-not-allowed shadow-none"
          }
        `}
      >
        <Download size={20} />
        Download Image
      </button>
    </aside>
  );
};
