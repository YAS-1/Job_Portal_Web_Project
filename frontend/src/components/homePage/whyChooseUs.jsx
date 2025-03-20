import { motion } from "framer-motion";
import { FaBriefcase, FaUserTie, FaGlobe, FaHeadset, FaLightbulb, FaShieldAlt } from "react-icons/fa";

const reasons = [
  { icon: <FaBriefcase />, title: "Vast Job Listings", desc: "Access thousands of job opportunities tailored to your skills and experience." },
  { icon: <FaUserTie />, title: "Expert Guidance", desc: "Get career advice and tips from industry professionals." },
  { icon: <FaGlobe />, title: "Global Reach", desc: "Find job opportunities in multiple countries with ease." },
  { icon: <FaHeadset />, title: "24/7 Support", desc: "We provide round-the-clock assistance for all your job search needs." },
  { icon: <FaLightbulb />, title: "Career Insights", desc: "Stay updated with the latest trends and market demands." },
  { icon: <FaShieldAlt />, title: "Secure & Reliable", desc: "Your data and job applications are protected with top security." },
];

export default function WhyChooseUs() {
  const centerIndex = Math.floor(reasons.length / 2);

  return (
    <div className="w-full flex flex-col items-center justify-center py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Why Choose <span className="text-[#4071ed]">JobFern</span>?
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 px-6 max-w-5xl">
        {reasons.map((reason, index) => {
          const distanceFromCenter = Math.abs(centerIndex - index);
          const delay = distanceFromCenter * 0.2; // More distance = longer delay

          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
            >
              <div className="text-[#4071ed] text-4xl mb-3 mx-auto">{reason.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{reason.title}</h3>
              <p className="text-gray-600 mt-2">{reason.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
