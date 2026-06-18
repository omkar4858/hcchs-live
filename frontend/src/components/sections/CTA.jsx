import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { collegeInfo } from "../../data/mock";

export default function CTA() {
  const wa = `https://wa.me/${collegeInfo.whatsapp}?text=${encodeURIComponent(collegeInfo.whatsappMsg)}`;
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#3a0a3a] via-[#5b0e5b] to-[#7a1a7a]" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #f5c518 0%, transparent 40%)" }} />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block px-4 py-1 rounded-full bg-[#f5c518]/20 text-[#f5c518] text-xs font-semibold tracking-wider uppercase mb-4">
          Admissions Open
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
          Ready to Start Your Journey in Higher Studies?
        </h2>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
          Join hundreds of students who have launched successful careers across business, technology, journalism and languages. Admissions are now open for the upcoming session.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/apply">
            <Button className="bg-[#f5c518] hover:bg-[#e8b923] text-[#1a1a1a] font-semibold rounded-md px-7 py-6 text-base shadow-lg hover:shadow-xl transition-all">
              Apply Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <a href={wa} target="_blank" rel="noreferrer">
            <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:text-white bg-transparent rounded-md px-7 py-6 text-base">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>
          </a>
          <a href={`tel:${collegeInfo.phone1}`}>
            <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:text-white bg-transparent rounded-md px-7 py-6 text-base">
              <Phone className="w-5 h-5 mr-2" />
              Call: {collegeInfo.phone1}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
