import { useState, useEffect } from "react";

const images = [
  "/images/france-1.jpg",
  "/images/benin-1.jpg",
  "/images/benin-2.jpg"
];

export default function BackgroundCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // change toutes les 5 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
    </div>
  );
}
