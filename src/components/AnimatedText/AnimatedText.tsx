import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { animate, stagger } from 'animejs';
import styles from './AnimatedText.module.css';

type AnimationType = 1 | 2 | 3 | 4;

interface AnimatedTextProps {
  text: string;
  animationType: AnimationType;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div';
  className?: string;
  delay?: number;
  duration?: number;
  letterDelay?: number;
  autoPlay?: boolean;
}

export interface AnimatedTextHandle {
  play: () => void;
  reset: () => void;
}

// Animation instance type for cleanup
type AnimationInstance = ReturnType<typeof animate>;

/**
 * AnimatedText Component
 * Uses anime.js for text letter animations
 * Based on https://webflow.com/made-in-webflow/website/text-animations-with-animejs
 * 
 * Animation 1: Letters fade in from bottom
 * Animation 2: Letters fade in from top
 * Animation 3: Letters scale/zoom in with elastic effect
 * Animation 4: Letters rotate in (3D flip)
 */
const AnimatedText = forwardRef<AnimatedTextHandle, AnimatedTextProps>(({
  text,
  animationType,
  tag: Tag = 'span',
  className = '',
  delay = 0,
  duration = 800,
  letterDelay = 40,
  autoPlay = false,
}, ref) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const animationRef = useRef<AnimationInstance | null>(null);
  const isInitializedRef = useRef(false);

  const wrapLetters = useCallback(() => {
    if (!containerRef.current || isInitializedRef.current) return;
    
    containerRef.current.innerHTML = '';
    
    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.className = styles.letter;
      span.textContent = char === ' ' ? '\u00A0' : char;
      containerRef.current?.appendChild(span);
    });
    
    isInitializedRef.current = true;
  }, [text]);

  const setInitialState = useCallback(() => {
    if (!containerRef.current) return;
    
    const letters = containerRef.current.querySelectorAll(`.${styles.letter}`);
    
    letters.forEach((letter) => {
      const el = letter as HTMLElement;
      el.style.opacity = '0';
      el.style.display = 'inline-block';
      
      switch (animationType) {
        case 1:
          el.style.transform = 'translateY(1.1em)';
          break;
        case 2:
          el.style.transform = 'translateY(-1.1em)';
          break;
        case 3:
          el.style.transform = 'scale(0)';
          break;
        case 4:
          el.style.transform = 'rotateY(-90deg)';
          el.style.transformOrigin = '50% 50%';
          break;
      }
    });
  }, [animationType]);

  const play = useCallback(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll(`.${styles.letter}`);

    // Reset any existing animation
    if (animationRef.current) {
      animationRef.current.pause();
    }

    // Set initial state first
    setInitialState();

    // Convert NodeList to array for anime.js v4
    const letterElements = Array.from(letters);
    
    if (letterElements.length === 0) return;

    // Create animation based on type - anime.js v4 syntax
    switch (animationType) {
      case 1: // Fade in from bottom
        animationRef.current = animate(letterElements, {
          opacity: [0, 1],
          translateY: ['1.1em', '0em'],
          duration,
          delay: stagger(letterDelay, { start: delay }),
        });
        break;
      case 2: // Fade in from top
        animationRef.current = animate(letterElements, {
          opacity: [0, 1],
          translateY: ['-1.1em', '0em'],
          duration,
          delay: stagger(letterDelay, { start: delay }),
        });
        break;
      case 3: // Scale/zoom in
        animationRef.current = animate(letterElements, {
          opacity: [0, 1],
          scale: [0, 1],
          duration: duration * 1.2,
          delay: stagger(letterDelay, { start: delay }),
        });
        break;
      case 4: // Rotate in (3D flip)
        animationRef.current = animate(letterElements, {
          opacity: [0, 1],
          rotateY: ['-90deg', '0deg'],
          duration,
          delay: stagger(letterDelay, { start: delay }),
        });
        break;
    }
  }, [animationType, delay, duration, letterDelay, setInitialState]);

  const reset = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
    setInitialState();
  }, [setInitialState]);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    play,
    reset,
  }), [play, reset]);

  // Initialize on mount and when text changes
  useEffect(() => {
    isInitializedRef.current = false;
    wrapLetters();
    setInitialState();
    
    if (autoPlay) {
      // Small delay to ensure DOM is ready
      requestAnimationFrame(() => {
        play();
      });
    }
  }, [text, wrapLetters, setInitialState, autoPlay, play]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, []);

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLSpanElement & HTMLParagraphElement & HTMLDivElement>}
      className={`${styles.animatedText} ${className}`}
    />
  );
});

AnimatedText.displayName = 'AnimatedText';

export default AnimatedText;
