import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import Logo from "./Logo";
import { collegeInfo } from "../data/mock";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "About Us", path: "/about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" }
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <Logo className="w-12 h-12" />
            <div className="leading-tight">
              <div className="font-bold text-[#1a1a1a] text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                {collegeInfo.shortName}
              </div>
              <div className="text-xs text-gray-500">{collegeInfo.tagline}</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    active ? "text-[#5b0e5b]" : "text-gray-700 hover:text-[#5b0e5b]"
                  }`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#5b0e5b] rounded-full" />
                  )}
                </Link>
              );
            })}
            <a
              href="https://hcnpc.in"
              target="_blank"
              rel="noreferrer"
              className="ml-2 px-4 py-2 text-sm font-semibold rounded-full bg-[#f5c518] text-[#1a1a1a] hover:bg-[#e8b923] transition-colors"
            >
              Nursing College
            </a>
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${collegeInfo.phone1}`} className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#5b0e5b] transition-colors">
              <Phone className="w-4 h-4" />
              <span className="font-medium">{collegeInfo.phone1}</span>
            </a>
            <Button
              onClick={() => navigate("/apply")}
              className="bg-[#5b0e5b] hover:bg-[#7a1a7a] text-white rounded-md px-5 shadow-md hover:shadow-lg transition-all"
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="lg:hidden py-4 border-t border-gray-100 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? "bg-[#5b0e5b]/10 text-[#5b0e5b]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://hcnpc.in"
              target="_blank"
              rel="noreferrer"
              className="block px-3 py-2 rounded-md text-sm font-semibold text-[#1a1a1a] bg-[#f5c518]"
            >
              Nursing College
            </a>
            <div className="flex gap-2 px-3 pt-2">
              <a href={`tel:${collegeInfo.phone1}`} className="flex-1 text-center py-2 border rounded-md text-sm text-gray-700">
                <Phone className="w-4 h-4 inline mr-1" />
                {collegeInfo.phone1}
              </a>
              <Button
                onClick={() => { setOpen(false); navigate("/apply"); }}
                className="flex-1 bg-[#5b0e5b] hover:bg-[#7a1a7a] text-white"
              >
                Apply Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
