import React from "react";

/**
 * Humanity Care logo bug.
 * `size` controls the tailwind sizing; pass full classes via className.
 */
export default function Logo({ className = "w-11 h-11", rounded = "rounded-xl" }) {
  return (
    <div
      className={`${className} ${rounded} overflow-hidden bg-[#3a0a3a] flex items-center justify-center shadow-md`}
    >
      <img
        src="/logo.png"
        alt="Humanity Care College of Higher Studies"
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  );
}
