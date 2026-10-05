"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { getAuthToken } from "@/lib/core/authToken";
import {
  addHeroImage,
  toggleHeroImage,
  deleteHeroImage,
} from "@/lib/action/admin/heroImageAction";
import { DEFAULT_HERO_IMAGES, MAX_SLIDER_IMAGES } from "@/lib/api/heroImageApi";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function ManageHeroImages({ initialImages = [] }) {
  const [images, setImages] = useState(initialImages);
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [importing, setImporting] = useState(false);

  // Delete confirm dialog: target alada rakhi, jate bondho hobar animation e text na hariye jay
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isValidUrl = /^https?:\/\/.+/i.test(src.trim());
  const isActive = (img) => img.isActive !== false;

  // Slider e asholei je gulo dekhabe (newest active, max limit porjonto)
  const liveIds = new Set(
    images
      .filter(isActive)
      .slice(0, MAX_SLIDER_IMAGES)
      .map((img) => img._id),
  );

  const missingDefaults = DEFAULT_HERO_IMAGES.filter(
    (d) => !images.some((img) => img.src === d.src),
  );

  const getToken = async () => {
    const token = await getAuthToken();
    if (!token) toast.error("Session expired. Please login again.");
    return token;
  };

  const handleAdd = async () => {
    if (!isValidUrl) {
      toast.error("Please enter a valid image URL (https://...).");
      return;
    }

    setSaving(true);
    try {
      const token = await getToken();
      if (!token) return;

      const res = await addHeroImage(src.trim(), alt.trim(), token);
      if (res?.success) {
        setImages((prev) => [res.image, ...prev]);
        setSrc("");
        setAlt("");
        toast.success("Photo added to the library and the slider!");
      } else {
        toast.error(res?.error || "Failed to add image.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setSaving(false);
    }
  };

  // Ager 5 ta photo library te ek click e import (Photo 1 shobcheye upore thakbe)
  const handleImportDefaults = async () => {
    setImporting(true);
    try {
      const token = await getToken();
      if (!token) return;

      const added = [];
      for (const d of [...missingDefaults].reverse()) {
        const res = await addHeroImage(d.src, d.alt, token);
        if (!res?.success) {
          toast.error(res?.error || `Failed to import "${d.alt}".`);
          break;
        }
        added.unshift(res.image);
      }

      if (added.length > 0) {
        setImages((prev) => [...added, ...prev]);
        toast.success(`${added.length} default photo(s) imported.`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setImporting(false);
    }
  };

  const handleToggle = async (img) => {
    const next = !isActive(img);
    setBusyId(img._id);
    try {
      const token = await getToken();
      if (!token) return;

      const res = await toggleHeroImage(img._id, next, token);
      if (res?.success) {
        setImages((prev) =>
          prev.map((i) => (i._id === img._id ? { ...i, isActive: next } : i)),
        );
        toast.success(next ? "Photo will show in the slider." : "Photo hidden from the slider.");
      } else {
        toast.error(res?.error || "Failed to update image.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setBusyId(null);
    }
  };

  const askDelete = (img) => {
    setDeleteTarget(img);
    setDeleteOpen(true);
  };

  const handleDelete = async (id) => {
    setBusyId(id);
    try {
      const token = await getToken();
      if (!token) return;

      const res = await deleteHeroImage(id, token);
      if (res?.success) {
        setImages((prev) => prev.filter((img) => img._id !== id));
        toast.success("Photo deleted.");
      } else {
        toast.error(res?.error || "Failed to delete image.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="w-full p-4 lg:p-8 space-y-8 dark">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Hero Slider Photos</h1>
          <p className="text-sm text-slate-300">
            All photos live in this library. Choose which ones show on the homepage slider (up to{" "}
            {MAX_SLIDER_IMAGES}).
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border bg-emerald-500/15 text-emerald-300 border-emerald-500/40">
          {liveIds.size} in slider · {images.length} total
        </span>
      </div>

      {/* Default photos import */}
      {missingDefaults.length > 0 && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-200">
            {missingDefaults.length} original team photo(s) are not in the library yet.
          </p>
          <Button
            isDisabled={importing}
            onPress={handleImportDefaults}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold"
          >
            {importing ? "Importing..." : "Import original photos"}
          </Button>
        </div>
      )}

      {/* Add form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Add New Photo</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Image URL (direct link)</label>
              <input
                type="url"
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                placeholder="https://i.ibb.co.com/xxxxxxx/team-photo.png"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Caption / Alt text</label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="FC Boraitola squad before the Alompur match"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <Button
              isDisabled={!isValidUrl || saving}
              onPress={handleAdd}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold"
            >
              {saving ? "Adding..." : "Add Photo"}
            </Button>

            <p className="text-[11px] text-slate-500">
              Tip: imgbb te upload kore <span className="text-slate-300">Direct link</span> (i.ibb.co
              diye shuru) copy koro. Page link (ibb.co/xxxx) kaj korbe na.
            </p>
          </div>

          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
            {isValidUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src.trim()}
                alt="Preview"
                className="w-full h-full object-contain"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : (
              <p className="text-xs text-slate-500">Image preview will appear here</p>
            )}
          </div>
        </div>
      </div>

      {/* Library */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
          Photo Library ({images.length})
        </h2>

        {images.length === 0 ? (
          <p className="text-sm text-slate-400">
            No photos yet. The homepage is showing the original photos right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => {
              const active = isActive(img);
              const live = liveIds.has(img._id);
              const busy = busyId === img._id;

              let badge = "Hidden";
              let badgeClass = "bg-slate-700/60 text-slate-300 border-slate-600";
              if (live) {
                badge = "In slider";
                badgeClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
              } else if (active) {
                badge = "Over limit";
                badgeClass = "bg-amber-500/20 text-amber-300 border-amber-500/40";
              }

              return (
                <div
                  key={img._id}
                  className={`bg-slate-900 border rounded-2xl overflow-hidden ${
                    live ? "border-emerald-500/30" : "border-slate-800"
                  }`}
                >
                  <div className={`relative aspect-[16/10] bg-slate-950 ${live ? "" : "opacity-60"}`}>
                    <Image
                      src={img.src}
                      alt={img.alt || "Hero image"}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-contain"
                      unoptimized
                    />
                    <span
                      className={`absolute top-2 left-2 text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${badgeClass}`}
                    >
                      {badge}
                    </span>
                  </div>

                  <div className="p-3 space-y-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{img.alt}</p>
                      <p className="text-[11px] text-slate-500">
                        {new Date(img.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        isDisabled={busy}
                        onPress={() => handleToggle(img)}
                        className={`flex-1 font-semibold border ${
                          active
                            ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
                            : "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500"
                        }`}
                      >
                        {busy ? "..." : active ? "Hide from slider" : "Show in slider"}
                      </Button>

                      <Button
                        size="sm"
                        isDisabled={busy}
                        onPress={() => askDelete(img)}
                        className="bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-950/70"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete this photo?"
        message={`"${deleteTarget?.alt || "This photo"}" will be removed from the library and the homepage slider permanently.`}
        confirmLabel="Delete Photo"
        status="danger"
        onConfirm={() => deleteTarget && handleDelete(deleteTarget._id)}
      />
    </div>
  );
}