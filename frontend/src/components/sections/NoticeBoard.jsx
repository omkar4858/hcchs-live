import React from "react";
import { Bell, AlertCircle } from "lucide-react";
import { notices } from "../../data/mock";

export default function NoticeBoard() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#5b0e5b]/10 text-[#5b0e5b] text-xs font-semibold tracking-wider uppercase mb-3">
            <Bell className="w-3.5 h-3.5" />
            Important Notices
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Latest Updates & Announcements
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {notices.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-4 p-5 rounded-xl bg-[#faf7f2] border-l-4 border-[#5b0e5b] hover:bg-[#f5efe5] transition-colors"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${n.urgent ? "bg-[#f5c518]" : "bg-[#5b0e5b]/10"}`}>
                {n.urgent ? (
                  <AlertCircle className="w-5 h-5 text-[#5b0e5b]" />
                ) : (
                  <Bell className="w-5 h-5 text-[#5b0e5b]" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[#1a1a1a]">{n.title}</h4>
                <p className="text-sm text-gray-500 mt-0.5">{n.date}</p>
              </div>
              {n.urgent && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#f5c518] text-[#5b0e5b]">
                  Urgent
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
