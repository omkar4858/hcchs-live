import React from "react";
import Hero from "../components/sections/Hero";
import NoticeBoard from "../components/sections/NoticeBoard";
import CoursesSection from "../components/sections/CoursesSection";
import Features from "../components/sections/Features";
import CTA from "../components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <NoticeBoard />
      <CoursesSection />
      <Features />
      <CTA />
    </>
  );
}
