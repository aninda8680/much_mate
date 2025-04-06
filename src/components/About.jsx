import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const teamRef = useRef(null);
  const meteorRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Main section animation
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );

      // Features stagger animation
      gsap.fromTo(
        ".feature-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
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

      // Create meteors
      const createMeteor = () => {
        if (!meteorRef.current) return;

        const meteor = document.createElement("div");
        meteor.className = "meteor";

        // Random position and size
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * window.innerWidth;
        const posY = (Math.random() * window.innerHeight) / 2;
        const duration = Math.random() * 1 + 0.8;

        meteor.style.width = `${size}px`;
        meteor.style.height = `${size * 15}px`;
        meteor.style.left = `${posX}px`;
        meteor.style.top = `${posY}px`;

        meteorRef.current.appendChild(meteor);

        gsap.to(meteor, {
          x: -300,
          y: 300,
          opacity: 0,
          duration: duration,
          ease: "none",
          onComplete: () => {
            meteor.remove();
          },
        });
      };

      // Add meteors periodically
      const meteorInterval = setInterval(createMeteor, 400);

      return () => clearInterval(meteorInterval);
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
      specialty: "ReactJS,Firebase,API Integration",
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
      id="about"
      ref={aboutRef}
      className="relative py-16 md:py-24 text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #000000 30%, #ff6b00 300%)",
      }}
    >
      {/* Meteor shower container */}
      <div
        ref={meteorRef}
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      ></div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-0"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 md:mb-20"
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
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-500 flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30">
              <span className="text-2xl md:text-3xl">🍽️</span>
            </div>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-orange-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            About Us
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto text-gray-300 leading-relaxed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Welcome to our online food ordering platform! We provide a seamless
            experience, allowing you to place orders effortlessly and pick them
            up hassle-free.
          </motion.p>
        </motion.div>

        {/* Features Section - Compact Version */}
        <motion.div
          ref={featuresRef}
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-orange-500">
            Our Features
          </h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="feature-item w-full sm:w-auto px-4 py-3 bg-black/40 backdrop-blur-sm rounded-lg border border-orange-500/20 shadow-lg shadow-orange-600/10 flex items-center"
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(249, 115, 22, 0.4)",
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-orange-500 mr-2 text-lg">→</span>
                <span className="text-gray-200">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <div ref={teamRef} className="mb-12 md:mb-16">
          <motion.h3
            className="text-2xl md:text-3xl font-bold mb-8 text-center text-orange-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="team-card w-full sm:w-64 text-center p-6 rounded-xl bg-black/50 backdrop-blur-sm border border-orange-500/30 shadow-lg shadow-orange-600/5"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(249, 115, 22, 0.2)",
                }}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-2xl md:text-3xl text-white shadow-inner">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl text-white font-semibold mt-4">
                  {member.name}
                </h3>
                <p className="text-orange-400 font-medium">{member.role}</p>
                <p className="text-gray-400 text-sm mt-2">{member.specialty}</p>
                <div className="mt-4 flex justify-center space-x-3">
                  <button className="w-8 h-8 rounded-full bg-orange-500 bg-opacity-10 hover:bg-opacity-30 flex items-center justify-center transition-all">
                    <span className="text-sm">in</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for meteor effect */}
      <style jsx>{`
        .meteor {
          position: absolute;
          background: linear-gradient(white, transparent);
          transform: rotate(45deg);
          border-radius: 50% 0 0 0;
          opacity: 0.8;
          filter: blur(1px);
          z-index: 1;
        }
      `}</style>
    </section>
  );
};

export default About;
