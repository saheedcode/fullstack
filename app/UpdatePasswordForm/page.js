'use client';

import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation'; // Import router
import { apiRequest } from '@/lib/api';
import Navbar from '@/components/Navbar';


export default function UpdatePasswordForm({ isOtpAuth }) {
  const [show, setShow] = useState(false);
  const [state, action] = useFormState(updatePasswordAction, null);
  const router = useRouter();

  // Redirect upon success
  useEffect(() => {
    if (state?.success) {
      // Optional: Add a small delay if you want the user to see the success message
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    }
  }, [state, router]);

  return (
    <form action={action} className="max-w-sm mx-auto p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Update Password</h2>

      {!isOtpAuth && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <input
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">New Password</label>
        <div className="relative">
          <input
            name="newPassword"
            type={show ? 'text' : 'password'}
            autoComplete="new-password"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <button 
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-2.5 text-xs font-semibold text-blue-600"
          >
            {show ? 'HIDE' : 'SHOW'}
          </button>
        </div>
      </div>

      {state?.error && <p className="text-red-500 text-sm mb-4">{state.error}</p>}
      {state?.success && <p className="text-green-600 text-sm mb-4">Password updated! Redirecting...</p>}

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
        Update Password
      </button>
    </form>
  );
}