"use client";
import { motion } from "framer-motion";
import { ImagesSlider } from "./UI/ImagesSlider";

export function ImagesSliderDemo() {
  const images = [
    "https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/2024-05/diabetes.jpg.webp?itok=ExsvoX-z",
    "https://www.shieldhealthcare.com/community/wp-content/uploads/2021/03/GettyImages-1280587810-900x600-1-768x512.png",
    "https://news.america-digital.com/wp-content/uploads/2020/02/Microsoft-anuncia-lanzamiento-del-programa-%E2%80%9CAI-for-Health%E2%80%9D-basado-en-Inteligencia-Artificial.jpg.webp",
  ];
  return (
    <ImagesSlider className="md:h-full md: w-full h-[40rem] p-8" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-4xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Tu salud es nuestra  <br/> prioridad
        </motion.p>
      </motion.div>
    </ImagesSlider>
  );
}
