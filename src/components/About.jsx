import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Main section animation
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );

      // Parallax effect for background elements
      gsap.to(".parallax-bg", {
        y: (i, el) => -ScrollTrigger.maxScroll(window) * el.dataset.speed,
        ease: "none",
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Features stagger animation
      gsap.fromTo(
        ".feature-item",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        }
      );

      // Team members stagger animation
      gsap.fromTo(
        ".team-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          duration: 0.8,
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  // Team member data
  const teamMembers = [
    {
      name: "Atanu Saha",
      role: "FrontEnd Developer",
      specialty: "Frontend Architecture",
    },
    {
      name: "Shreyas Saha",
      role: "Full-Stack Developer",
      specialty: "ReactJS,Firebase,API Integration"
    },
    {
      name: "Aninda Debta",
      role: "UI/UX Designer",
      specialty: "User Experience",
    },
  ];

  // Features data
  const features = [
    "Secure online ordering",
    "Instant order confirmation",
    "Fast pick-up experience",
  ];

  return (
    <section
      id="about" // Added ID here for navigation linking
      ref={aboutRef}
      className="relative py-24 text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="parallax-bg absolute top-10 left-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl" data-speed="0.2"></div>
        <div className="parallax-bg absolute bottom-10 right-1/4 w-96 h-96 bg-pink-500 rounded-full opacity-20 blur-3xl" data-speed="0.3"></div>
        <div className="parallax-bg absolute top-1/2 right-10 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl" data-speed="0.1"></div>
        <div className="absolute w-full h-full opacity-30">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1.5, type: "spring" }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mx-auto">
              <span className="text-3xl">🍽️</span>
            </div>
          </motion.div>
          <motion.h2
            className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            About Us
          </motion.h2>
          <motion.p
            className="text-xl mb-12 max-w-2xl mx-auto text-gray-300 leading-relaxed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Welcome to our online food ordering platform! We provide a seamless experience,
            allowing you to place orders effortlessly and pick them up hassle-free.
          </motion.p>
        </motion.div>

        {/* Team Section */}
        <div ref={teamRef} className="mb-16">
          <motion.h3
            className="text-3xl font-bold mb-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
              Meet Our Team
            </span>
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="team-card w-64 text-center p-6 rounded-xl bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(255, 121, 198, 0.2)"
                }}
              >
                <div className="w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-3xl">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl text-black font-semibold mt-4">{member.name}</h3>
                <p className="text-pink-400 font-medium">{member.role}</p>
                <p className="text-gray-400 text-sm mt-2">{member.specialty}</p>
                <div className="mt-4 flex justify-center space-x-3">
                  <button className="w-8 h-8 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all">
                    <span className="text-sm">in</span>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all">
                    <span className="text-sm">@</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Section - Modified to match original structure */}
        <motion.div
          ref={featuresRef}
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
              Our Features
            </span>
          </h3>
          <ul className="flex flex-col items-center text-lg space-y-4 text-gray-300">
            {features.map((feature, i) => (
              <motion.li
                key={i}
                className="feature-item transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.1, color: "#ff79c6" }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-pink-400 mr-2 text-xl">✅</span> {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default About;