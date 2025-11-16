import { useEffect, useRef, useState } from 'react';
import { Move, Rotate3D } from 'lucide-react';
import ParallaxText from './ParallaxText';
import ThreeDPlaceholder from './ThreeDPlaceholder';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface SectionProps {
  id: string;
  title: string;
  description: string;
  color: string;
  textColor: string;
  index: number;
  total: number;
  progress: number;
}

export default function Section({
  id,
  title,
  description,
  color,
  textColor,
  index,
  total
}: SectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.3 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const progress = (window.innerHeight - sectionTop) / (window.innerHeight + sectionHeight);
        setScrollY(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center py-20 px-6 overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-30`} />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      <ParallaxText
        text={title.toUpperCase()}
        speed={0.5}
        className="absolute bottom-1/4 left-0 text-[12vw] font-black text-white/5 whitespace-nowrap pointer-events-none"
      />

      <div className={`relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-1000`}>

        <div
          className={`space-y-6 ${isEven ? 'md:order-1' : 'md:order-2'}`}
          style={{
            transform: `translateX(${isVisible ? 0 : (isEven ? -50 : 50)}px)`,
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="glass-card px-4 py-2 rounded-full inline-block backdrop-blur-xl">
            <span className={`${textColor} font-bold text-sm tracking-wider`}>
              STEP {index + 1} OF {total}
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            {title}
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed">
            {description}
          </p>

          <div className="flex gap-4 pt-4">
            <button className="glass-card px-6 py-3 rounded-lg hover:bg-white/10 transition-all backdrop-blur-xl text-white font-medium">
              Learn More
            </button>
            <button className={`px-6 py-3 rounded-lg bg-gradient-to-r ${color} hover:opacity-80 transition-all text-white font-medium`}>
              View Portfolio
            </button>
          </div>
        </div>

        <div
          className={`${isEven ? 'md:order-2' : 'md:order-1'}`}
          style={{
            transform: `translateY(${scrollY * 50}px)`,
            transition: 'transform 0.1s linear'
          }}
        >
          <ThreeDPlaceholder
            type={id}
            color={color}
            title={title}
            description={description}
          />
        </div>
      </div>
    </div>
  );
}
