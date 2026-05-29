"use client";

import React, { useState, useEffect } from "react";
import { User, Bell, Shield, Globe, Mail, Smartphone, Save, Eye, EyeOff, RotateCcw } from "lucide-react";
import { getSettings, saveSettings, resetAllData, DEFAULT_SETTINGS } from "@/lib/store";
import { notifyStoreUpdate } from "@/lib/useStore";
import type { SiteSettings } from "@/lib/store";

const TABS = [
  { id: "profile", icon: User, label: "General Profile" },
  { id: "security", icon: Shield, label: "Security" },
  { id: "reset", icon: RotateCcw, label: "Data & Reset" },
] as const;

type Tab = typeof TABS[number]["id"];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleSave = () => {
    saveSettings(settings);
    notifyStoreUpdate();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePasswordChange = () => {
    if (!newPassword) return setPwMsg("Enter a new password.");
    if (newPassword !== confirmPassword) return setPwMsg("Passwords do not match.");
    if (newPassword.length < 6) return setPwMsg("Password must be at least 6 characters.");
    localStorage.setItem("xplorex_admin_password", newPassword);
    setPwMsg("✓ Password updated successfully.");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleReset = () => {
    if (
      confirm(
        "This will reset ALL destinations, trips, leads and settings back to defaults. This cannot be undone. Continue?"
      )
    ) {
      resetAllData();
      notifyStoreUpdate();
      setSettings(DEFAULT_SETTINGS);
      alert("All data has been reset to defaults.");
    }
  };

  const set = (key: keyof SiteSettings) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setSettings((p) => ({ ...p, [key]: e.target.value }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary font-display">Settings</h1>
        <p className="text-primary/60 mt-1">Configure your dashboard and site preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="bg-white rounded-3xl p-4 shadow-3d-sm border border-primary/5 h-fit">
          {TABS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all mb-1 ${
                activeTab === id
                  ? "bg-primary text-white shadow-3d-sm"
                  : "text-primary/40 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-3xl p-8 shadow-3d-sm border border-primary/5">
              <h2 className="font-bold text-primary text-xl mb-6">Site & Profile Information</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <SField label="Admin Name" value={settings.adminName} onChange={set("adminName")} />
                  <SField label="Admin Email" value={settings.adminEmail} onChange={set("adminEmail")} type="email" />
                </div>
                <SField label="Company Name" value={settings.companyName} onChange={set("companyName")} />
                <div className="grid grid-cols-2 gap-4">
                  <SField label="Phone Number" value={settings.phone} onChange={set("phone")} placeholder="XXXXXXXXXX" />
                  <SField label="WhatsApp Number" value={settings.whatsapp} onChange={set("whatsapp")} placeholder="XXXXXXXXXXXX" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-primary/40 ml-1">Bio / Tagline</label>
                  <textarea
                    value={settings.bio}
                    onChange={set("bio")}
                    aria-label="Bio"
                    placeholder="Managing the future of travel."
                    rows={3}
                    className="w-full bg-primary/5 border border-primary/5 rounded-2xl px-4 py-3 text-primary font-semibold focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all resize-none focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-primary/5 flex items-center justify-between">
                {saved && (
                  <span className="text-green-500 font-bold text-sm">✓ Settings saved!</span>
                )}
                <div className="ml-auto">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-press hover:translate-y-[-2px] transition-all"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="bg-white rounded-3xl p-8 shadow-3d-sm border border-primary/5">
              <h2 className="font-bold text-primary text-xl mb-6">Change Admin Password</h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-primary/40 ml-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      aria-label="New password"
                      className="w-full bg-primary/5 border border-primary/5 rounded-2xl px-4 py-3 pr-12 text-primary font-semibold focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-primary/30 hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-primary/40 ml-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    aria-label="Confirm password"
                    className="w-full bg-primary/5 border border-primary/5 rounded-2xl px-4 py-3 text-primary font-semibold focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all focus:outline-none"
                  />
                </div>
                {pwMsg && (
                  <p className={`text-sm font-bold ${pwMsg.startsWith("✓") ? "text-green-500" : "text-red-500"}`}>
                    {pwMsg}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handlePasswordChange}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-press hover:translate-y-[-2px] transition-all"
                >
                  <Shield className="w-5 h-5" />
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* Data & Reset Tab */}
          {activeTab === "reset" && (
            <div className="bg-white rounded-3xl p-8 shadow-3d-sm border border-primary/5">
              <h2 className="font-bold text-primary text-xl mb-6">Data Management</h2>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-1">How data is stored</h3>
                  <p className="text-sm text-blue-600 font-medium">
                    All destinations, trips, leads and settings are stored in your browser&apos;s localStorage.
                    Changes made in the admin panel reflect immediately on the public website.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-red-600">Reset All Data</div>
                    <div className="text-xs text-red-400 font-semibold mt-0.5">
                      Restores all destinations, trips and settings to their original defaults. Leads will be cleared.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-white text-red-600 border border-red-200 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition-all ml-4 flex-shrink-0"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SField({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-bold text-primary/40 ml-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={label}
        className="w-full bg-primary/5 border border-primary/5 rounded-2xl px-4 py-3 text-primary font-semibold focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all focus:outline-none"
      />
    </div>
  );
}
