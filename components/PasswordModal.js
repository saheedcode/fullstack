'use client';

import { useState } from 'react';
import FormMessage from './FormMessage';
import { apiRequest } from '@/lib/api';

export default function PasswordModal({ open, onClose }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await apiRequest('/auth/update-password', {
        method: 'PUT',
        auth: true,
        body: { currentPassword, newPassword }
      });
      setMsg({ text: 'Password updated.', type: 'success' });
      setTimeout(() => {
        setMsg({ text: '', type: '' });
        setCurrentPassword('');
        setNewPassword('');
        onClose();
      }, 1000);
    } catch (err) {
      setMsg({ text: err.message, type: 'error' });
    }
  }

  return (
    <div className="fixed inset-0 bg-navy/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-md p-8 w-full max-w-[420px]">
        <h3 className="text-lg mb-5">Change Password</h3>
        <FormMessage text={msg.text} type={msg.type} />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[13px] font-semibold mb-1.5">Current Password</label>
            <input
              type="password" required value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-3 border border-[#eceeee] rounded text-sm"
            />
          </div>
          <div className="mb-5">
            <label className="block text-[13px] font-semibold mb-1.5">New Password</label>
            <input
              type="password" required minLength={6} value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-3 border border-[#eceeee] rounded text-sm"
            />
          </div>
          <div className="flex gap-2.5 justify-end">
            <button type="button" onClick={onClose} className="border border-[#eceeee] text-navy font-semibold text-sm rounded px-6 py-2.5">
              Cancel
            </button>
            <button type="submit" className="bg-coral hover:bg-coral-dark text-white font-semibold text-sm rounded px-6 py-2.5 transition">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}