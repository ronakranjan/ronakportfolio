"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Star,
  Send,
  Code,
  Palette,
  Smartphone,
  Globe,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { GridScan } from "@/components/GridScan"

// Enhanced Particle Animation Component with Dynamic Movement
const EnhancedParticleBackground = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      opacity: number
      vx: number
      vy: number
      color: string
    }>
  >([])

  useEffect(() => {
    const generateParticles = () => {
      const colors = ["#8B5CF6", "#3B82F6", "#06B6D4", "#10B981", "#F59E0B"]
      const newParticles = []
      for (let i = 0; i < 80; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.6 + 0.1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
      setParticles(newParticles)
    }
    generateParticles()
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            x: [0, particle.vx * 100, 0],
            y: [0, particle.vy * 100, 0],
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Floating Geometric Shapes
const FloatingShapes = () => {
  const shapes = [
    { id: 1, type: "circle", size: 60, x: 10, y: 20 },
    { id: 2, type: "square", size: 40, x: 80, y: 60 },
    { id: 3, type: "triangle", size: 50, x: 20, y: 80 },
    { id: 4, type: "circle", size: 30, x: 90, y: 10 },
    { id: 5, type: "square", size: 35, x: 60, y: 30 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {shape.type === "circle" && (
            <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm" />
          )}
          {shape.type === "square" && (
            <div className="w-full h-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm transform rotate-45" />
          )}
          {shape.type === "triangle" && (
            <div className="w-0 h-0 border-l-[25px] border-r-[25px] border-b-[43px] border-l-transparent border-r-transparent border-b-purple-500/20" />
          )}
        </motion.div>
      ))}
    </div>
  )
}

// Enhanced Typing Animation with Cursor
const EnhancedTypingAnimation = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 30)
      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, text])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: isComplete ? 0 : [1, 0] }}
        transition={{ duration: 0.8, repeat: isComplete ? 0 : Number.POSITIVE_INFINITY }}
        className="inline-block w-0.5 h-6 bg-gradient-to-b from-purple-400 to-blue-400 ml-1"
      />
    </span>
  )
}

// Magnetic Button Component
const MagneticButton = ({ children, className = "", ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.15
    const deltaY = (e.clientY - centerY) * 0.15
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div animate={{ x: position.x, y: position.y }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <Button ref={ref} className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} {...props}>
        {children}
      </Button>
    </motion.div>
  )
}

// Enhanced 3D Tilt Card with Glow Effect
const Enhanced3DTiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateXValue = (e.clientY - centerY) / 8
    const rotateYValue = (centerX - e.clientX) / 8

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {children}
    </motion.div>
  )
}

// Scroll Reveal Component
const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// Text Reveal Animation
const TextReveal = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ")

  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

// Optimized Custom Animated Cursor Component
const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)

  // Use refs for smooth animation without re-renders
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const trailPositionRef = useRef({ x: 0, y: 0 })
  const ringPositionRef = useRef({ x: 0, y: 0 })

  // Smooth interpolation function
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  // Optimized animation loop using requestAnimationFrame
  const animateCursor = useCallback(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    const ring = ringRef.current

    if (!cursor || !trail || !ring) return

    // Smooth interpolation for main cursor (fast response)
    targetPositionRef.current.x = lerp(targetPositionRef.current.x, mousePositionRef.current.x, 0.15)
    targetPositionRef.current.y = lerp(targetPositionRef.current.y, mousePositionRef.current.y, 0.15)

    // Smooth interpolation for trail (slower response)
    trailPositionRef.current.x = lerp(trailPositionRef.current.x, mousePositionRef.current.x, 0.08)
    trailPositionRef.current.y = lerp(trailPositionRef.current.y, mousePositionRef.current.y, 0.08)

    // Smooth interpolation for ring (medium response)
    ringPositionRef.current.x = lerp(ringPositionRef.current.x, mousePositionRef.current.x, 0.12)
    ringPositionRef.current.y = lerp(ringPositionRef.current.y, mousePositionRef.current.y, 0.12)

    // Apply transforms using transform3d for hardware acceleration
    cursor.style.transform = `translate3d(${targetPositionRef.current.x - 16}px, ${targetPositionRef.current.y - 16}px, 0)`
    trail.style.transform = `translate3d(${trailPositionRef.current.x - 4}px, ${trailPositionRef.current.y - 4}px, 0)`
    ring.style.transform = `translate3d(${ringPositionRef.current.x - 24}px, ${ringPositionRef.current.y - 24}px, 0)`

    animationFrameRef.current = requestAnimationFrame(animateCursor)
  }, [])

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      }

      // Update state only when necessary to prevent unnecessary re-renders
      if (!isVisible) {
        setIsVisible(true)
      }
    },
    [isVisible],
  )

  // Detect interactive elements more efficiently
  const updateCursorVariant = useCallback((target: HTMLElement) => {
    const computedStyle = window.getComputedStyle(target)
    const isClickable =
      computedStyle.cursor === "pointer" ||
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.closest("button") ||
      target.closest("a") ||
      target.getAttribute("role") === "button"

    setIsPointer(isClickable)

    if (target.tagName === "BUTTON" || target.closest("button")) {
      setCursorVariant("button")
    } else if (target.tagName === "A" || target.closest("a")) {
      setCursorVariant("link")
    } else if (target.closest(".project-card")) {
      setCursorVariant("project")
    } else if (target.closest("input") || target.closest("textarea")) {
      setCursorVariant("input")
    } else if (target.closest(".social-icon")) {
      setCursorVariant("social")
    } else if (isClickable) {
      setCursorVariant("button")
    } else {
      setCursorVariant("default")
    }
  }, [])

  // Optimized mouse over handler with debouncing
  const handleMouseOver = useCallback(
    (e: Event) => {
      const target = e.target as HTMLElement
      if (target) {
        updateCursorVariant(target)
      }
    },
    [updateCursorVariant],
  )

  // Handle mouse leave/enter for visibility
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true)
  }, [])

  // Setup event listeners and animation
  useEffect(() => {
    // Check if device supports hover (desktop)
    const supportsHover = window.matchMedia("(hover: hover)").matches
    if (!supportsHover) return

    // Add event listeners with passive option for better performance
    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseover", handleMouseOver, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true })

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animateCursor)

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [handleMouseMove, handleMouseOver, handleMouseLeave, handleMouseEnter, animateCursor])

  // Don't render on touch devices or if not visible
  const supportsHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches
  if (!supportsHover || !isVisible) return null

  // Cursor variant styles with optimized transitions
  const getCursorStyles = (variant: string) => {
    const baseStyles = {
      position: "fixed" as const,
      top: 0,
      left: 0,
      pointerEvents: "none" as const,
      zIndex: 9999,
      borderRadius: "50%",
      transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, opacity 0.2s ease",
      willChange: "transform",
    }

    switch (variant) {
      case "button":
        return {
          ...baseStyles,
          width: "48px",
          height: "48px",
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          mixBlendMode: "difference" as const,
        }
      case "link":
        return {
          ...baseStyles,
          width: "40px",
          height: "40px",
          backgroundColor: "rgba(16, 185, 129, 0.8)",
          mixBlendMode: "difference" as const,
        }
      case "project":
        return {
          ...baseStyles,
          width: "64px",
          height: "64px",
          backgroundColor: "rgba(245, 158, 11, 0.6)",
          mixBlendMode: "difference" as const,
        }
      case "input":
        return {
          ...baseStyles,
          width: "4px",
          height: "24px",
          backgroundColor: "rgba(139, 92, 246, 1)",
          mixBlendMode: "normal" as const,
          borderRadius: "2px",
        }
      case "social":
        return {
          ...baseStyles,
          width: "56px",
          height: "56px",
          backgroundColor: "rgba(236, 72, 153, 0.8)",
          mixBlendMode: "difference" as const,
        }
      default:
        return {
          ...baseStyles,
          width: "32px",
          height: "32px",
          backgroundColor: "rgba(139, 92, 246, 0.8)",
          mixBlendMode: "difference" as const,
        }
    }
  }

  const getTrailStyles = () => ({
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "8px",
    height: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: "50%",
    pointerEvents: "none" as const,
    zIndex: 9998,
    transition: "opacity 0.2s ease",
    willChange: "transform",
  })

  const getRingStyles = () => ({
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: cursorVariant === "button" ? "72px" : cursorVariant === "project" ? "96px" : "48px",
    height: cursorVariant === "button" ? "72px" : cursorVariant === "project" ? "96px" : "48px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    pointerEvents: "none" as const,
    zIndex: 9997,
    transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
    willChange: "transform",
  })

  return (
    <>
      {/* Main Cursor */}
      <div ref={cursorRef} style={getCursorStyles(cursorVariant)} />

      {/* Cursor Trail */}
      <div ref={trailRef} style={getTrailStyles()} />

      {/* Cursor Ring */}
      <div ref={ringRef} style={getRingStyles()} />

      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        /* Restore cursor for specific elements that need it */
        input[type="text"],
        input[type="email"],
        input[type="password"],
        textarea {
          cursor: text !important;
        }
        
        /* Ensure smooth rendering */
        .cursor-element {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { scrollYProgress } = useScroll()
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -200])

  const projects = [
    {
      id: 1,
      title: "MG Hair Pvt Ltd",
      category: "E-commerce",
      description:
        "A comprehensive e-commerce solution with advanced product filtering, secure payment integration, and responsive design that increased client sales by 200%.",
      image: "/images/mghair.png",
      tech: ["E-commerce", "React", "Next.js"],
      link: "https://mghairindia.com/",
      hasLiveDemo: true,
    },
    {
      id: 2,
      title: "Nirvana Organics",
      category: "E-commerce",
      description:
        "A robust organic e-commerce platform featuring product management, order tracking, and secure payment integration.",
      image: "/images/nirvana.png",
      tech: ["E-commerce", "Shopify", "React"],
      link: "https://www.nirvanaorganic.in/",
      hasLiveDemo: true,
    },
    {
      id: 3,
      title: "SE Interiors",
      category: "Interior Design",
      description:
        "A modern interior design website with interactive 3D models, project showcases, and client testimonials.",
      image: "/images/seinteriors.png",
      tech: ["Interior Design", "Vanilla Code", "HSTS"],
      link: "https://seinteriors.in/",
      hasLiveDemo: true,
    },
    {
      id: 4,
      title: "The Patiala Kitchen",
      category: "Restaurant",
      description:
        "A modern restaurant website that offers a unique dining experience with a user-friendly interface, restaurant menu, and reservation system. Features a blog section and responsive design for all devices.",
      image: "/images/thepatiala.png",
      tech: ["Restaurant", "WordPress", "Next.js"],
      link: "https://thepatialakkitchen.com/",
      hasLiveDemo: true,
    },
    {
      id: 5,
      title: "Aggarwa Law Firm",
      category: "Law",
      description:
        "A professional law firm website providing legal services with a team of experienced lawyers. Features contact forms and appointment scheduling functionality.",
      image: "/images/aggrawal.png",
      tech: ["Law", "Wix.com", "Next.js"],
      link: "https://www.aggarwallawfirm.com/",
      hasLiveDemo: true,
    },
    {
      id: 6,
      title: "Collection Realty",
      category: "Real Estate",
      description:
        "A real estate platform for buying, selling, and renting properties. Features community networking, property search, listing management, and messaging functionality.",
      image: "/images/collectionrealty.png",
      tech: ["Real Estate", "Shopify", "Vue.js"],
      link: "https://collectionrealty.in/",
      hasLiveDemo: true,
    },
    {
      id: 7,
      title: "Hari Om Tours and Travels",
      category: "Tour & Travel",
      description:
        "A tour and travel company website offering various tours and packages. Features online booking, package viewing, and mobile app integration.",
      image: "/images/hariom.png",
      tech: ["Tour", "Advanced JS", "Next.js"],
      link: "https://hariomtoursandtravels.netlify.app/",
      hasLiveDemo: true,
    },
    {
      id: 8,
      title: "Growth Associates",
      category: "Real Estate",
      description:
        "A real estate agency website showcasing premium properties in Butibori with elegant design and property listings.",
      image: "/images/growthassociate.png",
      tech: ["Real Estate", "Static HTML", "CSS"],
      link: "https://thegrowthassociate.com",
      hasLiveDemo: true,
    },
    {
      id: 9,
      title: "R Bazaar",
      category: "E-commerce / Furniture",
      description:
        "A premium furniture brand e-commerce platform that provides an immersive shopping experience for quality furniture.",
      image: "/images/rbazaar.png",
      tech: ["E-commerce", "Express.js", "React + NextJS"],
      link: "https://rbazaar.in",
      hasLiveDemo: true,
    },
  ]

  const testimonials = [
    {
      name: "Rahul Mehta",
      role: "Owner, MG Hair India",
      content:
        "Ronak built our e-commerce website from scratch. Sales increased by 200% within 3 months. Very professional and delivers on time.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Founder, Nirvana Organics",
      content:
        "Our online store looks premium and works flawlessly. Customers love the easy checkout process. Highly recommend his work.",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      role: "Director, Collection Realty",
      content:
        "The property website he created for us gets us quality leads every week. Clean design, fast loading, exactly what we needed.",
      rating: 5,
    },
  ]

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full-Stack Development",
      description: "End-to-end web applications with modern technologies",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that users love",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Optimization",
      description: "Performance optimization and SEO enhancement",
    },
  ]



  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "services", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }


  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* Enhanced Sticky Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              RONAK
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "services", "testimonials", "contact"].map((section, index) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors relative ${activeSection === section ? "text-purple-400" : "text-white/70 hover:text-white"
                    }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {section === "about" ? "About Me" : section}
                  {activeSection === section && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"
                      layoutId="activeSection"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* GridScan Background - Hero Only */}
        <div className="absolute inset-0 z-0">
          <GridScan
            lineThickness={1}
            linesColor="#392e4e"
            scanColor="#8B5CF6"
            scanOpacity={0.4}
            gridScale={0.15}
            lineStyle="solid"
            lineJitter={0}
            scanDirection="pingpong"
            enablePost={false}
            noiseIntensity={0}
            scanGlow={0.5}
            scanSoftness={2}
            scanPhaseTaper={0.15}
            scanDuration={4.0}
            scanDelay={2.0}
            sensitivity={0.3}
            snapBackDelay={300}
            className="w-full h-full"
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white block">Hi, I'm Ronak</span>
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block mt-2">
                Full Stack Developer
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              I build <span className="text-white/80">e-commerce stores</span>, <span className="text-white/80">business websites</span>,
              and <span className="text-white/80">web applications</span> that drive results.
              With 20+ projects delivered, I help brands establish their online presence
              using React, Next.js, and modern web technologies.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-medium rounded-full overflow-hidden shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                onClick={() => scrollToSection("contact")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get in Touch
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                className="group px-8 py-4 text-white/80 text-lg font-medium rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
                onClick={() => scrollToSection("projects")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  View Projects
                  <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.img
                  src="/images/ronak-portrait.jpg"
                  alt="Ronak Ranjan - Creative Web Developer"
                  className="relative rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 w-full"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <motion.h2
                className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                whileInView={{ backgroundPosition: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              >
                About Me
              </motion.h2>

              <div className="text-xl text-white/80 mb-8 leading-relaxed">
                <EnhancedTypingAnimation text="I'm a passionate full-stack developer with 5+ years of experience creating digital masterpieces. I specialize in React, Node.js, and modern web technologies, turning complex ideas into elegant, user-friendly solutions." />
              </div>

              <motion.div
                className="grid grid-cols-2 gap-6 mb-8"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { number: "20+", label: "Projects Completed", color: "purple" },
                  { number: "2+", label: "Years Experience", color: "blue" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 group hover:bg-white/10 transition-all duration-300"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <motion.h3
                      className={`text-2xl font-bold text-${stat.color}-400 mb-2`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                    >
                      {stat.number}
                    </motion.h3>
                    <p className="text-white/70">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-3"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {["React", "Node.js", "TypeScript", "Python", "AWS", "MongoDB"].map((skill, index) => (
                  <motion.div
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, scale: 0 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border-purple-500/30 px-4 py-2 hover:from-purple-600/30 hover:to-blue-600/30 transition-all duration-300"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.h2
                className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                whileInView={{
                  backgroundImage: [
                    "linear-gradient(to right, #ffffff, #c4b5fd)",
                    "linear-gradient(to right, #8b5cf6, #3b82f6)",
                    "linear-gradient(to right, #ffffff, #c4b5fd)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Featured Projects
              </motion.h2>
              <motion.p
                className="text-xl text-white/70 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                A showcase of my latest work, featuring cutting-edge technologies and innovative solutions.
              </motion.p>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: -15 },
                  visible: { opacity: 1, y: 0, rotateX: 0 },
                }}
              >
                <Enhanced3DTiltCard className="h-full">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 h-full group cursor-pointer overflow-hidden project-card">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <motion.img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white border-0 backdrop-blur-sm px-3 py-1 text-xs font-semibold"
                          >
                            {project.category}
                          </Badge>
                        </div>
                        <motion.div
                          className="absolute top-4 right-4"
                          initial={{ opacity: 0, scale: 0 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <MagneticButton
                            size="sm"
                            variant="secondary"
                            onClick={() => setSelectedProject(project)}
                            className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
                          >
                            View Details
                          </MagneticButton>
                        </motion.div>
                      </div>
                      <div className="p-6">
                        <motion.h3
                          className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          {project.title}
                        </motion.h3>
                        <p className="text-white/70 mb-4 line-clamp-2">{project.description}</p>
                        <motion.div
                          className="flex flex-wrap gap-2 mb-4"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.1,
                              },
                            },
                          }}
                          initial="hidden"
                          whileInView="visible"
                        >
                          {project.tech.map((tech) => (
                            <motion.div
                              key={tech}
                              variants={{
                                hidden: { opacity: 0, scale: 0 },
                                visible: { opacity: 1, scale: 1 },
                              }}
                              whileHover={{ scale: 1.1 }}
                            >
                              <Badge
                                variant="outline"
                                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-colors"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </motion.div>
                        <div className="flex gap-3">
                          {project.hasLiveDemo && (
                            <MagneticButton
                              size="sm"
                              variant="outline"
                              className="border-white/30 text-white hover:bg-white/10 bg-transparent group"
                              onClick={() => window.open(project.link, "_blank")}
                            >
                              <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-45 transition-transform" />
                              Live
                            </MagneticButton>
                          )}
                          {project.status === "In Development" && (
                            <Badge
                              variant="secondary"
                              className="bg-gradient-to-r from-orange-600/20 to-yellow-600/20 text-orange-300 border-orange-500/30 px-3 py-1"
                            >
                              🚧 In Development
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Enhanced3DTiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.h2
                className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                whileInView={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              >
                Services
              </motion.h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Comprehensive digital solutions tailored to your business needs.
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50, rotateY: -15 },
                  visible: { opacity: 1, y: 0, rotateY: 0 },
                }}
              >
                <Enhanced3DTiltCard>
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 h-full group">
                    <CardContent className="p-8 text-center">
                      <motion.div
                        className="mb-6 text-purple-400 group-hover:text-blue-400 transition-colors duration-300 flex justify-center"
                        whileHover={{
                          scale: 1.2,
                          rotate: [0, -10, 10, 0],
                          y: -5,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {service.icon}
                      </motion.div>
                      <motion.h3
                        className="text-xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        {service.title}
                      </motion.h3>
                      <p className="text-white/70 group-hover:text-white/90 transition-colors">{service.description}</p>
                    </CardContent>
                  </Card>
                </Enhanced3DTiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Client Feedback
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              What people say about working with me
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-colors"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                    <p className="text-white/50 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Let's Connect
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Have a project in mind? Let's discuss how I can help bring your ideas to life.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Main Contact Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Email Card */}
              <motion.a
                href="mailto:ronakranjan623@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] hover:border-purple-500/30 transition-all duration-300 flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Email me at</p>
                  <p className="text-white font-medium group-hover:text-purple-400 transition-colors">ronakranjan623@gmail.com</p>
                </div>
              </motion.a>

              {/* WhatsApp/Phone Card */}
              <motion.a
                href="https://wa.me/919135571566"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] hover:border-green-500/30 transition-all duration-300 flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Message on WhatsApp</p>
                  <p className="text-white font-medium group-hover:text-green-400 transition-colors">+919135571566</p>
                </div>
              </motion.a>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <p className="text-white/50 text-sm text-center mb-5">Or find me on</p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://github.com/ronakranjan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 border border-white/20 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ronak-ranjan-3a9a38340/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 border border-white/20 rounded-xl flex items-center justify-center text-white/60 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <motion.footer
        className="py-12 border-t border-white/10 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.p className="text-white/50" whileHover={{ color: "rgba(255, 255, 255, 0.8)" }}>
            Built with passion and cutting-edge technology.
          </motion.p>
        </div>
      </motion.footer>

      {/* Enhanced Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <motion.h3
                    className="text-3xl font-bold text-white"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedProject.title}
                  </motion.h3>
                  <MagneticButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProject(null)}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-6 h-6" />
                  </MagneticButton>
                </div>

                <motion.img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                />

                <motion.p
                  className="text-white/80 text-lg mb-6 leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {selectedProject.description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3 mb-6"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {selectedProject.tech.map((tech: string) => (
                    <motion.div
                      key={tech}
                      variants={{
                        hidden: { opacity: 0, scale: 0 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Badge
                        variant="outline"
                        className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-colors"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="flex gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {selectedProject.hasLiveDemo && (
                    <MagneticButton
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 group"
                      onClick={() => window.open(selectedProject.link, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-45 transition-transform" />
                      Live Demo
                    </MagneticButton>
                  )}
                  {selectedProject.hasCode && (
                    <MagneticButton
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 bg-transparent group"
                      onClick={() => window.open(selectedProject.github, "_blank")}
                    >
                      <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      View Code
                    </MagneticButton>
                  )}
                  {selectedProject.status === "In Development" && (
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-orange-600/20 to-yellow-600/20 text-orange-300 border-orange-500/30 px-4 py-2"
                      >
                        🚧 Currently in Development
                      </Badge>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  )
}
