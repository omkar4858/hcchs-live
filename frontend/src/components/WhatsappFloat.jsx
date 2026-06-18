import React from "react";
import { MessageCircle } from "lucide-react";
import { collegeInfo } from "../data/mock";

export default function WhatsappFloat() {
  const link = `https://wa.me/${collegeInfo.whatsapp}?text=${encodeURIComponent(collegeInfo.whatsappMsg)}`;
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
