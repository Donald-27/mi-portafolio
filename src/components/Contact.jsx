'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaFacebookF
} from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showModal, setShowModal] = useState(false);

  const { name, email, message } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildMessage = () =>
    `Hi Kiprop, I’m ${name}. My email is ${email}. Here's my message: ${message}`;

  return (
    <section id="contact" className="bg-[#0d0d0d] text-white py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-purple-400 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Let’s Work Together
        </motion.h2>

        <motion.p
          className="text-gray-400 text-lg mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Got a project, idea, or collaboration? Let’s make it happen.
        </motion.p>

        {/* Contact Form */}
        <div className="space-y-4 mb-10 max-w-md mx-auto">
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-md bg-[#1a1a1a] border border-purple-700 text-white"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-md bg-[#1a1a1a] border border-purple-700 text-white"
          />
          <textarea
            name="message"
            value={message}
            onChange={handleChange}
            rows="5"
            placeholder="Your Message"
            required
            className="w-full p-3 rounded-md bg-[#1a1a1a] border border-purple-700 text-white"
          ></textarea>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-semibold w-full"
          >
            Send Message
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] text-white rounded-xl p-6 w-full max-w-sm border border-purple-800 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Choose how to send</h3>
              <div className="flex flex-col gap-4">
                <a
                  href={`sms:+254724779523?body=${encodeURIComponent(buildMessage())}`}
                  className="flex items-center gap-3 bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-full justify-center"
                >
                  <FaPhoneAlt /> Send via SMS
                </a>
                <a
                  href={`https://wa.me/254724779523?text=${encodeURIComponent(buildMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full justify-center"
                >
                  <FaWhatsapp /> Send via WhatsApp
                </a>
                <a
                  href={`mailto:kipropdonald27@gmail.com?subject=Contact from Portfolio&body=${encodeURIComponent(
                    buildMessage()
                  )}`}
                  className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full justify-center"
                >
                  <FaEnvelope /> Send via Email
                </a>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 text-sm text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-6 text-3xl mt-12">
          <a
            href="https://github.com/Donald-27"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-500 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/kiprop-donald-56b898352"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-500 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:kipropdonald27@gmail.com"
            className="hover:text-purple-500 transition"
          >
            <FaEnvelope />
          </a>
          <a
            href="#"
            className="hover:text-purple-500 transition"
            title="Facebook"
          >
            <FaFacebookF />
          </a>
        </div>
      </div>
    </section>
  );
}
