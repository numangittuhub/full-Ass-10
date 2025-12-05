import { useState } from "react";

const slides = [
  {
    title: "Report Garbage & Clean Your Area",
    desc: "Help us keep the city clean by reporting issues instantly",
    img: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200"
  },
  {
    title: "Community Cleanup Drives",
    desc: "Join hands with neighbors for a cleaner tomorrow",
    img: "https://images.unsplash.com/photo-1582213782179-8572a8a9c4e6?w=1200"
  },
  {
    title: "Together We Can Make a Difference",
    desc: "Every report counts. Every contribution matters.",
    img: "https://images.unsplash.com/photo-1593113646773-028c26a2a1f4?w=1200"
  }
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative h-96 md:h-screen overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <img src={slide.img} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
              <p className="text-lg md:text-2xl">{slide.desc}</p>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full"
      >❮</button>
      <button
        onClick={() => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full"
      >❯</button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition ${i === current ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}