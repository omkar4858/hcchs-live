import React from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { collegeInfo } from "../data/mock";

export default function Contact() {
  const wa = `https://wa.me/${collegeInfo.whatsapp}?text=${encodeURIComponent(collegeInfo.whatsappMsg)}`;
  return (
    <>
      <section className="relative bg-gradient-to-br from-[#3a0a3a] via-[#5b0e5b] to-[#7a1a7a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-[#f5c518]/20 text-[#f5c518] text-xs font-semibold tracking-wider uppercase mb-3">
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Contact Us
          </h1>
          <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
            Have questions about admissions or our courses? We're here to help you start your journey.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cards */}
          <div className="space-y-5">
            {[
              { icon: MapPin, title: "Address", body: collegeInfo.address, link: collegeInfo.mapUrl, linkText: "View on Map" },
              { icon: Phone, title: "Phone", body: `${collegeInfo.phone1}  |  ${collegeInfo.phone2}`, link: `tel:${collegeInfo.phone1}`, linkText: "Call now" },
              { icon: Mail, title: "Email", body: collegeInfo.displayEmail, link: `mailto:${collegeInfo.displayEmail}`, linkText: "Send email" },
              { icon: Clock, title: "Office Hours", body: `${collegeInfo.officeHours.weekdays}\n${collegeInfo.officeHours.sunday}` }
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-5">
                <div className="w-14 h-14 rounded-xl bg-[#f5c518]/20 flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-7 h-7 text-[#5b0e5b]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>{c.title}</h3>
                  <p className="text-gray-600 mt-1 whitespace-pre-line">{c.body}</p>
                  {c.link && (
                    <a href={c.link} target="_blank" rel="noreferrer" className="text-[#5b0e5b] font-semibold text-sm mt-2 inline-block hover:underline">
                      {c.linkText}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp + Map */}
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-[#5b0e5b] to-[#7a1a7a] rounded-2xl p-8 text-white">
              <div className="w-14 h-14 rounded-xl bg-[#25D366] flex items-center justify-center mb-5">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>WhatsApp Support</h3>
              <p className="text-gray-200 mb-5">Get instant answers to your admission queries.</p>
              <a href={wa} target="_blank" rel="noreferrer">
                <Button className="bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-md">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Visit Our Campus</h3>
              <div className="rounded-xl overflow-hidden">
                <iframe
                  title="Campus Map"
                  src="https://www.google.com/maps?q=Ramdayalu+Nagar+Bhikanpur+Dih+Hajipur+Road+Muzaffarpur+Bihar+842002&output=embed"
                  width="100%"
                  height="260"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
