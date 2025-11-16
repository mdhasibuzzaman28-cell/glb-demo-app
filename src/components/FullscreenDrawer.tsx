import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Model3DViewer from './Model3DViewer';

interface FullscreenDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  modelPath: string;
  title: string;
  description: string;
  color: string;
}

export default function FullscreenDrawer({
  isOpen,
  onClose,
  modelPath,
  title,
  description,
  color
}: FullscreenDrawerProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            onClick={onClose}
          />

          <div className={`fixed inset-0 z-[101] transition-all duration-500 ease-out transform ${
            isOpen ? 'translate-y-0 scale-100' : 'translate-y-full scale-95'
          }`}>
        <div className="absolute top-0 left-0 right-0 z-10">
          <div
            className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${color} opacity-80`}
            style={{
              boxShadow: `0 0 20px rgba(34, 211, 238, 0.6)`
            }}
          />
        </div>

          <div className="relative h-full flex flex-col p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-white mb-2">{title}</h2>
                <p className="text-gray-300 max-w-2xl">{description}</p>
              </div>

              <button
                onClick={onClose}
                className="glass-card p-4 rounded-xl backdrop-blur-xl text-white hover:bg-white/10 transition-all group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            <div className="flex-1 relative overflow-hidden">
              <Model3DViewer modelPath={modelPath} />

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                <div className="glass-card px-6 py-3 rounded-xl backdrop-blur-xl text-gray-300">
                  <span className="text-sm font-medium">Drag to rotate • Scroll to zoom</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}
    </>
  );
}
