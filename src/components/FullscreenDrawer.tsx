import { useEffect, useState } from 'react';
import { X, Maximize, Minimize, RotateCw, Pause, Play } from 'lucide-react';
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
  const [autoRotate, setAutoRotate] = useState(true);
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
    <div
      className={`fixed inset-0 z-[100] transition-all duration-700 ease-out ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      />

      <div
        className={`relative w-full h-full transition-all duration-700 ease-out ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-full'
        }`}
      >
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

          <div className="flex-1 relative rounded-3xl overflow-hidden glass-card backdrop-blur-xl">
            <div className="absolute inset-0">
              <Model3DViewer modelPath={modelPath} autoRotate={autoRotate} />
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className="glass-card px-6 py-3 rounded-xl backdrop-blur-xl text-white hover:bg-white/10 transition-all flex items-center gap-2 group"
              >
                {autoRotate ? (
                  <>
                    <Pause className="w-5 h-5" />
                    <span className="text-sm font-medium">Pause Rotation</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span className="text-sm font-medium">Auto Rotate</span>
                  </>
                )}
              </button>

              <div className="glass-card px-6 py-3 rounded-xl backdrop-blur-xl text-gray-300">
                <span className="text-sm font-medium">Drag to rotate • Scroll to zoom</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
