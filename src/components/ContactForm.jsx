"use client";

import { useState } from "react";
import {
  Button,
  Form,
  Input,
  TextArea,
  TextField,
  Label,
  FieldError,
} from "@heroui/react";
import toast from "react-hot-toast";
import { submitContactMessage } from "@/lib/action/contactAction";

const SUBJECTS = [
  "General question",
  "Join the club / trials",
  "Sponsorship & partnership",
  "Report a problem on the website",
  "Other",
];

const labelClass =
  "block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", text }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Form er shob field FormData theke plain object e. Honeypot checkbox
    // tick na hole payload e hp_field thakbe-i na
    const payload = Object.fromEntries(new FormData(form).entries());

    setLoading(true);
    setStatus(null);

    try {
      const res = await submitContactMessage(payload);

      if (res?.success) {
        const text = "Message sent! We will reply to you by email.";
        toast.success(text);
        setStatus({ type: "success", text });
        form.reset();
      } else {
        const text = res?.error || "Failed to send your message.";
        toast.error(text);
        setStatus({ type: "error", text });
      }
    } catch (err) {
      console.error(err);
      const text = err.message || "Something went wrong. Please try again.";
      toast.error(text);
      setStatus({ type: "error", text });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot: checkbox, browser autofill eta tick korte pare na. Manush dekhbe na, bot ra tick korbe */}
      <input
        type="checkbox"
        name="hp_field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        <TextField isRequired name="name" className="w-full">
          <Label className={labelClass}>Your name</Label>
          <Input
            placeholder="e.g., Rahim Uddin"
            className="w-full bg-slate-950 text-white"
          />
          <FieldError className="text-rose-500 text-xs mt-1" />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "")
              ? null
              : "Please enter a valid email address."
          }
          className="w-full"
        >
          <Label className={labelClass}>Email</Label>
          <Input
            placeholder="you@example.com"
            className="w-full bg-slate-950 text-white"
          />
          <FieldError className="text-rose-500 text-xs mt-1" />
        </TextField>

        <TextField
          isRequired
          name="phone"
          type="tel"
          validate={(value) => {
            const cleaned = (value || "").trim().replace(/[\s-]/g, "");
            return /^(?:\+88)?01[3-9]\d{8}$/.test(cleaned)
              ? null
              : "Please enter a valid phone number (e.g., 01712345678).";
          }}
          className="w-full sm:col-span-2"
        >
          <Label className={labelClass}>Phone Number</Label>
          <Input
            placeholder="01712345678"
            className="w-full bg-slate-950 text-white"
          />
          <FieldError className="text-rose-500 text-xs mt-1" />
        </TextField>
      </div>

      <div className="w-full">
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          defaultValue={SUBJECTS[0]}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <TextField
        isRequired
        name="message"
        validate={(value) =>
          (value || "").trim().length < 10
            ? "Please write at least 10 characters."
            : null
        }
        className="w-full"
      >
        <Label className={labelClass}>
          Message{" "}
          <span className="text-slate-500 font-normal">(Max 1000 chars)</span>
        </Label>
        <TextArea
          placeholder="Tell us how we can help..."
          rows={6}
          maxLength={1000}
          className="w-full bg-slate-950 text-white"
        />
        <FieldError className="text-rose-500 text-xs mt-1" />
      </TextField>

      {/* Inline status alert */}
      {status && (
        <div
          role="status"
          className={`w-full rounded-xl border px-4 py-3 text-sm font-medium ${
            status.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
              : "bg-red-500/10 border-red-500/40 text-red-300"
          }`}
        >
          {status.text}
        </div>
      )}

      <Button
        type="submit"
        isDisabled={loading}
        className="w-full sm:w-auto text-white bg-gradient-to-r from-blue-600 to-red-600 font-semibold px-8"
      >
        {loading ? "Sending..." : "Send message"}
      </Button>
    </Form>
  );
}