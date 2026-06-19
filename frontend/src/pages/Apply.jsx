import React, { useCallback, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import ApplyForm from "../components/apply/ApplyForm";
import ApplySuccess from "../components/apply/ApplySuccess";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const FORM_SUBMIT_TIMEOUT_MS = 20000;

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  course: "",
  qualification: "",
  address: "",
  message: ""
};

function isFormValid(form) {
  return Boolean(form.fullName && form.email && form.phone && form.course);
}

export default function Apply() {
  const location = useLocation();
  const { toast } = useToast();
  const preCourse = location.state?.course || "";

  const [form, setForm] = useState({ ...EMPTY_FORM, course: preCourse });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const reset = useCallback(() => {
    setSubmitted(false);
    setForm({ ...EMPTY_FORM });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid(form)) {
      toast({
        title: "Required fields missing",
        description: "Please fill name, email, phone and course.",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/applications`, form, { timeout: FORM_SUBMIT_TIMEOUT_MS });
      if (res.data?.success) {
        setSubmitted(true);
        toast({
          title: "Application Submitted",
          description: res.data.message || "We've received your application."
        });
      } else {
        toast({ title: "Submission Failed", description: "Please try again.", variant: "destructive" });
      }
    } catch (err) {
      const detail =
        err?.response?.data?.detail || "Could not submit. Please try again or call us directly.";
      toast({ title: "Submission Failed", description: detail, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <ApplySuccess
        name={form.fullName}
        course={form.course}
        phone={form.phone}
        email={form.email}
        onReset={reset}
      />
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
          <ApplyForm form={form} onChange={update} onSubmit={handleSubmit} loading={loading} />
        </div>
      </section>
    </>
  );
}
