"use client";

import React, { useState } from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Button } from "@/components/ui/button";
import { Button2 } from "@/components/ui/moving-border";
import { Cover } from "@/components/ui/cover";
import { WorldMap } from "@/components/ui/world-map";
import {
    IconAdjustmentsBolt,
    IconCloud,
    IconCurrencyDollar,
    IconEaseInOut,
    IconBrandYoutubeFilled,
    IconHeart,
    IconHelp,
    IconRouteAltLeft,
    IconTerminal2,
    IconStar,
    IconCheck
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator"
import Globemap from "@/components/ui/globe";
import Marquee from "@/components/animata/container/marquee";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 100
        }
    }
};

const headerVariants = {
    hidden: {
        opacity: 0,
        y: -50
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6
        }
    }
};

const words = `Transform your creative vision into reality with AI-powered music and comedy production.`;


const testimonials = [
    {
        name: "Alex Thompson",
        role: "Professional Musician",
        content: "This platform has revolutionized my creative process. The AI-powered tools are incredible!",
        image: "https://randomuser.me/api/portraits/men/22.jpg",
        rating: 5,
    },
    {
        name: "Olivia Brown",
        role: "Freelance Writer",
        content: "It’s like having an AI assistant guiding me through every creative block.",
        image: "https://randomuser.me/api/portraits/women/25.jpg",
        rating: 5,
    },
    {
        name: "Benjamin Davis",
        role: "Video Producer",
        content: "The tools offered are intuitive and cater to every aspect of content creation.",
        image: "https://randomuser.me/api/portraits/men/15.jpg",
        rating: 5,
    },
    {
        name: "Emma Wilson",
        role: "Social Media Influencer",
        content: "This platform makes it super easy to generate unique and trendy content ideas.",
        image: "https://randomuser.me/api/portraits/women/64.jpg",
        rating: 4,
    },
    {
        name: "James White",
        role: "Entrepreneur",
        content: "It’s an all-in-one solution for marketing, creativity, and branding.",
        image: "https://randomuser.me/api/portraits/men/36.jpg",
        rating: 5,
    },
    {
        name: "Amelia Clark",
        role: "SEO Analyst",
        content: "The AI-powered insights improved my content’s visibility like never before.",
        image: "https://randomuser.me/api/portraits/women/18.jpg",
        rating: 4,
    },

    {
        name: "Michael Adams",
        role: "Startup Founder",
        content: "An excellent resource for branding and pitching to investors.",
        image: "https://randomuser.me/api/portraits/men/91.jpg",
        rating: 5,
    },
    {
        name: "Chloe Rivera",
        role: "Photographer",
        content: "The AI tools inspire unique concepts for my photography projects.",
        image: "https://randomuser.me/api/portraits/women/60.jpg",
        rating: 5,
    },
];

const TestimonialCard = ({ review }: any) => (
    <figure
        className={cn(
            "relative w-72 md:w-96 shrink-0 cursor-pointer overflow-hidden rounded-xl border p-4 md:p-6 mx-3 md:mx-4",
            "border-gray-300/10 bg-gray-900/30 hover:bg-gray-800/40",
            "transition-all duration-300 ease-in-out backdrop-blur-sm",
            "hover:border-gray-500/30 hover:shadow-lg hover:shadow-gray-500/10"
        )}
    >
        <div className="flex flex-row items-center gap-2 md:gap-3">
            <div className="relative">
                <img
                    className="h-10 w-10 md:h-12 md:w-12 rounded-full ring-2 ring-purple-500/20"
                    alt={review.name}
                    src={review.image}
                />
                <div className="absolute -bottom-1 -right-1 h-4 w-4 md:h-4 md:w-4 rounded-full bg-purple-500 ring-2 ring-purple-950">
                    <div className="h-full w-full animate-pulse rounded-full bg-purple-400/50" />
                </div>
            </div>
            <div className="flex flex-col">
                <figcaption className="text-sm md:text-base font-medium text-white">
                    {review.name}
                </figcaption>
                <p className="text-xs md:text-sm font-medium text-purple-200/60">{review.role}</p>
            </div>
        </div>
        <blockquote className="mt-3 md:mt-4 text-xs md:text-sm leading-relaxed text-purple-100/90">
            {review.content}
        </blockquote>
        <div className="flex mt-3 md:mt-4 items-center gap-1">
            {Array.from({ length: review.rating }).map((_, i) => (
                <IconStar key={i} className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-yellow-400" />
            ))}
        </div>
    </figure>
);

export const FixedTopNavbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if it's mobile screen
        const checkMobileScreen = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkMobileScreen();

        // Toggle visibility based on scroll and screen size
        const toggleVisibility = () => {
            if (!isMobile) {
                // Show navbar when scrolled past hero section for non-mobile screens
                if (window.scrollY > window.innerHeight * 0.8) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            }
        };

        // Add event listeners
        window.addEventListener('resize', checkMobileScreen);
        window.addEventListener('scroll', toggleVisibility);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkMobileScreen);
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, [isMobile]);

    // Hide on mobile
    if (isMobile) return null;

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] flex flex-row items-center justify-between space-x-4 px-4 py-2">
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl bg-clip-text text-transparent drop-shadow-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4BC0C8] via-[#C779D0] to-[#FEAC5E]">
                    Vibe Vision
                </h1>
            </div>
            <div className="relative flex items-center justify-center space-x-4 bg-inherit backdrop-blur-md blur-10 rounded-2xl overflow-hidden border border-white/[0.2] shadow-input flex justify-center space-x-4 px-4 py-3 ">
                <nav className="hidden md:flex space-x-6 text-white">
                    <Link href="#" className="text-white hover:text-gray-300 relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500">Home</Link>
                    <Link href="#features" className="text-white hover:text-gray-300 relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500">Features</Link>
                    <Link href="#plans" className="text-white hover:text-gray-300 relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500">Plans</Link>
                    <Link href="#about" className="text-white hover:text-gray-300 relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500">About</Link>
                    <Link href="#help" className="text-white hover:text-gray-300 relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500">Help</Link>
                    <Link href="#news" className="text-white hover:text-gray-300 relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500">News</Link>
                    <Link href="#contact" className="text-white hover:text-gray-300 relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500">Contact Us</Link>
                </nav>
            </div>
            <Link href="/login">
                <Button2
                    borderRadius="1rem"
                    className="bg-black text-xl text-white border-slate-800 w-50 h-10 border-2 transition-all duration-300"
                >
                    Login/Signup
                </Button2>
            </Link>
        </div>
    );
};

export const FloatingNavbar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if it's mobile screen
        const checkMobileScreen = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkMobileScreen();

        const toggleVisibility = () => {
            if (!isMobile) {
                // Show navbar when scrolled past hero section for non-mobile screens
                if (window.scrollY > window.innerHeight * 0.8) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            }
        };

        // Add event listeners
        window.addEventListener('resize', checkMobileScreen);
        window.addEventListener('scroll', toggleVisibility);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkMobileScreen);
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, [isMobile]);

    // Hide on mobile
    if (isMobile) return null;

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 bg-inherit backdrop-blur-md border border-white/[0.2] shadow-input rounded-2xl w-[45%] mx-auto my-4"
        >
            <div className="w-full mx-auto px-4 py-3 flex justify-between items-center">
                <nav className="flex items-center space-x-6">
                    <Link href="#" className="text-white hover:text-gray-300 relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500">Home</Link>
                    <Link href="#features" className="text-white hover:text-gray-300 relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500">Features</Link>
                    <Link href="#plans" className="text-white hover:text-gray-300 relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500">Plans</Link>
                    <Link href="#about" className="text-white hover:text-gray-300 relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500">About</Link>
                    <Link href="#help" className="text-white hover:text-gray-300 relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500">Help</Link>
                    <Link href="#news" className="text-white hover:text-gray-300 relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500">News</Link>
                    <Link href="#contact" className="text-white hover:text-gray-300 relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500">Contact Us</Link>
                </nav>
                <Link href="/login">
                    <Button2
                        borderRadius="1rem"
                        className="bg-black text-xl text-white border-slate-800 w-50 h-10 border-2 transition-all duration-300"
                    >
                        Login/Signup
                    </Button2>
                </Link>
            </div>
        </motion.div>
    );
};

export const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if it's mobile screen
        const checkMobileScreen = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkMobileScreen();

        // Add resize event listener
        window.addEventListener('resize', checkMobileScreen);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkMobileScreen);
        };
    }, []);

    // Only render mobile menu on mobile screens
    if (!isMobile) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[9997] bg-transparent">
            <div className="flex justify-between items-center p-4">
                <h1 className={`text-2xl bg-clip-text text-transparent drop-shadow-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4BC0C8] via-[#C779D0] to-[#FEAC5E] transition-opacity duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                    Vibe Vision
                </h1>
            </div>

            {/* Floating Menu Box */}
            <motion.div
                initial={{ 
                    width: "48px",
                    height: "48px", 
                    borderRadius: "9999px",
                    opacity: 1,
                    top: "16px",
                    right: "16px",
                    left: "auto",
                    scale: 0.95
                }}
                animate={isOpen ? {
                    width: "50%",
                    height: "auto",
                    borderRadius: "12px", 
                    top: "0px",
                    right: "auto",
                    left: "25%",
                    scale: 1
                } : {
                    width: "48px",
                    height: "48px",
                    borderRadius: "9999px",
                    top: "16px", 
                    right: "16px",
                    left: "auto",
                    scale: 0.95
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                }}
                className={`fixed bg-transparent backdrop-blur-md border border-white/20 shadow-xl overflow-hidden ${isOpen ? 'block' : 'hidden'}`}
            >
                <div className="relative">
                    {/* X Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 focus:outline-none z-[9999]"
                    >
                        <motion.div
                            animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </motion.div>
                    </button>

                    <motion.div 
                        className="flex flex-col items-left space-y-6 py-8 pl-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link
                            href="#"
                            className="text-2xl text-white hover:text-gray-300 transition-colors relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="#features"
                            className="text-2xl text-white hover:text-gray-300 transition-colors relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="#plans"
                            className="text-2xl text-white hover:text-gray-300 transition-colors relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Plans
                        </Link>
                        <Link
                            href="#about"
                            className="text-2xl text-white hover:text-gray-300 transition-colors relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="#help"
                            className="text-2xl text-white hover:text-gray-300 transition-colors relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Help
                        </Link>
                        <Link
                            href="#news"
                            className="text-2xl text-white hover:text-gray-300 transition-colors relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            News
                        </Link>
                        <Link
                            href="#contact"
                            className="text-2xl text-white hover:text-gray-300 transition-colors relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact Us
                        </Link>

                        <Link href="/login">
                            <Button
                                variant="outline"
                                className="text-white rounded-md border-white hover:bg-white hover:text-black text-xl transition-all duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                Login/Signup
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Menu Button */}
            {!isOpen && (
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 focus:outline-none z-[9999]"
                >
                    <motion.div
                        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </motion.div>
                </motion.button>
            )}
        </div>
    );
};

const LandingPage = () => {
    return (
        <div className="flex flex-col justify-center items-center overflow-hidden">
            <BackgroundGradientAnimation>
                {/* Fixed Top Navbar */}
                <FixedTopNavbar />
                {/* Floating Navbar */}
                <FloatingNavbar />
                {/* Mobile Menu */}
                <MobileMenu />
                <div className="absolute z-50 inset-0 flex flex-col text-center justify-center items-center">

                    <h1 className="bg-clip-text capitalize text-transparent font-semibold drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 text-3xl md:text-4xl lg:text-7xl">
                        Interdimensional <Cover><div className="w-10 h-10 rotate-45"><Image src="/rocket.gif" alt="logo" width={100} height={100} /></div></Cover> entertainment
                    </h1>
                    <p className="text-gray-500 text-center justify-center items-center flex md:text-xl lg:text-2xl py-4">
                        create, perform, entertain and share your content
                    </p>
                    <div className="flex flex-row justify-center items-center space-x-4">
                        <Link href="/entertainment-hub">
                            <button className="bg-transparent text-white px-4 py-2 rounded-md border border-white hover:bg-white hover:text-black transition-all duration-300">
                                Explore More
                            </button>
                        </Link>
                    </div>
                </div>
            </BackgroundGradientAnimation>
            <div className="flex flex-col justify-center items-center">
                <TextGenerateEffect words={words} duration={2} className="text-white text-3xl text-center md:text-4xl lg:text-6xl w-5/6 justify-center items-center py-10 px-6" />
                <Separator />
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col justify-center items-center py-10 px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-clip-text text-transparent drop-shadow-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4BC0C8] via-[#C779D0] to-[#FEAC5E] text-3xl text-center md:text-4xl lg:text-6xl w-5/6 justify-center items-center">
                        AI Features We Offer
                    </motion.h1>

                    <FeaturesSection1 />
                </motion.div>
                <Separator />
                <section className="py-14 relative">
                    <div className="max-w-screen-xl mx-auto px-4 text-gray-400 md:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            className="relative max-w-2xl mx-auto sm:text-center"
                        >
                            <motion.div variants={headerVariants} className="relative z-10">
                                <h3 className="text-gray-200 mt-4 text-3xl font-normal font-geist tracking-tighter md:text-5xl sm:text-4xl">
                                    Powered by Cutting-Edge AI Technologies
                                </h3>
                                <p className="mt-3 font-geist text-gray-200">
                                    We leverage the most advanced AI technologies to deliver innovative solutions across voice, language, music, video, and image generation.
                                </p>
                            </motion.div>
                            <motion.div
                                className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]"
                                style={{
                                    background:
                                        "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
                                }}
                            ></motion.div>
                        </motion.div>

                        <hr className="bg-white/30 h-px w-1/2 mx-auto mt-5" />

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            className="relative mt-12"
                        >
                            <motion.ul
                                variants={containerVariants}
                                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                            >
                                {features.map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        variants={itemVariants}
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.2 }
                                        }}
                                        className="bg-transparent transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] space-y-3 p-4 border rounded-xl"
                                    >
                                        <div className="text-purple-600 rounded-full p-4 transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] w-fit">
                                            {item.icon}
                                        </div>
                                        <h4 className="text-lg text-gray-300 font-bold font-geist tracking-tighter">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-500">{item.desc}</p>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    </div>
                </section>
                <Separator />
                <FeaturesSection2 />
                <Separator />
                <PricingSection />
                <Separator />
                {/* Testimonials Section */}
                <section className="relative min-h-screen w-full bg-gradient-to-b from-gray-950 to-black py-24">
                    {/* Background Decorative Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-indigo-900/10 blur-3xl" />
                        <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-indigo-800/5 blur-2xl" />
                        <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-indigo-700/5 blur-2xl" />
                    </div>

                    <div className="relative max-w-screen-2xl mx-auto px-4">
                        {/* Enhanced Header with Decorative Line */}
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center space-x-4 mb-6">
                                <div className="h-px w-8 bg-indigo-500/30" />
                                <span className="text-indigo-400 uppercase tracking-wider text-sm font-medium">
                                    Testimonials
                                </span>
                                <div className="h-px w-8 bg-indigo-500/30" />
                            </div>
                            <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-gray-200 to-indigo-300 bg-clip-text text-transparent">
                                What Creators Say
                            </h2>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                Join thousands of creators who are transforming their content creation journey
                            </p>
                        </div>

                        {/* Main Container with Enhanced Depth */}
                        <div className="relative h-[500px] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl shadow-black/50">
                            {/* Globe Container */}
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm">
                                <div className="relative h-full w-full">
                                    <Globemap className="h-full w-full opacity-40" />
                                </div>
                            </div>

                            {/* Enhanced Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-950/95 to-transparent" />

                            {/* Testimonials Container with Improved Layout */}
                            <div className="absolute bottom-0 left-0 right-0 h-[400px] flex flex-col items-center justify-end gap-8 pb-12">
                                <Marquee pauseOnHover className="[--duration:65s]">
                                    {testimonials.map((review) => (
                                        <TestimonialCard key={review.name} review={review} />
                                    ))}
                                </Marquee>

                                <Marquee reverse pauseOnHover className="[--duration:65s]">
                                    {testimonials.map((review) => (
                                        <TestimonialCard key={review.name} review={review} />
                                    ))}
                                </Marquee>

                                {/* Enhanced Side Gradients */}
                                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black via-gray-950/90 to-transparent" />
                                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black via-gray-950/90 to-transparent" />
                            </div>
                        </div>
                    </div>
                </section>
                <Separator />
                <div className=" py-40 bg-black w-[85%]">
                    <div className="max-w-7xl mx-auto text-center">
                        <p className="font-bold text-xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                            Show your{" "}
                            <span className="pr-2 animate-text-gradient bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent bg-300% font-medium">
                                {"content ".split("").map((word, idx) => (
                                    <motion.span
                                        key={idx}
                                        className="inline-block"
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: idx * 0.04 }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </span>
                            to the world
                        </p>
                        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
                            Whether you're a budding artist, a comedian, or an enthusiast, <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Vibe vision</span> empowers you to craft, perform, and share <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">unforgettable content</span>. Dive into a universe of limitless possibilities, where creativity meets <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">cutting-edge technology</span>.
                        </p>
                    </div>
                    <WorldMap
                        // Optional: customize line colors
                        lineColor="#0ea5e9"
                        darkModeLineColor="#38bdf8"
                    />
                </div>
                <Separator />
                {/* FAQ Section */}
                <FAQSection faqsList={faqs} />
                <Separator />
                {/* newsletter Section */}
                <section className="py-14 w-full mx-auto ">
                    <motion.div initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="relative overflow-hidden mx-4 px-4 py-14 bg-transparent rounded-2xl border border-input  bg-page-gradient md:px-8 md:mx-8">
                        <motion.div className="relative z-10 max-w-xl mx-auto sm:text-center">
                            <motion.div variants={headerVariants} className="space-y-3">

                                <h3 className="text-3xl text-white font-bold tracking-tighter font-geist">
                                    Subscribe to our newsletter
                                </h3>
                                <hr className="w-1/2 h-[1px] mx-auto mb-5" />
                                <p className="text-gray-100 leading-relaxed">
                                    Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.
                                </p>
                            </motion.div>
                            <motion.div variants={headerVariants} className="mt-6">
                                <form
                                    onSubmit={(e) => e.preventDefault()}
                                    className="flex items-center justify-center bg-white rounded-lg p-1 sm:max-w-md sm:mx-auto ocus-within:outline-none focus-within:ring-2 focus-within:ring-gray-500">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="text-gray-500 w-full p-2 outline-none border-none active:border-none focus:outline-none focus:ring-0 focus:border-none"
                                    />
                                    <button
                                        className="p-2  rounded-lg font-medium bg-gradient-to-br from-zinc-400 to-zinc-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-white   transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-zinc-500/70  duration-150 outline-none shadow-md focus:shadow-none sm:px-4"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                                <p className="mt-5 max-w-lg text-[15px] text-gray-100 sm:mx-auto">
                                    No spam ever, we are care about the protection of your data.
                                    Read our <a className="underline" href="javascript:void(0)"> Privacy Policy </a>
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </section>
                <Separator />
            </div>
        </div>
    );
};

const features = [
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
            </svg>
        ),
        title: "Fast Refresh",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                />
            </svg>
        ),
        title: "Analytics",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
            </svg>
        ),
        title: "Datacenter security",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                />
            </svg>
        ),
        title: "Build on your terms",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
            </svg>
        ),
        title: "Safe to use",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
            </svg>
        ),
        title: "Flexible",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
];


const faqs = [
    {
        q: "How does the AI content generation work?",
        a: "Our AI-powered platform uses advanced machine learning algorithms to analyze your input and generate unique, high-quality content tailored to your needs. Whether it's music or comedy, the AI understands context and style to create engaging content.",
    },
    {
        q: "What type of content can I create?",
        a: "You can create various types of content including music tracks, comedy scripts, short videos, and live show materials. Our platform supports multiple formats and styles to suit your creative needs.",
    },
    {
        q: "How do I get started?",
        a: "Simply sign up for a free account, choose your content type, and start creating! Our intuitive interface guides you through the process, and our AI assists you at every step.",
    },
    {
        q: "Can I collaborate with other creators?",
        a: "Yes! Our platform includes collaboration features that allow you to work with other creators, share projects, and create content together in real-time.",
    },
];

const FAQSection = ({ faqsList }: { faqsList: { q: string; a: string }[] }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.2,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    return (
        <section className="relative">
            <div
                ref={ref}
                className="py-14 relative max-w-screen-xl mx-auto px-4 gap-12 md:flex md:px-8"
            >
                <div className="flex-1">
                    <div className="max-w-lg">
                        <h3 className="font-semibold text-cyan-600">
                            Frequently asked questions
                        </h3>
                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            className="mt-3 text-gray-400 text-3xl font-extrabold sm:text-4xl"
                        >
                            All information you need to know
                        </motion.p>
                        <Separator className="h-[1px] mt-5 bg-white/10" />
                    </div>
                </div>
                <div className="flex-1 mt-12 md:mt-0">
                    <ul className="space-y-4 divide-y">
                        {faqsList.map((item, idx) => (
                            <motion.li
                                key={idx}
                                custom={idx}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={cardVariants}
                                className="py-5"
                            >
                                <summary className="flex items-center justify-between font-semibold text-gray-700">
                                    {item.q}
                                </summary>
                                <p
                                    dangerouslySetInnerHTML={{ __html: item.a }}
                                    className="mt-3 text-gray-300 leading-relaxed"
                                ></p>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

function FeaturesSection1() {
    const features = [
        {
            title: "Built for developers",
            description:
                "Built for engineers, developers, dreamers, thinkers and doers.",
            icon: <IconTerminal2 />,
        },
        {
            title: "Ease of use",
            description:
                "It's as easy as using an Apple, and as expensive as buying one.",
            icon: <IconEaseInOut />,
        },
        {
            title: "Pricing like no other",
            description:
                "Our prices are best in the market. No cap, no lock, no credit card required.",
            icon: <IconCurrencyDollar />,
        },
        {
            title: "100% Uptime guarantee",
            description: "We just cannot be taken down by anyone.",
            icon: <IconCloud />,
        },
        {
            title: "Multi-tenant Architecture",
            description: "You can simply share passwords instead of buying new seats",
            icon: <IconRouteAltLeft />,
        },
        {
            title: "24/7 Customer Support",
            description:
                "We are available a 100% of the time. Atleast our AI Agents are.",
            icon: <IconHelp />,
        },
        {
            title: "Money back guarantee",
            description:
                "If you donot like EveryAI, we will convince you to like us.",
            icon: <IconAdjustmentsBolt />,
        },
        {
            title: "And everything else",
            description: "I just ran out of copy ideas. Accept my sincere apologies",
            icon: <IconHeart />,
        },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
            {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index} />
            ))}
        </div>
    );
}

const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
                (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
                index < 4 && "lg:border-b dark:border-neutral-800"
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};

function FeaturesSection2() {
    const features = [
        {
            title: "Track your content reach",
            description:
                "Track your content reach and engagement on Entertainment Hub.",
            skeleton: <SkeletonOne />,
            className:
                "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
        },
        {
            title: "Create AI content",
            description:
                "Create stunning AI content effortlessly using our advanced AI technology.",
            skeleton: <SkeletonTwo />,
            className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
        },
        {
            title: "Watch our AI content on Entertainment Hub",
            description:
                "Whether its you or Tyler Durden, you can get to watch AI content on Entertainment Hub",
            skeleton: <SkeletonThree />,
            className:
                "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
        },
        {
            title: "Upload your content",
            description:
                "With our platform, you can upload your content and other people can watch it all over the world.",
            skeleton: <SkeletonFour />,
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto h-full overflow-hidden"
        >
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="px-8"
            >
                <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
                    Packed with thousands of features
                </h4>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300"
                >
                    From Image generation to video generation, Everything AI has APIs for
                    literally everything. It can even create this website copy for you.
                </motion.p>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative"
            >
                <motion.div
                    variants={{
                        hidden: { opacity: 0, x: 0 },
                        visible: {
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 0.5,
                                ease: "easeOut"
                            }
                        }
                    }}
                    className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800 h-full">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} className={feature.className}>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                            <div className=" h-full w-full">{feature.skeleton}</div>
                        </FeatureCard>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

const FeatureCard = ({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
            {children}
        </div>
    );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
    return (
        <p className=" max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
            {children}
        </p>
    );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
    return (
        <p
            className={cn(
                "text-sm md:text-base  max-w-4xl text-left mx-auto",
                "text-neutral-500 text-center font-normal dark:text-neutral-300",
                "text-left max-w-sm mx-0 md:text-sm my-2"
            )}
        >
            {children}
        </p>
    );
};

export const SkeletonOne = () => {
    return (
        <div className="relative flex py-8 ">
            <div className="w-full  p-5  mx-auto bg-black shadow-2xl group h-full">
                <div className="flex flex-1 w-full h-full flex-col p-5">
                    {/* TODO */}
                    <Image
                        src="/linear.png"
                        alt="header"
                        width={800}
                        height={800}
                        className="object-cover object-left-top rounded-sm"
                    />
                </div>
            </div>

            <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
            <div className="absolute top-0  z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
        </div>
    );
};

export const SkeletonThree = () => {
    return (
        <Link
            href="/entertainment-hub"
            target="__blank"
            className="relative flex gap-10  h-full group/image"
        >
            <div className="w-full  mx-auto bg-transparent dark:bg-transparent group h-full py-5 px-2">
                <div className="flex flex-1 w-full h-full flex-col space-y-2  relative">
                    {/* TODO */}
                    <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto " />
                    <Image
                        src="/entertainment-hub.png"
                        alt="header"
                        width={800}
                        height={800}
                        className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
                    />
                </div>
                <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
            <div className="absolute top-0  z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
            </div>

        </Link>
    );
};

export const SkeletonTwo = () => {
    const images = [
        "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    const imageVariants = {
        whileHover: {
            scale: 1.1,
            rotate: 0,
            zIndex: 100,
        },
        whileTap: {
            scale: 1.1,
            rotate: 0,
            zIndex: 100,
        },
    };
    return (
        <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
            {/* TODO */}
            <div className="flex flex-row -ml-20">
                {images.map((image, idx) => (
                    <motion.div
                        variants={imageVariants}
                        key={"images-first" + idx}
                        style={{
                            rotate: Math.random() * 20 - 10,
                        }}
                        whileHover="whileHover"
                        whileTap="whileTap"
                        className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                    >
                        <Image
                            src={image}
                            alt="bali images"
                            width="500"
                            height="500"
                            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                        />
                    </motion.div>
                ))}
            </div>
            <div className="flex flex-row">
                {images.map((image, idx) => (
                    <motion.div
                        key={"images-second" + idx}
                        style={{
                            rotate: Math.random() * 20 - 10,
                        }}
                        variants={imageVariants}
                        whileHover="whileHover"
                        whileTap="whileTap"
                        className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                    >
                        <Image
                            src={image}
                            alt="bali images"
                            width="500"
                            height="500"
                            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                        />
                    </motion.div>
                ))}
            </div>

            <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent  h-full pointer-events-none" />
            <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black  to-transparent h-full pointer-events-none" />
        </div>
    );
};

export const SkeletonFour = () => {
    return (
        <div className="h-60 md:h-60  flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
            <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
        </div>
    );
};

export const Globe = ({ className }: { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi: 0,
            theta: 0,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],
            markers: [
                // longitude latitude
                { location: [37.7595, -122.4367], size: 0.03 },
                { location: [40.7128, -74.006], size: 0.1 },
            ],
            onRender: (state) => {
                // Called on every animation frame.
                // `state` will be an empty object, return updated params.
                state.phi = phi;
                phi += 0.01;
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
            className={className}
        />
    );
};

const tiers = [
    {
        name: "Hobby",
        id: "tier-hobby",
        href: "#",
        priceMonthly: "$49",
        description:
            "Modi dolorem expedita deleniti. Corporis iste qui inventore pariatur adipisci vitae.",
        features: [
            "5 products",
            "Up to 1,000 subscribers",
            "Basic analytics",
            "48-hour support response time",
        ],
    },
    {
        name: "Team",
        id: "tier-team",
        href: "#",
        priceMonthly: "$79",
        description:
            "Explicabo quo fugit vel facere ullam corrupti non dolores. Expedita eius sit sequi.",
        features: [
            "Unlimited products",
            "Unlimited subscribers",
            "Advanced analytics",
            "1-hour, dedicated support response time",
            "Marketing automations",
        ],
    },
    {
        name: "Team",
        id: "tier-team",
        href: "#",
        priceMonthly: "$79",
        description:
            "Explicabo quo fugit vel facere ullam corrupti non dolores. Expedita eius sit sequi.",
        features: [
            "Unlimited products",
            "Unlimited subscribers",
            "Advanced analytics",
            "1-hour, dedicated support response time",
            "Marketing automations",
        ],
    },

];

function PricingSection() {
    return (
        <div className="isolate relative overflow-hidden bg-transparent w-full">
            <div className="absolute -z-1 inset-0  h-[600px] w-full bg-transparent opacity-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-base font-semibold leading-7 text-rose-400/90 ">
                        Pricing
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl font-geist md:leading-4">
                        The right price for you,{" "}
                        <br className="hidden sm:inline lg:hidden" />
                        whoever you are
                    </p>
                </div>
                <div className="relative mt-6">
                    <p className="mx-auto max-w-2xl text-lg leading-8 text-white/60">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
                        numquam eligendi quos odit doloribus molestiae voluptatum.
                    </p>
                    <svg
                        viewBox="0 0 1208 1024"
                        className="absolute opacity-70 -top-10 left-1/2 -z-8 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
                    >
                        <ellipse
                            cx={604}
                            cy={512}
                            fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)"
                            rx={604}
                            ry={512}
                        />
                        <defs>
                            <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                                <stop stopColor="#7775D6" />
                                <stop offset={1} stopColor="#E935C1" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
            <div className="flow-root z-20 bg-transparent pb-24 sm:pb-32">
                <div className="-mt-80">
                    <div className="mx-auto max-w-full px-6 lg:px-8">
                        <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-7xl lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            {tiers.map((tier) => (
                                <div
                                    key={tier.id}
                                    className="flex z-10 flex-col justify-between rounded-3xl bg-transparent/10 p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]"
                                >
                                    <div>
                                        <h3
                                            id={tier.id}
                                            className="text-base font-semibold leading-7 text-pink-600/90"
                                        >
                                            {tier.name}
                                        </h3>
                                        <div className="mt-4 flex items-baseline gap-x-2">
                                            <span className="text-5xl font-bold tracking-tight text-gray-100">
                                                {tier.priceMonthly}
                                            </span>
                                            <span className="text-base font-semibold leading-7 text-gray-200">
                                                /month
                                            </span>
                                        </div>
                                        <p className="mt-6 text-base leading-7 text-gray-200">
                                            {tier.description}
                                        </p>
                                        <ul
                                            role="list"
                                            className="mt-10 space-y-4 text-sm leading-6 text-gray-200"
                                        >
                                            {tier.features.map((feature) => (
                                                <li key={feature} className="flex gap-x-3">
                                                    <IconCheck
                                                        className="h-6 w-5 flex-none text-pink-600/90"
                                                        aria-hidden="true"
                                                    />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <a
                                        href={tier.href}
                                        aria-describedby={tier.id}
                                        className="mt-8 block rounded-md bg-pink-600/90 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600/90"
                                    >
                                        Get started today
                                    </a>
                                </div>
                            ))}
                            <div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:col-span-3 md:col-span-2 sm:col-span-1 lg:flex-row lg:items-center  dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]">
                                <div className="lg:min-w-0 lg:flex-1">
                                    <h3 className="text-lg font-semibold leading-8 tracking-tight text-pink-600/90">
                                        Discounted
                                    </h3>
                                    <p className="mt-1 text-base leading-7 text-gray-200">
                                        Dolor dolores repudiandae doloribus. Rerum sunt aut eum.
                                        Odit omnis non voluptatem sunt eos nostrum.
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    className="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-pink-600/90 ring-1 ring-inset ring-pink-200/90 hover:ring-pink-300/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600/90"
                                >
                                    Buy discounted license <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;