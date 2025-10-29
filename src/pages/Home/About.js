import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function About() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData;
  const { skills, lottieURL, description1, description2 } = about;

  return (
    <div className="w-full py-10">
      <SectionTitle title="About" />

      {/* About Content */}
      <div className="flex w-full items-center justify-between gap-10 sm:flex-col">
        {/* Lottie Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-[70vh] w-1/2 sm:w-full flex justify-center items-center"
        >
          <dotlottie-player
            src={lottieURL}
            background="transparent"
            speed="1"
            loop
            autoplay
            className="w-[80%] sm:w-[90%]"
          ></dotlottie-player>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 w-1/2 sm:w-full text-white text-lg leading-relaxed"
        >
          <p className="opacity-90">{description1 || ""}</p>
          <p className="opacity-90">{description2 || ""}</p>

          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05 }}
            className="mt-3 inline-block text-tertiary border border-tertiary px-5 py-2 rounded-xl hover:bg-tertiary hover:text-black transition-all duration-300 w-fit"
          >
            View My Projects
          </motion.a>
        </motion.div>
      </div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="py-10 mt-10 bg-[#0a0a0a]/50 rounded-2xl shadow-md"
      >
        <h1 className="text-tertiary text-2xl font-semibold text-center mb-8">
          Here are a few technologies I've been working with recently:
        </h1>

        <div className="flex flex-wrap gap-6 justify-center">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 1 }}
              className="border border-tertiary py-3 px-8 rounded-xl cursor-default hover:bg-tertiary hover:text-black transition-all duration-300 shadow-sm"
            >
              <h1 className="text-tertiary hover:text-black font-medium tracking-wide">
                {skill}
              </h1>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default About;
