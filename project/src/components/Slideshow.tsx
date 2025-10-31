import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

interface Slide {
  id: number | string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonAction: () => void;
}

interface SlideshowProps {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function Slideshow({ 
  slides, 
  autoPlay = true, 
  autoPlayInterval = 5000 
}: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!slides.length) return null;

  return (
    <div className="slideshow-container relative w-full h-[70vh] min-h-[400px] md:min-h-[500px] lg:min-h-[550px] max-h-[700px] overflow-hidden rounded-lg shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="w-full h-full relative overflow-hidden">
            {/* Background gradient fallback */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800"></div>
            
            {/* Product image */}
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="absolute inset-0 w-full h-full"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
                width: '100%',
                height: '100%'
              }}
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="text-center text-white px-4 sm:px-8 max-w-5xl">
                <motion.h1
                  key={`title-${currentSlide}`}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 1.1 }}
                  transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight drop-shadow-lg"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p
                  key={`subtitle-${currentSlide}`}
                  initial={{ opacity: 0, y: 30, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: -30, x: 20 }}
                  transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                  className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 md:mb-10 opacity-95 max-w-4xl mx-auto leading-relaxed drop-shadow-md"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  key={`button-${currentSlide}`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                >
                  <Button 
                    onClick={slides[currentSlide].buttonAction} 
                    variant="secondary"
                  >
                    {slides[currentSlide].buttonText}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="nav-arrow absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="nav-arrow absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 md:top-6 right-4 md:right-6 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-xs md:text-sm backdrop-blur-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}
