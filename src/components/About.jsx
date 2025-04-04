import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant, staggerContainer } from '../utils/motion';
import { SectionWrapper } from './hoc';

const ServiceCard = ({ index, title, description }) => (
  <Tilt className="xs:w-[250px] w-full" options={{ max: 20, scale: 1.05, speed: 400 }}>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full p-[2px] rounded-[20px] bg-gradient-to-br from-[#E4DCCF] to-[#D8B384] border border-[#A67B5B] shadow-sm"
    >
      <div className="rounded-[20px] py-5 px-8 min-h-[280px] flex flex-col justify-evenly items-center text-center bg-[#F5EFE6]">
        <h3 className="text-[#5E4B2F] text-[20px] font-bold">{title}</h3>
        <p className="text-[#8C6A45] text-[17px] leading-[24px]">{description}</p>
      </div>
    </motion.div>
  </Tilt>
);



const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-[#2B1D0E] text-[17px] max-w-3xl leading-[30px]"
      >
        “Rise Up is your companion in breaking the barriers of anxiety and becoming the best version of yourself. From personalized assessments to engaging therapy modules, we empower you to take charge of your journey.”
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
export { styles, staggerContainer, SectionWrapper };