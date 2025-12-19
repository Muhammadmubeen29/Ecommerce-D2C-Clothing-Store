import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'typewriter';
}

export default function AnimatedText({ 
  text, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  animation = 'fadeInUp'
}: AnimatedTextProps) {
  const getAnimationVariants = () => {
    switch (animation) {
      case 'fadeInUp':
        return {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 }
        };
      case 'fadeInDown':
        return {
          initial: { opacity: 0, y: -30 },
          animate: { opacity: 1, y: 0 }
        };
      case 'fadeInLeft':
        return {
          initial: { opacity: 0, x: -30 },
          animate: { opacity: 1, x: 0 }
        };
      case 'fadeInRight':
        return {
          initial: { opacity: 0, x: 30 },
          animate: { opacity: 1, x: 0 }
        };
      case 'scaleIn':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 }
        };
      case 'typewriter':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 }
        };
      default:
        return {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 }
        };
    }
  };

  const variants = getAnimationVariants();

  if (animation === 'typewriter') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration }}
        className={className}
      >
        <TypewriterText text={text} delay={delay} />
      </motion.div>
    );
  }

  return (
    <motion.h1
      initial={variants.initial}
      animate={variants.animate}
      transition={{ delay, duration, ease: "easeOut" }}
      className={className}
    >
      {text}
    </motion.h1>
  );
}

// Typewriter effect component
function TypewriterText({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.1 }}
      className="inline-block"
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay + index * 0.05,
            duration: 0.1
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Animated paragraph component
interface AnimatedParagraphProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function AnimatedParagraph({ 
  text, 
  className = '', 
  delay = 0, 
  duration = 0.6 
}: AnimatedParagraphProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration, ease: "easeOut" }}
      className={className}
    >
      {text}
    </motion.p>
  );
}

// Animated section title component
interface AnimatedSectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  delay?: number;
}

export function AnimatedSectionTitle({ 
  title, 
  subtitle, 
  className = '', 
  delay = 0 
}: AnimatedSectionTitleProps) {
  return (
    <div className={`text-center ${className}`}>
      <AnimatedText
        text={title}
        className="text-4xl md:text-5xl font-bold mb-4"
        delay={delay}
        animation="fadeInUp"
      />
      {subtitle && (
        <AnimatedParagraph
          text={subtitle}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          delay={delay + 0.2}
        />
      )}
    </div>
  );
}








