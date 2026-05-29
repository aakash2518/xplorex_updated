"use client";

import React, { useRef, useState } from "react";
import { Upload, X, ImageIcon, Link as LinkIcon } from "lucide-react";

interface Props {
  value: string; // current img value (base64 or path)
  onChange: (val: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Image" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<"upload" | "url">(value && !value.startsWith("data:") ? "url" : "upload");
  const [urlInput, setUrlInput] = useState(value && !value.startsWith("data:") ? value : "");
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const processFile = (file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    // Warn if > 2MB — base64 in localStorage can get large
    if (file.size > 2 * 1024 * 1024) {
      setError("Image is large (>2MB). It will still work but may slow down the page.");
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleUrlApply = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    setError("");
  };

  const handleClear = () => {
    onChange("");
    setUrlInput("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const isBase64 = value?.startsWith("data:");
  const hasImage = !!value;

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-primary/40 uppercase tracking-wider">{label}</label>

      {/* Tab switcher */}
      <div className="flex gap-1 p-1 bg-primary/5 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setTab("upload")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            tab === "upload" ? "bg-white text-primary shadow-sm" : "text-primary/40 hover:text-primary"
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          Upload
        </button>
        <button
          type="button"
          onClick={() => setTab("url")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            tab === "url" ? "bg-white text-primary shadow-sm" : "text-primary/40 hover:text-primary"
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          URL / Path
        </button>
      </div>

      {/* Upload tab */}
      {tab === "upload" && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl cursor-pointer transition-all overflow-hidden ${
            dragging
              ? "border-accent bg-accent/5 scale-[1.01]"
              : hasImage
              ? "border-primary/20 bg-primary/5"
              : "border-primary/10 bg-primary/5 hover:border-accent/40 hover:bg-accent/5"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload image"
          />

          {hasImage ? (
            /* Preview */
            <div className="relative h-44">
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold text-sm bg-black/50 px-3 py-1.5 rounded-xl">
                  Click to change
                </span>
              </div>
              {/* Clear button */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleClear(); }}
                aria-label="Remove image"
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {isBase64 && (
                <div className="absolute bottom-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                  ✓ Uploaded
                </div>
              )}
            </div>
          ) : (
            /* Empty state */
            <div className="h-36 flex flex-col items-center justify-center gap-2 text-primary/30">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="font-bold text-sm text-primary/50">
                  {dragging ? "Drop image here" : "Click or drag & drop"}
                </p>
                <p className="text-xs mt-0.5">JPG, PNG, WEBP · Max 2MB recommended</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* URL / Path tab */}
      {tab === "url" && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUrlApply()}
              placeholder="/assets/dest-bali.jpg  or  https://..."
              aria-label="Image URL or path"
              className="flex-1 px-4 py-3 rounded-2xl border border-primary/10 bg-primary/5 text-primary font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            <button
              type="button"
              onClick={handleUrlApply}
              className="px-4 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors"
            >
              Apply
            </button>
          </div>

          {/* Preview for URL */}
          {value && !value.startsWith("data:") && (
            <div className="relative h-36 rounded-2xl overflow-hidden border border-primary/10">
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  setError("Image not found at this path.");
                }}
              />
              <button
                type="button"
                onClick={handleClear}
                aria-label="Remove image"
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error / warning */}
      {error && (
        <p className={`text-xs font-bold ${error.includes("slow") ? "text-orange-500" : "text-red-500"}`}>
          ⚠ {error}
        </p>
      )}
    </div>
  );
}
