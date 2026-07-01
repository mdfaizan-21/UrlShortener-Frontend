import React from "react";
import { motion } from "framer-motion";
const Card = ({ title, desc }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bento-card flex flex-col gap-4"
        >
            <h3 className="text-white text-lg font-semibold tracking-tight">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed"> {desc}</p>
        </motion.div>
    );
};

export default Card;