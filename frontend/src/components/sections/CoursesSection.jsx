import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Button } from "../ui/button";
import { courses } from "../../data/mock";

export default function CoursesSection() {
  const featured = courses.slice(0, 4);
  return (
    <section className="py-20 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-1 rounded-full bg-[#f5c518]/15 text-[#5b0e5b] text-xs font-semibold tracking-wider uppercase mb-3">
            Our Programs
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Featured Courses
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of undergraduate, diploma and certificate programs designed for tomorrow's leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((c) => (
            <div
              key={c.code}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#5b0e5b]/30 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#5b0e5b] to-[#7a1a7a] flex items-center justify-center text-white font-bold text-xl mb-4 shadow-md" style={{ fontFamily: "'Playfair Display', serif" }}>
                {c.code}
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                {c.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{c.type}</p>
              <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-4">
                <div className="flex items-center gap-1.5 text-gray-700">
                  <Clock className="w-4 h-4 text-[#5b0e5b]" />
                  <span>{c.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-700">
                  <BookOpen className="w-4 h-4 text-[#5b0e5b]" />
                  <span>{c.mode}</span>
                </div>
              </div>
              <Link
                to="/courses"
                className="mt-5 inline-flex items-center text-[#5b0e5b] font-semibold text-sm hover:gap-2 gap-1.5 transition-all"
              >
                Course Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/courses">
            <Button className="bg-[#5b0e5b] hover:bg-[#7a1a7a] text-white px-7 py-6 rounded-md text-base shadow-md hover:shadow-lg">
              View All Courses
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
