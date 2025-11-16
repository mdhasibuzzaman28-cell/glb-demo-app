import { useState } from 'react';
import { Maximize2, Eye, RotateCw, Box } from 'lucide-react';
import Model3DViewer from './Model3DViewer';
import FullscreenDrawer from './FullscreenDrawer';

export default function ShowcaseSection() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const modelPath = '/src/asset/exterior_architecture.glb';

  return (
    <>
      <div className="min-h-screen relative flex items-center justify-center py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="glass-card px-4 py-2 rounded-full inline-block backdrop-blur-xl mb-6">
              <span className="text-cyan-400 font-bold text-sm tracking-wider flex items-center gap-2">
                <Box className="w-4 h-4" />
                3D SHOWCASE
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Interactive 3D Experience
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Explore our architectural masterpiece in stunning 3D. Rotate, zoom, and examine every detail
              of this extraordinary design from any angle.
            </p>
          </div>

          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden glass-card backdrop-blur-xl group">
            <div className="absolute inset-0">
              <Model3DViewer modelPath={modelPath} autoRotate={true} />
            </div>

            <div className="absolute top-6 left-6 z-10">
              <div className="glass-card px-4 py-2 rounded-xl backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white text-sm font-medium">Live 3D Model</span>
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-6 z-10 flex gap-3">
              <div className="glass-card px-4 py-2 rounded-xl backdrop-blur-xl text-white">
                <RotateCw className="w-5 h-5 animate-spin-slow" />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 z-20">
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="glass-card px-6 py-3 rounded-xl backdrop-blur-xl text-white hover:bg-white/20 transition-all flex items-center gap-2 group/btn"
                >
                  <Eye className="w-5 h-5" />
                  <span className="text-sm font-medium">View Details</span>
                </button>

                <button
                  onClick={() => setIsFullscreen(true)}
                  className="glass-card px-6 py-3 rounded-xl backdrop-blur-xl text-white hover:bg-white/20 transition-all flex items-center gap-2 group/btn"
                >
                  <Maximize2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Fullscreen</span>
                </button>
              </div>
            </div>

            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="glass-card p-6 rounded-2xl backdrop-blur-xl text-center">
              <div className="text-cyan-400 text-3xl mb-2">🎨</div>
              <h3 className="text-white font-bold mb-2">Photorealistic</h3>
              <p className="text-gray-400 text-sm">Every texture and material rendered with precision</p>
            </div>

            <div className="glass-card p-6 rounded-2xl backdrop-blur-xl text-center">
              <div className="text-cyan-400 text-3xl mb-2">🔄</div>
              <h3 className="text-white font-bold mb-2">Interactive</h3>
              <p className="text-gray-400 text-sm">Full 360° rotation and zoom capabilities</p>
            </div>

            <div className="glass-card p-6 rounded-2xl backdrop-blur-xl text-center">
              <div className="text-cyan-400 text-3xl mb-2">⚡</div>
              <h3 className="text-white font-bold mb-2">Real-time</h3>
              <p className="text-gray-400 text-sm">Smooth performance with optimized rendering</p>
            </div>
          </div>
        </div>
      </div>

      <FullscreenDrawer
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        modelPath={modelPath}
        title="Architectural Masterpiece"
        description="Explore this stunning exterior design in full 3D. Use your mouse to rotate the view and scroll to zoom in and out. Every detail has been crafted with precision."
        color="from-cyan-500 to-blue-500"
      />
    </>
  );
}
