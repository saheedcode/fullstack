'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import FormMessage from '@/components/FormMessage';
import { apiRequest, Auth } from '@/lib/api';

export default function LoginPage() {
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
      const data = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      });

      Auth.saveToken(data.token);
      Auth.saveUser(data.user);

      setMsg({ text: 'Login successful. Redirecting...', type: 'success' });

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);

    } catch (err) {
      setLoading(false);
      setMsg({ text: err.message || 'Login failed', type: 'error' });
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-84px)] bg-mint flex items-center justify-center px-5 py-10">
        <div className="bg-white rounded-md shadow-card p-10 w-full max-w-[420px]">
          <h2 className="text-2xl text-center mb-1.5">Welcome Back</h2>
          <p className="text-muted text-sm text-center mb-6">Sign in to manage your recipes</p>

          <FormMessage text={msg.text} type={msg.type} />

  <form onSubmit={handleSubmit}>
  {/* Email Section */}
  <div className="mb-4.5">
    <label className="block text-[13px] font-semibold mb-1.5">Email</label>
    <input
      type="email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="you@example.com"
      className="w-full px-3.5 py-3 border border-[#eceeee] rounded text-sm"
    />
  </div>

  {/* Password Section */}
  <div className="mb-5">
    <label className="block text-[13px] font-semibold mb-1.5">Password</label>
    <input
      type="password"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="••••••••"
      className="w-full px-3.5 py-3 border border-[#eceeee] rounded text-sm"
    />
    
    {/* Forgot password positioned after the input on the right */}
    <div className="flex justify-end mt-2">
      <button 
        type="button"
        onClick={() => window.location.href = '/Forgetpassword'}
        className="text-[11px] text-gray-500 font-medium hover:underline"
      >
        Forgot password?
      </button>
    </div>
  </div>
      
  {/* Submit Button */}
  <button 
    type="submit" 
    disabled={loading}
    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded py-3.5 transition"
  >
    {loading ? 'Signing in...' : 'Sign In'}
  </button>
</form>

          <div className="text-center text-sm text-muted mt-5">
            Don&apos;t have an account?{' '}
            <button 
              onClick={() => window.location.href = '/signup'} 
              className="text-coral font-semibold hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}