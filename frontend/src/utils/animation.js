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