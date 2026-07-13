'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import FormMessage from '@/components/FormMessage';
import { apiRequest } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: 'Sending code...', type: '' });

    try {
      // API call path updated: removed leading '/api'
      await apiRequest('/auth/request-otp', { 
        method: 'POST', 
        body: { email } 
      });

      localStorage.setItem('otp_email', email);
      setMsg({ text: 'Code sent! Redirecting...', type: 'success' });
      
      setTimeout(() => {
        window.location.href = '/verify-otp';
      }, 1000);
    } catch (err) {
      setMsg({ text: err.message || 'Failed to send code.', type: 'error' });
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-84px)] bg-mint flex items-center justify-center px-5 py-10">
        <div className="bg-white rounded-md shadow-card p-10 w-full max-w-[420px]">
          <h2 className="text-2xl text-center mb-1.5">Reset Password</h2>
          <p className="text-muted text-sm text-center mb-6">Enter your email to receive a verification code.</p>
          <FormMessage text={msg.text} type={msg.type} />
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-[13px] font-semibold mb-1.5">Email Address</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-3 border border-[#eceeee] rounded text-sm"
              />
            </div>
            <button 
              type="submit" disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded py-3.5 transition"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}