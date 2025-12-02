import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "left" | "right" | "up" | "down" | "none";
}

export const Reveal = ({ children, className, delay = 0, direction = "up" }: RevealProps) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.95", "start 0.5"],
    });

    // Map delay to a start offset in the scroll range
    const offset = Math.min(delay / 2000, 0.4);

    const opacity = useTransform(scrollYProgress, [0 + offset, 1], [0, 1]);
    const scale = useTransform(scrollYProgress, [0 + offset, 1], [0.8, 1]);

    const xVal = direction === "left" ? -100 : direction === "right" ? 100 : 0;
    const yVal = direction === "up" ? 100 : direction === "down" ? -100 : 0;

    const x = useTransform(scrollYProgress, [0 + offset, 1], [xVal, 0]);
    const y = useTransform(scrollYProgress, [0 + offset, 1], [yVal, 0]);

    // Add some 3D rotation based on direction
    const rotateX = useTransform(scrollYProgress, [0 + offset, 1], [direction === "up" ? 30 : direction === "down" ? -30 : 0, 0]);
    const rotateY = useTransform(scrollYProgress, [0 + offset, 1], [direction === "left" ? -15 : direction === "right" ? 15 : 0, 0]);

    return (
        <motion.div
            ref={ref}
            style={{
                opacity,
                x,
                y,
                scale,
                rotateX,
                rotateY,
                transformPerspective: 1000,
                transformStyle: "preserve-3d"
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};
