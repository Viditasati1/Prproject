import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#D2B48C] text-[#333333] py-10">
      <div className="container mx-auto px-6 sm:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold">Rise Up</h2>
          <p className="text-sm mt-2 text-[#666666]">
            Break the barriers and reclaim your confidence.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          <a href="#about" className="text-[#666666] hover:text-[#8B5E3C] transition-colors duration-300">
            About Us
          </a>
          <a href="#services" className="text-[#666666] hover:text-[#8B5E3C] transition-colors duration-300">
            Services
          </a>
          <a href="#contact" className="text-[#666666] hover:text-[#8B5E3C] transition-colors duration-300">
            Contact
          </a>
          <a href="#faq" className="text-[#666666] hover:text-[#8B5E3C] transition-colors duration-300">
            FAQ
          </a>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666666] hover:text-[#8B5E3C] transition-colors duration-300"
          >
            <i className="fab fa-facebook-f"></i> {/* Replace with icon */}
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666666] hover:text-[#8B5E3C] transition-colors duration-300"
          >
            <i className="fab fa-twitter"></i> {/* Replace with icon */}
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666666] hover:text-[#8B5E3C] transition-colors duration-300"
          >
            <i className="fab fa-instagram"></i> {/* Replace with icon */}
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666666] hover:text-[#8B5E3C] transition-colors duration-300"
          >
            <i className="fab fa-linkedin-in"></i> {/* Replace with icon */}
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center text-sm text-[#666666]">
        <p>&copy; {new Date().getFullYear()} Rise Up. All rights reserved.</p>
        <p>
          <a
            href="/privacy-policy"
            className="hover:text-[#8B5E3C] transition-colors duration-300"
          >
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="/terms-of-service"
            className="hover:text-[#8B5E3C] transition-colors duration-300"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;