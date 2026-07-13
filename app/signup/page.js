'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import FormMessage from '@/components/FormMessage';
import { apiRequest } from '@/lib/api';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });

    try {
      // FIX: Added /api prefix to match your server routes
      await apiRequest('/api/auth/signup', {
        method: 'POST',
        body: { email, password }
      });

      setMsg({ text: 'Account created successfully. Redirecting to login...', type: 'success' });

      // Hard redirect to login after successful signup
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);

    } catch (err) {
      setLoading(false);
      setMsg({ text: err.message || 'Signup failed', type: 'error' });
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-84px)] bg-mint flex items-center justify-center px-5 py-10">
        <div className="bg-white rounded-md shadow-card p-10 w-full max-w-[420px]">
          <h2 className="text-2xl text-center mb-1.5">Create Account</h2>
          <p className="text-muted text-sm text-center mb-6">Join us to manage your recipes</p>

          <FormMessage text={msg.text} type={msg.type} />

          <form onSubmit={handleSubmit}>
            <div className="mb-4.5">
              <label className="block text-[13px] font-semibold mb-1.5">Email</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-3 border border-[#eceeee] rounded text-sm"
              />
            </div>
            <div className="mb-5">
              <label className="block text-[13px] font-semibold mb-1.5">Password</label>
              <input
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-3 border border-[#eceeee] rounded text-sm"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded py-3.5 transition"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-5">
            Already have an account?  <button 
  onClick={() => window.location.href = '/login'} 
  className="text-coral font-semibold"
>
   Sign in
</button> 
          </p>
        </div>
      </div>
    </>
  );
}