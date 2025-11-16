import { useState } from "react";
import { Move, Rotate3D, Maximize2, Eye } from "lucide-react";
import Model3DViewer from './Model3DViewer';
import FullscreenDrawer from './FullscreenDrawer';

interface ThreeDPlaceholderProps {
  type: string;
  color: string;
  title: string;
  description: string;
}

export default function ThreeDPlaceholder({
  type,
  color,
  title,
  description,
}: ThreeDPlaceholderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const modelPath = '/src/asset/exterior_architecture.glb';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -20;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const getIcon = () => {
    switch (type) {
      case "cad":
        return "📐";
      case "exterior":
        return "🏠";
      case "interior":
        return "🛋️";
      case "vr":
        return "🥽";
      case "outdoor":
        return "🌳";
      case "product":
        return "📦";
      case "clothing":
        return "👕";
      case "printing":
        return "🖨️";
      default:
        return "📦";
    }
  };

  return (
    <div
      className="relative aspect-square w-full max-w-lg mx-auto cursor-pointer group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      onMouseMove={handleMouseMove}
    >
      <div
        className={`glass-card w-full h-full rounded-3xl overflow-hidden backdrop-blur-2xl transition-all duration-300 ${
          isHovered ? "shadow-2xl scale-105" : "shadow-lg"
        }`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20`}
        />

        <div className="relative w-full h-full">
          <Model3DViewer modelPath={modelPath} />

          <div className="absolute top-6 left-6 z-10">
            <div className="glass-card px-3 py-2 rounded-xl backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white text-xs font-medium">3D Model</span>
              </div>
            </div>
          </div>

          <div
            className={`absolute top-6 right-6 z-10 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="glass-card p-3 rounded-xl backdrop-blur-xl">
              <Rotate3D className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 z-20 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <div className="flex gap-3 justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(true);
              }}
              className="glass-card px-4 py-2 rounded-lg backdrop-blur-xl text-white text-sm font-medium hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(true);
              }}
              className="glass-card px-4 py-2 rounded-lg backdrop-blur-xl text-white text-sm font-medium hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Maximize2 className="w-4 h-4" />
              Fullscreen
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute -inset-4 bg-gradient-to-r ${color} rounded-3xl blur-2xl -z-10 transition-opacity duration-300 ${
          isHovered ? "opacity-30" : "opacity-0"
        }`}
      />

      <FullscreenDrawer
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        modelPath={modelPath}
        title={title}
        description={description}
        color={color}
      />
    </div>
  );
}
