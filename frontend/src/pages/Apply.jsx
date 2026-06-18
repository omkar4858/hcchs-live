import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Send, CheckCircle2, Mail, GraduationCap } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select";
import { useToast } from "../hooks/use-toast";
import { courses, collegeInfo } from "../data/mock";

export default function Apply() {
  const location = useLocation();
  const { toast } = useToast();
  const preCourse = location.state?.course || "";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    course: preCourse,
    qualification: "",
    address: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.course) {
      toast({ title: "Required fields missing", description: "Please fill name, email, phone and course.", variant: "destructive" });
      return;
    }
    setLoading(true);
    // Mock submission - simulate latency
    await new Promise((r) => setTimeout(r, 900));
    // Persist in local storage so it feels real in mock mode
    const apps = JSON.parse(localStorage.getItem("applications") || "[]");
    apps.push({ ...form, submittedAt: new Date().toISOString() });
    localStorage.setItem("applications", JSON.stringify(apps));
    setLoading(false);
    setSubmitted(true);
    toast({ title: "Application Submitted", description: "We've received your application. Our admissions team will reach out shortly." });
  };

  if (submitted) {
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
            Thank you, <span className="font-semibold text-[#5b0e5b]">{form.fullName}</span>. We've received your application for <span className="font-semibold text-[#5b0e5b]">{form.course}</span>. Our admissions team will contact you at <span className="font-semibold">{form.phone}</span> or <span className="font-semibold">{form.email}</span>.
          </p>
          <Button
            onClick={() => { setSubmitted(false); setForm({ fullName: "", email: "", phone: "", dob: "", gender: "", course: "", qualification: "", address: "", message: "" }); }}
            className="bg-[#5b0e5b] hover:bg-[#7a1a7a] text-white rounded-md"
          >
            Submit Another Application
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative bg-gradient-to-br from-[#3a0a3a] via-[#5b0e5b] to-[#7a1a7a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-[#f5c518]/20 text-[#f5c518] text-xs font-semibold tracking-wider uppercase mb-3">
            Admission 2025-26
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Apply for Admission
          </h1>
          <p className="mt-3 text-gray-200 max-w-2xl mx-auto">
            Fill out the form below and our admissions team will reach out within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#faf7f2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-[#5b0e5b] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#f5c518]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>Application Form</h2>
                <p className="text-sm text-gray-500">All fields marked with * are required</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Enter your full name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="10-digit mobile number" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Gender</Label>
                <Select value={form.gender} onValueChange={(v) => update("gender", v)}>
                  <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Course of Interest *</Label>
                <Select value={form.course} onValueChange={(v) => update("course", v)}>
                  <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                  <SelectContent>
                    {courses.map((c) => (
                      <SelectItem key={c.code} value={c.code}>{c.code} - {c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="qualification">Highest Qualification</Label>
                <Input id="qualification" value={form.qualification} onChange={(e) => update("qualification", e.target.value)} placeholder="e.g., 10+2 with PCM, Graduation in Arts" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Your complete address" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea id="message" rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Anything you'd like us to know..." />
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#f5c518]/10 border border-[#f5c518]/30">
              <Mail className="w-5 h-5 text-[#5b0e5b] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">
                Your application will be sent to our admissions team. We will respond within 24 working hours.
              </p>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-[#5b0e5b] hover:bg-[#7a1a7a] text-white py-6 rounded-md text-base font-semibold shadow-md hover:shadow-lg">
              {loading ? "Submitting..." : (<><Send className="w-5 h-5 mr-2" />Submit Application</>)}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
