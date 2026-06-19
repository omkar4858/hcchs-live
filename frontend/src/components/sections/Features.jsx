import React from "react";
import { Users, Building2, Briefcase, BookOpenCheck, Award, Sparkles } from "lucide-react";
import { features } from "../../data/mock";

const icons = [Users, Building2, Briefcase, BookOpenCheck, Award, Sparkles];

export default function Features() {
  return (
    <section className="py-20 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-1 rounded-full bg-[#5b0e5b]/10 text-[#5b0e5b] text-xs font-semibold tracking-wider uppercase mb-3">
            Why Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Excellence in Higher Education
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We provide the best educational experience with modern facilities and dedicated faculty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = icons[i];
            return (
              <div
                key={f.title}
                className="group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#f5c518]/15 flex items-center justify-center mb-5 group-hover:bg-[#f5c518]/25 transition-colors">
                  <Icon className="w-7 h-7 text-[#5b0e5b]" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{f.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
