import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useGSAP(
    () => {
      if (!ref.current || !text) return;
      // Prevent re-animation if already completed
      if (animationCompletedRef.current) return;
      const el = ref.current;

      // Select all the custom split character spans we rendered
      const targets = gsap.utils.toArray(el.querySelectorAll('.split-char'));

      gsap.fromTo(
        targets,
        from,
        {
          ...to,
          duration: 1.5,
          ease,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none reset"
          },
          onComplete: () => {
            animationCompletedRef.current = true;
            onCompleteRef.current?.();
          },
          willChange: 'transform, opacity',
          force3D: true
        }
      );

      return () => {
        gsap.killTweensOf(targets);
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin
      ],
      scope: ref
    }
  );

  const renderSplitText = () => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="split-char"
        style={{ display: 'inline-block', whiteSpace: 'pre' }}
      >
        {char}
      </span>
    ));
  };

  const renderTag = () => {
    const style = {
      textAlign,
      overflow: 'hidden',
      display: 'inline-block',
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      willChange: 'transform, opacity'
    };
    const classes = `split-parent ${className}`;
    const Tag = tag || 'p';

    return (
      <Tag ref={ref} style={style} className={classes}>
        {renderSplitText()}
      </Tag>
    );
  };
  
  return renderTag();
};

export default SplitText;
