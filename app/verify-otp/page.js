

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import FormMessage from '@/components/FormMessage';
import { apiRequest } from '@/lib/api';

export default function Forgetpassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const storedEmail = localStorage.getItem('otp_email');
    if (!storedEmail) {
      router.push('/forgot-password');
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  async function handleVerify(e) {
    e.preventDefault();
    if (otp.length !== 6) return setMsg({ text: 'Please enter 6 digits', type: 'error' });
    
    setLoading(true);
    try {
      const data = await apiRequest('/api/auth/verify-otp', {
       method: 'POST',
        body: { email, otp }
      });



      if (data.token) {
        localStorage.setItem('foodblog_token', data.token);
        localStorage.removeItem('otp_email'); // Clean up after success
      }

      setMsg({ text: 'Verified! Redirecting...', type: 'success' });
        setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);
    } catch (err) {
      console.error("Verification error:", err);
      setMsg({ text: err.message || 'Invalid code', type: 'error' });
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!email) {
      setMsg({ text: 'Error: No email found. Go back.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      await apiRequest('/api/auth/request-otp', { 
        method: 'POST', 
        body: { email } 
      });


      setMsg({ text: 'New code sent! Check your inbox.', type: 'success' });
      setCooldown(60);
    } catch (err) {
      console.error("Resend error:", err);
      setMsg({ text: err.message || 'Failed to resend. Check console.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-84px)] bg-mint flex items-center justify-center px-5 py-10">
        <div className="bg-white rounded-md shadow-card p-10 w-full max-w-[420px]">
          <h2 className="text-2xl text-center mb-1.5">Enter Code</h2>
          <p className="text-center text-sm mb-4 text-gray-600">Sent to: {email || 'Loading...'}</p>
          <FormMessage text={msg.text} type={msg.type} />
          <form onSubmit={handleVerify}>
            <input
              type="text" 
              maxLength={6} 
              required 
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="w-full px-3.5 py-3 mb-5 border border-[#eceeee] rounded text-center text-lg tracking-widest"
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-orange-600 text-white font-semibold rounded py-3.5 mb-4 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
            <button 
              type="button" 
              disabled={loading || cooldown > 0} 
              onClick={handleResend} 
              className="w-full text-sm text-orange-600 underline disabled:opacity-50"
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}