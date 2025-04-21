import { gsap } from "gsap";

export const animateScaleUp = (element, scale = 1.1, duration = 0.3) => {
  gsap.to(element, {
    scale,
    duration,
    ease: "power2.out",
  });
};

export const animateScaleDown = (element, scale = 1, duration = 0.3) => {
  gsap.to(element, {
    scale,
    duration,
    ease: "power2.out",
  });
};

export const animatePress = (element, scale = 0.9, duration = 0.1) => {
  gsap.to(element, {
    scale,
    duration,
    ease: "power2.out",
  });
};

export const animateRelease = (element, scale = 1.1, duration = 0.5) => {
  gsap.to(element, {
    scale,
    duration,
    ease: "power2.out",
  });
};


export const animateWordsIn = (elements, duration = 0.6, staggerDelay = 0.05, initialDelay = 0.5) => {
  gsap.fromTo(
    elements,
    {
      y: 20,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger: staggerDelay,
      delay: initialDelay,
      ease: "power2.out",
    }
  );
};


export const animateInFromLeft = (element, duration = 1, delay = 0, distance = 100) => {
  gsap.fromTo(
    element,
    { x: -distance, opacity: 0 },
    { x: 0, opacity: 1, duration, delay, ease: "power3.out" }
  );
};

export const animateInFromRight = (element, duration = 1, delay = 0, distance = 100) => {
  gsap.fromTo(
    element,
    { x: distance, opacity: 0 },
    { x: 0, opacity: 1, duration, delay, ease: "power3.out" }
  );
};

export const animateInFromTop = (element, duration = 1, delay = 0, distance = 100) => {
  gsap.fromTo(
    element,
    { y: -distance, opacity: 0 },
    { y: 0, opacity: 1, duration, delay, ease: "power3.out" }
  );
};

export const animateInFromBottom = (element, duration = 1, delay = 0, distance = 100) => {
  gsap.fromTo(
    element,
    { y: distance, opacity: 0 },
    { y: 0, opacity: 1, duration, delay, ease: "power3.out" }
  );
};