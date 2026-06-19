import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Logo from "./Logo";
import { collegeInfo } from "../data/mock";

export default function Footer() {
  return (
    <footer className="bg-[#2a0a2a] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo className="w-12 h-12" />
              <div>
                <div className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {collegeInfo.shortName}
                </div>
                <div className="text-xs text-gray-400">{collegeInfo.tagline}</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Empowering students through quality higher education across diverse disciplines since {collegeInfo.established}.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-[#f5c518] transition-colors">Home</Link></li>
              <li><Link to="/courses" className="hover:text-[#f5c518] transition-colors">Courses</Link></li>
              <li><Link to="/about" className="hover:text-[#f5c518] transition-colors">About Us</Link></li>
              <li><Link to="/gallery" className="hover:text-[#f5c518] transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-[#f5c518] transition-colors">Contact</Link></li>
              <li><Link to="/apply" className="hover:text-[#f5c518] transition-colors">Apply Now</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-sm">
              <li>BBA - Business Administration</li>
              <li>BCA - Computer Applications</li>
              <li>BJMC - Journalism</li>
              <li>BLIS - Library Science</li>
              <li>Diploma in Oriental Librarianship</li>
              <li>Functional Arabic & Persian</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 text-[#f5c518] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">{collegeInfo.address}</span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 text-[#f5c518] flex-shrink-0" />
                <a href={`tel:${collegeInfo.phone1}`} className="hover:text-[#f5c518] transition-colors">{collegeInfo.phone1}</a>
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 text-[#f5c518] flex-shrink-0" />
                <a href={`mailto:${collegeInfo.displayEmail}`} className="hover:text-[#f5c518] transition-colors">{collegeInfo.displayEmail}</a>
              </li>
              <li className="flex gap-2">
                <Clock className="w-4 h-4 text-[#f5c518] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">{collegeInfo.officeHours.weekdays}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {collegeInfo.name}. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Sister institute of <a href="https://hcnpc.in" target="_blank" rel="noreferrer" className="text-[#f5c518] hover:underline">Humanity Care Nursing & Paramedical College</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
