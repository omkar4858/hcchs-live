import React from "react";
import { Link } from "react-router-dom";
import { Clock, BookOpen, GraduationCap, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { courses } from "../data/mock";

export default function Courses() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative bg-gradient-to-br from-[#3a0a3a] via-[#5b0e5b] to-[#7a1a7a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-[#f5c518]/20 text-[#f5c518] text-xs font-semibold tracking-wider uppercase mb-3">
            Our Programs
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Programs for Your Future Career
          </h1>
          <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
            Choose from our professionally designed undergraduate, diploma and certificate programs.
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-20 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map((c) => (
              <div
                key={c.code}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#5b0e5b] to-[#7a1a7a] flex items-center justify-center text-white font-bold shadow-md flex-shrink-0" style={{ fontFamily: "'Playfair Display', serif" }}>
                    <span className="text-base">{c.code}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#1a1a1a] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {c.name}
                    </h3>
                    <p className="text-sm text-[#5b0e5b] font-medium mt-1">{c.type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5 p-4 rounded-xl bg-[#faf7f2]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#5b0e5b]" />
                    <div>
                      <div className="text-xs text-gray-500">Duration</div>
                      <div className="text-sm font-semibold text-[#1a1a1a]">{c.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#5b0e5b]" />
                    <div>
                      <div className="text-xs text-gray-500">Eligibility</div>
                      <div className="text-sm font-semibold text-[#1a1a1a]">{c.eligibility}</div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mt-4 leading-relaxed">{c.description}</p>

                <div className="mt-4 space-y-1.5">
                  {c.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#f5c518] flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <Link to="/apply" state={{ course: c.code }}>
                  <Button className="mt-6 w-full bg-[#5b0e5b] hover:bg-[#7a1a7a] text-white rounded-md">
                    Apply for {c.code}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
