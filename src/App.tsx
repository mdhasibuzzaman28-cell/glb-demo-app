import { useRef } from 'react';
import Hero from './components/Hero';
import Section from './components/Section';
import ShowcaseSection from './components/ShowcaseSection';
import CustomCursor from './components/CustomCursor';
import { useScrollProgress } from './hooks/useScrollProgress';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress();

  const sections = [
    {
      id: 'cad',
      title: 'CAD Drawings',
      description: 'Where precision meets vision. Our detailed 2D technical drawings transform architectural concepts into structured blueprints, setting the foundation for extraordinary spaces.',
      color: 'from-blue-500/20 to-cyan-500/20',
      textColor: 'text-blue-400',
      progress: 0
    },
    {
      id: 'exterior',
      title: 'Exterior Rendering',
      description: 'Watch your building come to life. Photorealistic 3D exterior renderings showcase every detail, texture, and play of light across your architectural masterpiece.',
      color: 'from-emerald-500/20 to-teal-500/20',
      textColor: 'text-emerald-400',
      progress: 14.28
    },
    {
      id: 'interior',
      title: 'Interior Renderings',
      description: 'Step inside your vision. Immersive interior visualizations reveal the warmth, character, and atmosphere of each carefully crafted space.',
      color: 'from-purple-500/20 to-pink-500/20',
      textColor: 'text-purple-400',
      progress: 28.56
    },
    {
      id: 'vr',
      title: 'VR Tour',
      description: 'Experience before you build. Our virtual reality tours let you walk through your space, feeling the scale and flow as if you were already there.',
      color: 'from-orange-500/20 to-red-500/20',
      textColor: 'text-orange-400',
      progress: 42.84
    },
    {
      id: 'outdoor',
      title: 'Outdoor & Landscape Renderings',
      description: 'Beyond the walls. Stunning landscape visualizations integrate your architecture with nature, showcasing outdoor living spaces in perfect harmony.',
      color: 'from-green-500/20 to-lime-500/20',
      textColor: 'text-green-400',
      progress: 57.12
    },
    {
      id: 'product',
      title: 'Product Designs',
      description: 'From concept to tangible reality. Detailed 3D product renderings bring your industrial designs to life with photorealistic precision.',
      color: 'from-slate-500/20 to-gray-500/20',
      textColor: 'text-slate-400',
      progress: 71.4
    },
    {
      id: 'clothing',
      title: 'Clothing Design',
      description: 'Fashion in three dimensions. Advanced fabric simulation and rendering showcase every fold, texture, and detail of your apparel designs.',
      color: 'from-rose-500/20 to-fuchsia-500/20',
      textColor: 'text-rose-400',
      progress: 85.68
    },
    {
      id: 'printing',
      title: '3D Printing',
      description: 'From digital to physical. Optimized 3D models ready for additive manufacturing, transforming virtual creations into tangible objects.',
      color: 'from-cyan-500/20 to-blue-500/20',
      textColor: 'text-cyan-400',
      progress: 100
    }
  ];

  return (
    <div ref={containerRef} className="bg-black">
      <CustomCursor />
      <Hero />

      <ShowcaseSection />

      {sections.map((section, index) => (
        <Section
          key={section.id}
          {...section}
          index={index}
          total={sections.length}
        />
      ))}

      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        <div className="glass-card px-4 py-2 rounded-full">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/80 font-medium">
              {Math.round(scrollProgress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
