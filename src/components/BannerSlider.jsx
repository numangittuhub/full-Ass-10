// src/components/BannerSlider.jsx
import { useState, useEffect } from "react";

const slides = [
  {
    title: "Report Garbage & Keep Your Area Clean",
    desc: "Every report brings us one step closer to a cleaner community",
    img: "https://scontent.fdac34-1.fna.fbcdn.net/v/t39.30808-6/595071076_834000292735392_3430262909875483639_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEGBQNVvB7f4qJ619C3RL-zzD9Mx6bBQJvMP0zHpsFAm9BY1eVbNYaARsa-MbuzIUJ9J1_pxXVH02Bye8fhmS7H&_nc_ohc=x6qHWGqxsEMQ7kNvwHclc1f&_nc_oc=AdlNmVQ8F-5bl70d5zmckU67hFLlcbbWKsMaXunH3TpeHgmaiBV9QVwbax02flupgT_kxMFVfSSeUxGt587BBcPY&_nc_zt=23&_nc_ht=scontent.fdac34-1.fna&_nc_gid=NkQDizkwhjNRrLArYj7ssw&oh=00_Afm_NCs4_Q66Ttl2Gwx9IgrxKgB_nOIxIz2bCnuWDbJq6Q&oe=693C2FE3"
  },
  {
    title: "Join Community Cleanup Drives",
    desc: "Together we can make our neighborhood beautiful and green",
    img: "https://scontent.fdac34-1.fna.fbcdn.net/v/t39.30808-6/595079351_834000306068724_5209877710898674416_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEr8m6JJq_ERGBLaWe8-wE91jAnnM9SqwLWMCecz1KrArT1l8uJEYCHuATjydcD08-_LzaAjs_WpD-UefjFWGDK&_nc_ohc=0rN6JjuVfn0Q7kNvwED6jeg&_nc_oc=AdlT6RlELSpf_OlXuqK24884UzR97cPZXuYL_gTxvD0S11AYR1SmVoBTwbJK30qFdGyObbLpf0RQx7XQ6wcAnysI&_nc_zt=23&_nc_ht=scontent.fdac34-1.fna&_nc_gid=NkQDizkwhjNRrLArYj7ssw&oh=00_AfnqZjriuy6F6aH6bGVX2TFErG_1elPeDtfUdzTV-k6H-g&oe=693C491F"
  },
  {
    title: "Be the Change You Want to See",
    desc: "Your contribution matters — Let's build a cleaner tomorrow!",
    img: "https://scontent.fdac34-2.fna.fbcdn.net/v/t39.30808-6/595123745_834000059402082_1342650628119756362_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeER3cE_t1LC9GrGUn7BPvxwWf0R0kxnKzFZ_RHSTGcrMQnf3v27UQCjsJlF2AQ_1i8ZZdSO_NM3sH2NbCk72MfU&_nc_ohc=RpGiqZB5yHsQ7kNvwFUFWfp&_nc_oc=AdlsbH6PEcqLMXikUaVACbaFm8r8e3rrGXz08PMrMNqsJQ6jKgHGq0R4th6GFzcgc6liIHi7wMrCNliAyZLCD2Br&_nc_zt=23&_nc_ht=scontent.fdac34-2.fna&_nc_gid=NkQDizkwhjNRrLArYj7ssw&oh=00_Afm9-8uB9_FkkgZyUr81nOABn30geBNLT280QrZJ1vP12w&oe=693C4A2F"
  }
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  // Auto Slide - প্রতি 1.7 সেকেন্ড পর পর
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); // ১.৭ সেকেন্ড

    return () => clearInterval(interval); // ক্লিনআপ
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative h-96 md:h-screen overflow-hidden bg-black">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-center">
            <div className="text-center text-white px-6 max-w-5xl animate-fadeIn">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
                {slide.title}
              </h1>
              <p className="text-lg md:text-2xl lg:text-3xl font-medium drop-shadow-lg">
                {slide.desc}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Manual Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-4 rounded-full transition z-10"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-4 rounded-full transition z-10"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-12" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}