import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Award, ShieldCheck, BadgeCheck } from "lucide-react";
import { Button } from "../ui/button";
import { collegeInfo, heroImage } from "../../data/mock";

export default function Hero() {
  const wa = `https://wa.me/${collegeInfo.whatsapp}?text=${encodeURIComponent(collegeInfo.whatsappMsg)}`;

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Campus" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3a0a3a]/95 via-[#5b0e5b]/85 to-[#5b0e5b]/55" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Badges */}
          <div className="space-y-2.5 mb-8 flex flex-col items-start">
            {[
              { icon: Award, text: collegeInfo.affiliations[0] },
              { icon: ShieldCheck, text: collegeInfo.affiliations[1] },
              { icon: BadgeCheck, text: collegeInfo.affiliations[2] }
            ].map((b, i) => (
              <div key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3a0a3a]/70 border border-white/10 text-white text-sm backdrop-blur-sm">
                <b.icon className="w-4 h-4 text-[#f5c518]" />
                <span>{b.text}</span>
              </div>
            ))}
          </div>

          {/* Heading */}
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Humanity Care{" "}
            <span className="text-[#f5c518]">College of Higher Studies</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200 max-w-2xl leading-relaxed">
            Discover a wide range of undergraduate, diploma and certificate programs designed to shape your career. From management and computer applications to languages and journalism — build your future with us.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/courses">
              <Button className="bg-[#f5c518] hover:bg-[#e8b923] text-[#1a1a1a] font-semibold rounded-md px-6 py-6 text-base shadow-lg hover:shadow-xl transition-all">
                Explore Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href={wa} target="_blank" rel="noreferrer">
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:text-white bg-transparent rounded-md px-6 py-6 text-base">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-2xl">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#f5c518]" style={{ fontFamily: "'Playfair Display', serif" }}>100%</div>
              <div className="text-gray-300 text-sm mt-1">Placement Assistance</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#f5c518]" style={{ fontFamily: "'Playfair Display', serif" }}>1000+</div>
              <div className="text-gray-300 text-sm mt-1">Students Enrolled</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#f5c518]" style={{ fontFamily: "'Playfair Display', serif" }}>Since 2012</div>
              <div className="text-gray-300 text-sm mt-1">Empowering Students</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
