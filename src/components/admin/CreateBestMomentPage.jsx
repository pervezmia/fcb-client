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
import { ArrowLeft, FloppyDisk } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import Link from "next/link";
import { createBestMoment } from "@/lib/action/admin/createBestMoment";

export default function CreateBestMomentPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);

    try {
      await createBestMoment(formData);
      toast.success("Best moment created successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/best-moment"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Best Moments
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Create New Best Moment
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Share your memorable team or player moments with the community.
            </p>
          </div>

          <Form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <TextField isRequired name="title" className="w-full">
              <Label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Title
              </Label>
              <Input
                placeholder="e.g., Winning Goal in Final Minute"
                className="w-full bg-slate-950 text-white"
              />
              <FieldError />
            </TextField>

            {/* Category */}
            <TextField isRequired name="category" className="w-full">
              <Label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Match Name
              </Label>
              <Input
                placeholder="e.g., Tournament Final 2026"
                className="w-full bg-slate-950 text-white"
              />
              <FieldError />
            </TextField>

            {/* Media URL with Custom Validation */}
            <TextField
              isRequired
              name="mediaUrl"
              type="url"
              validate={(value) => {
                try {
                  const url = new URL(value);
                  if (url.protocol !== "http:" && url.protocol !== "https:") {
                    return "URL must start with http:// or https://";
                  }
                } catch (_) {
                  return "Please enter a valid URL (e.g., https://example.com/image.jpg)";
                }
                return null;
              }}
              className="w-full"
            >
              <Label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Image URL
              </Label>
              <Input
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-slate-950 text-white"
              />
              <FieldError className="text-rose-500 text-xs mt-1" />
            </TextField>

            {/* Caption / Description */}
            <TextField
              isRequired
              name="caption"
              validate={(value) => {
                if (value && value.length > 100) {
                  return "Caption must be within 100 characters!";
                }
                return null;
              }}
              className="w-full"
            >
              <Label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Caption{" "}
                <span className="text-slate-500 font-normal">
                  (Max 100 chars)
                </span>
              </Label>
              <TextArea
                placeholder="Write something about this amazing moment..."
                rows={4}
                maxLength={100} // ব্রাউজার লেভেলে ১০০ টার বেশি টাইপ করতে দিবে না
                className="w-full bg-slate-950 text-white"
              />
              <FieldError className="text-rose-500 text-xs mt-1" />
            </TextField>

            {/* Submit Button */}
            <div className="pt-4 flex items-center justify-end gap-3">
              <Link href="/best-moment">
                <Button variant="flat" color="danger" type="button">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                color="success"
                isDisabled={loading}
                className="text-white bg-gradient-to-r from-blue-600 to-red-600"
              >
                <FloppyDisk className="w-4 h-4 mr-1" />
                {loading ? "Saving..." : "Create Moment"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
