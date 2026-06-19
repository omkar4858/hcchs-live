import React from "react";
import { Target, Eye, Award, Users, GraduationCap, Heart } from "lucide-react";
import { collegeInfo } from "../data/mock";

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#3a0a3a] via-[#5b0e5b] to-[#7a1a7a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-[#f5c518]/20 text-[#f5c518] text-xs font-semibold tracking-wider uppercase mb-3">
            About Us
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Building the Future of Higher Education
          </h1>
          <p className="mt-5 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {collegeInfo.name} is dedicated to nurturing well-rounded graduates by providing quality higher education across business, technology, languages and traditional studies.
          </p>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="py-20 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="w-14 h-14 rounded-xl bg-[#f5c518]/20 flex items-center justify-center mb-5">
              <Target className="w-7 h-7 text-[#5b0e5b]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide accessible, high-quality higher education that empowers students with the knowledge, skills and values necessary to excel in their chosen careers and contribute meaningfully to society. We bridge tradition with innovation.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="w-14 h-14 rounded-xl bg-[#f5c518]/20 flex items-center justify-center mb-5">
              <Eye className="w-7 h-7 text-[#5b0e5b]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be recognized as a leading institution in Bihar offering diverse programs in higher studies — from BBA, BCA and BJMC to specialized programs in library science, languages and accountancy — producing leaders ready for global challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1 rounded-full bg-[#5b0e5b]/10 text-[#5b0e5b] text-xs font-semibold tracking-wider uppercase mb-3">
              Our Values
            </div>
            <h2 className="text-4xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Excellence", desc: "Commitment to academic rigor and continuous improvement." },
              { icon: Heart, title: "Integrity", desc: "Honesty, transparency and ethical practice in everything we do." },
              { icon: Users, title: "Inclusivity", desc: "A welcoming community valuing every student's voice." },
              { icon: GraduationCap, title: "Innovation", desc: "Embracing modern pedagogy while honoring tradition." }
            ].map((v) => (
              <div key={v.title} className="text-center bg-[#faf7f2] rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 mx-auto rounded-xl bg-[#f5c518]/20 flex items-center justify-center mb-4">
                  <v.icon className="w-7 h-7 text-[#5b0e5b]" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{v.title}</h3>
                <p className="text-sm text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
