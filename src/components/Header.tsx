import React from 'react';
import { BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-library-green text-library-cream rounded-lg shadow-lg">
          <BookOpen size={32} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-library-green">
          eReader Cover Formatter
        </h1>
      </div>
      <p className="text-lg text-library-green/80 max-w-2xl leading-relaxed italic">
        "Every book deserves a perfectly tailored cover."
        <br />
        <span className="text-sm not-italic opacity-60 font-sans">
          Format, resize, and optimize your images for the perfect reading experience.
        </span>
      </p>
    </header>
  );
};
