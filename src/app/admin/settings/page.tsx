"use client";

import React from "react";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Mail,
  Smartphone,
  Save
} from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary font-display">Settings</h1>
        <p className="text-primary/60 mt-1">Configure your dashboard and application preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Tabs */}
        <div className="bg-white rounded-3xl p-4 shadow-3d-sm border border-primary/5 h-fit">
          <TabItem icon={User} label="General Profile" active />
          <TabItem icon={Bell} label="Notifications" />
          <TabItem icon={Shield} label="Security" />
          <TabItem icon={Globe} label="Localization" />
          <TabItem icon={Mail} label="Email SMTP" />
          <TabItem icon={Smartphone} label="Mobile App" />
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-3d-sm border border-primary/5">
            <h2 className="font-bold text-primary text-xl mb-6">Profile Information</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Full Name" value="Aakash Sharma" />
                <InputGroup label="Email Address" value="admin@xplorex.com" />
              </div>
              <InputGroup label="Company Name" value="Xplorex Travels" />
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary/40 ml-1">Bio</label>
                <textarea 
                  className="w-full bg-primary/5 border border-primary/5 rounded-2xl px-4 py-3 text-primary font-semibold focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all min-h-[100px]"
                  defaultValue="Managing the future of travel."
                />
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-primary/5 flex justify-end">
              <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-press hover:translate-y-[-2px] transition-all">
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-3d-sm border border-primary/5">
            <h2 className="font-bold text-primary text-xl mb-6">Danger Zone</h2>
            <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-between">
              <div>
                <div className="font-bold text-red-600 text-sm">Delete Account</div>
                <div className="text-xs text-red-400 font-semibold">This action cannot be undone.</div>
              </div>
              <button className="bg-white text-red-600 border border-red-200 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabItem({ icon: Icon, label, active }: any) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
      active ? 'bg-primary text-white shadow-3d-sm' : 'text-primary/40 hover:bg-primary/5 hover:text-primary'
    }`}>
      <Icon className="w-5 h-5" />
      <span className="text-sm">{label}</span>
    </button>
  );
}

function InputGroup({ label, value }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-primary/40 ml-1">{label}</label>
      <input 
        type="text" 
        className="w-full bg-primary/5 border border-primary/5 rounded-2xl px-4 py-3 text-primary font-semibold focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all"
        defaultValue={value}
      />
    </div>
  );
}
