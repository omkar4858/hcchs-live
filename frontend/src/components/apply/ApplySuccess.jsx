import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

export default function ApplySuccess({ name, course, phone, email, onReset }) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20 bg-[#faf7f2] px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl p-10 text-center shadow-md border border-gray-100">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#f5c518]/20 flex items-center justify-center mb-5">
          <CheckCircle2 className="w-10 h-10 text-[#5b0e5b]" />
        </div>
        <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          Application Received!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you, <span className="font-semibold text-[#5b0e5b]">{name}</span>. We&apos;ve received your application for{" "}
          <span className="font-semibold text-[#5b0e5b]">{course}</span>. Our admissions team will contact you at{" "}
          <span className="font-semibold">{phone}</span> or <span className="font-semibold">{email}</span>.
        </p>
        <Button onClick={onReset} className="bg-[#5b0e5b] hover:bg-[#7a1a7a] text-white rounded-md">
          Submit Another Application
        </Button>
      </div>
    </section>
  );
}
