import React, { useState, useEffect } from "react";
import { HelpCircle, X, ExternalLink, Book, CheckCircle2 } from "lucide-react";

export const Header: React.FC = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (showInstructions) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [showInstructions]);

  return (
    <header className="mb-12 relative flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-library-green">
          eReader Cover Formatter
        </h1>

        <button
          onClick={() => setShowInstructions(true)}
          className="hidden sm:flex items-center gap-2 px-5 py-3 bg-library-leather text-white rounded-xl font-bold text-sm transition-all shadow-md hover:bg-library-leather/90 active:scale-95 cursor-pointer shrink-0"
        >
          <HelpCircle size={18} />
          Instructions
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-lg text-library-green/80 max-w-2xl leading-relaxed italic">
          <span className="text-sm not-italic opacity-60 font-sans">
            Format, resize, and optimize your images for the perfect reading
            experience.
          </span>
        </p>

        <button
          onClick={() => setShowInstructions(true)}
          className="flex sm:hidden items-center justify-center gap-2 px-5 py-3 bg-library-leather text-white rounded-xl font-bold text-sm transition-all shadow-md hover:bg-library-leather/90 active:scale-95 cursor-pointer w-full"
        >
          <HelpCircle size={18} />
          Instructions
        </button>
      </div>

      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-library-green/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowInstructions(false)}
          />
          <div className="relative w-full max-w-2xl bg-library-cream border border-library-green/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
            <div className="bg-library-sepia px-8 py-6 flex items-center justify-between border-b border-library-green/5">
              <div className="flex items-center gap-3">
                <Book className="text-library-leather" size={24} />
                <h2 className="text-xl font-black font-serif text-library-green">
                  Quick Guide
                </h2>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="p-2 hover:bg-library-leather/10 rounded-lg text-library-green/40 hover:text-library-leather transition-all cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-8 py-8 overflow-y-auto max-h-[70vh]">
              <div className="space-y-8">
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-library-leather/60 mb-4 px-1">
                    How to use this tool
                  </h3>
                  <div className="grid gap-3">
                    {[
                      "Upload your book cover image (JPG, PNG).",
                      "Select your e-reader model from the list or set a custom size.",
                      "Adjust the 'Fit Mode' and 'Alignment' to get the perfect framing.",
                      "Download the formatted JPG image.",
                    ].map((step, i) => (
                      <div
                        key={i}
                        className="flex gap-4 p-4 bg-white/40 rounded-2xl border border-library-green/5"
                      >
                        <span className="shrink-0 w-6 h-6 rounded-full bg-library-leather text-white text-[10px] font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <p className="text-sm font-medium leading-relaxed text-library-green/80">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-library-leather/5 p-6 rounded-2xl border border-library-leather/10">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 size={20} className="text-library-leather" />
                    <h3 className="text-md font-semibold text-library-green">
                      Applying to your E-Reader
                    </h3>
                  </div>
                  <div className="space-y-4 text-sm leading-relaxed text-library-green/70">
                    <p>
                      To ensure your covers show up correctly on your device, we
                      highly recommend using
                      <strong className="text-library-green"> Calibre</strong>.
                    </p>
                    <div className="flex flex-col gap-2">
                      <a
                        href="https://calibre-ebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-library-leather font-bold hover:underline"
                      >
                        1. Download Calibre <ExternalLink size={14} />
                      </a>
                      <p>
                        2. Add your downloaded image to the{" "}
                        <strong>Metadata</strong> of your book.
                      </p>
                      <p>
                        3. Right-click the book &gt; Edit Metadata &gt; Change
                        Cover.
                      </p>
                      <p>4. Send the updated book to your device.</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="bg-white/40 px-8 py-5 flex justify-end gap-3 border-t border-library-green/5">
              <button
                onClick={() => setShowInstructions(false)}
                className="px-6 py-2 bg-library-leather text-white rounded-xl font-bold text-sm shadow-lg hover:bg-library-leather/90 active:scale-95 transition-all cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
