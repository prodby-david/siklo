import type { Variants } from "framer-motion";

export const heroContainerVariants: Variants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const heroVisualizerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const heroBadgeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const heroTitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const heroSubtitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const heroCtaVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const floatCardTopLeft: Variants = {
  hidden: { opacity: 0, scale: 0.4, x: 120, y: 80 },
  visible: {
    opacity: 0.9,
    scale: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 85, damping: 14, delay: 0.1 },
  },
};

export const floatCardTopRight: Variants = {
  hidden: { opacity: 0, scale: 0.4, x: -120, y: 80 },
  visible: {
    opacity: 0.9,
    scale: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 85, damping: 14, delay: 0.15 },
  },
};

export const floatCardMidLeft: Variants = {
  hidden: { opacity: 0, scale: 0.4, x: 140, y: 0 },
  visible: {
    opacity: 0.9,
    scale: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 85, damping: 14, delay: 0.2 },
  },
};

export const floatCardMidRight: Variants = {
  hidden: { opacity: 0, scale: 0.4, x: -140, y: 0 },
  visible: {
    opacity: 0.9,
    scale: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 85, damping: 14, delay: 0.25 },
  },
};

export const floatCardBtmLeft: Variants = {
  hidden: { opacity: 0, scale: 0.4, x: 120, y: -80 },
  visible: {
    opacity: 0.9,
    scale: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 85, damping: 14, delay: 0.3 },
  },
};

export const floatCardBtmRight: Variants = {
  hidden: { opacity: 0, scale: 0.4, x: -120, y: -80 },
  visible: {
    opacity: 0.9,
    scale: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 85, damping: 14, delay: 0.35 },
  },
};
