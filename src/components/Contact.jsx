import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "./hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_xosklvf",
        "template_kfccsn9",
        {
          from_name: form.name,
          to_name: "DivyTech",
          from_email: form.email,
          to_email: "divyehshivdasswarge@gmail.com",
          message: form.message,
        },
        "jS9PFFWBBQIjcVqR8"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden bg-[#F0E6D2] from-[#F0E6D2] to-[#D2B48C] bg-gradient-to-b py-10">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-[#D2B48C] p-8 rounded-2xl"
      >
        <p className={`${styles.sectionSubText} text-[#8B5E3C]`}>Get in touch</p>
        <h3 className={`${styles.sectionHeadText} text-[#333333]`}>Contact.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-[#333333] font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="bg-[#EAE0D5] py-4 px-6 placeholder:text-secondary text-[#333333] rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-[#333333] font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-[#EAE0D5] py-4 px-6 placeholder:text-secondary text-[#333333] rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-[#333333] font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-[#EAE0D5] py-4 px-6 placeholder:text-secondary text-[#333333] rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-[#8B5E3C] py-3 px-8 rounded-xl outline-none w-fit text-[#F5F5DC] font-bold shadow-md shadow-primary hover:bg-[#A67C52] transition-colors duration-300"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
