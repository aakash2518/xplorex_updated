"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Lock } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Check custom password first, fall back to default
    const customPw = localStorage.getItem("xplorex_admin_password");
    const correctPw = customPw || "admin123";
    if (password === correctPw) {
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl grid place-items-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-primary font-display">Admin Access</h1>
            <p className="text-primary/60 text-sm mt-2">Please enter your password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border ${
                  error ? 'border-red-500' : 'border-slate-200'
                } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-semibold`}
              />
              {error && <p className="text-red-500 text-xs mt-2 font-bold ml-2">Incorrect password. Please try again.</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-white font-bold py-4 rounded-2xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 active:scale-[0.98]"
            >
              Unlock Dashboard
            </button>
          </form>
          
          <p className="text-center text-primary/30 text-[10px] mt-8 font-bold uppercase tracking-widest">
            Secure Terminal v1.0
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
