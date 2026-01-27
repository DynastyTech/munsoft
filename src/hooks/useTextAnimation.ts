import { useRef, useCallback } from 'react';
import { animate, stagger } from 'animejs';

type AnimationType = 1 | 2 | 3 | 4;

interface TextAnimationOptions {
  type: AnimationType;
  delay?: number;
  duration?: number;
  letterDelay?: number;
}

// Animation instance type for cleanup
type AnimationInstance = ReturnType<typeof animate>;

/**
 * Hook for anime.js text animations
 * Based on https://webflow.com/made-in-webflow/website/text-animations-with-animejs
 * 
 * Animation 1: Letters fade in from bottom
 * Animation 2: Letters fade in from top
 * Animation 3: Letters scale/zoom in
 * Animation 4: Letters rotate in (3D)
 */
export const useTextAnimation = (options: TextAnimationOptions) => {
  const ref = useRef<HTMLElement | null>(null);
  const animationRef = useRef<AnimationInstance | null>(null);

  const wrapLetters = useCallback((element: HTMLElement) => {
    const text = element.textContent || '';
    element.innerHTML = '';
    
    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.style.display = 'inline-block';
      span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space
      element.appendChild(span);
    });
  }, []);

  const play = useCallback(() => {
    if (!ref.current) return;

    const { type, delay = 0, duration = 800, letterDelay = 50 } = options;
    const letters = ref.current.querySelectorAll('.letter');

    // Reset any existing animation
    if (animationRef.current) {
      animationRef.current.pause();
    }

    // Set initial states based on animation type
    letters.forEach((letter) => {
      const el = letter as HTMLElement;
      el.style.opacity = '0';
      
      switch (type) {
        case 1: // Fade in from bottom
          el.style.transform = 'translateY(1em)';
          break;
        case 2: // Fade in from top
          el.style.transform = 'translateY(-1em)';
          break;
        case 3: // Scale/zoom in
          el.style.transform = 'scale(0)';
          break;
        case 4: // Rotate in (3D)
          el.style.transform = 'rotateY(-90deg)';
          el.style.transformOrigin = '50% 50%';
          break;
      }
    });

    // Convert NodeList to array
    const letterElements = Array.from(letters);
    if (letterElements.length === 0) return;

    // Create animation based on type - anime.js v4 syntax
    switch (type) {
      case 1: // Fade in from bottom
        animationRef.current = animate(letterElements, {
          opacity: [0, 1],
          translateY: ['1em', '0em'],
          duration,
          delay: stagger(letterDelay, { start: delay }),
        });
        break;
      case 2: // Fade in from top
        animationRef.current = animate(letterElements, {
          opacity: [0, 1],
          translateY: ['-1em', '0em'],
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
      case 4: // Rotate in (3D)
        animationRef.current = animate(letterElements, {
          opacity: [0, 1],
          rotateY: ['-90deg', '0deg'],
          duration,
          delay: stagger(letterDelay, { start: delay }),
        });
        break;
    }
  }, [options, wrapLetters]);

  const reset = useCallback(() => {
    if (!ref.current) return;
    
    const letters = ref.current.querySelectorAll('.letter');
    letters.forEach((letter) => {
      const el = letter as HTMLElement;
      el.style.opacity = '0';
    });
    
    if (animationRef.current) {
      animationRef.current.pause();
    }
  }, []);

  const init = useCallback(() => {
    if (!ref.current) return;
    wrapLetters(ref.current);
  }, [wrapLetters]);

  return { ref, play, reset, init };
};

export default useTextAnimation;
