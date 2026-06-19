import React from "react";
import { Send, Mail } from "lucide-react";
import Logo from "../Logo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { courses } from "../../data/mock";

export default function ApplyForm({ form, onChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 space-y-5">
      <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
        <Logo className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Application Form
          </h2>
          <p className="text-sm text-gray-500">All fields marked with * are required</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" value={form.fullName} onChange={(e) => onChange("fullName", e.target.value)} placeholder="Enter your full name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => onChange("email", e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" type="tel" value={form.phone} onChange={(e) => onChange("phone", e.target.value)} placeholder="10-digit mobile number" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" value={form.dob} onChange={(e) => onChange("dob", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Gender</Label>
          <Select value={form.gender} onValueChange={(v) => onChange("gender", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Course of Interest *</Label>
          <Select value={form.course} onValueChange={(v) => onChange("course", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.code} - {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="qualification">Highest Qualification</Label>
          <Input id="qualification" value={form.qualification} onChange={(e) => onChange("qualification", e.target.value)} placeholder="e.g., 10+2 with PCM, Graduation in Arts" />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" value={form.address} onChange={(e) => onChange("address", e.target.value)} placeholder="Your complete address" />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="message">Message (Optional)</Label>
          <Textarea id="message" rows={4} value={form.message} onChange={(e) => onChange("message", e.target.value)} placeholder="Anything you'd like us to know..." />
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-[#f5c518]/10 border border-[#f5c518]/30">
        <Mail className="w-5 h-5 text-[#5b0e5b] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-700">
          Your application will be sent to our admissions team. We will respond within 24 working hours.
        </p>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#5b0e5b] hover:bg-[#7a1a7a] text-white py-6 rounded-md text-base font-semibold shadow-md hover:shadow-lg"
      >
        {loading ? (
          "Submitting..."
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Submit Application
          </>
        )}
      </Button>
    </form>
  );
}
