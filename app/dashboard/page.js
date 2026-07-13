'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormMessage from '@/components/FormMessage';
import PostModal from '@/components/PostModal';
import { apiRequest, Auth } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState([]);
  const [dashMsg, setDashMsg] = useState({ text: '', type: '' });
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    if (!Auth.isLoggedIn()) {
      router.replace('/login');
    } else {
      setReady(true);
    }
  }, [router]);

  useEffect(() => {
    if (ready) loadMyPosts();
  }, [ready]);

  function flash(text, type) {
    setDashMsg({ text, type });
    setTimeout(() => setDashMsg({ text: '', type: '' }), 3500);
  }

  async function loadMyPosts() {
    try {
      const data = await apiRequest('/api/posts/mine', { auth: true });
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      flash(err.message || 'Failed to load posts', 'error');
    }
  }

  async function handlePostSubmit(payload) {
    try {
      const url = editingPost ? `/api/posts/${editingPost._id}` : '/api/posts';
      
      await apiRequest(url, { 
        method: editingPost ? 'PUT' : 'POST', 
        body: payload, 
        auth: true 
      });
      
      flash(editingPost ? 'Post updated!' : 'Post created!', 'success');
      setPostModalOpen(false);
      loadMyPosts();
    } catch (err) {
      flash(err.message || 'Failed to save post', 'error');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this post?')) return;
    try {
      await apiRequest(`/api/posts/${id}`, { method: 'DELETE', auth: true });
      flash('Post deleted.', 'success');
      loadMyPosts();
    } catch (err) {
      flash(err.message || 'Delete failed', 'error');
    }
  }

  if (!ready) return <div className="p-10 text-center">Loading...</div>;

  return (
    <>
      <header className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-[1180px] px-6 h-[84px] flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl text-navy">🍲 zaira</Link>
          <button onClick={() => { Auth.logout(); window.location.href = '/login'; }} className="text-sm font-semibold">Log Out</button>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] p-9">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">My Posts</h2>
          <button onClick={() => { setEditingPost(null); setPostModalOpen(true); }} className="bg-orange-600 text-white rounded-lg px-6 py-3">
            + New Post
          </button>
        </div>

        <FormMessage text={dashMsg.text} type={dashMsg.type} />
        
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          {posts.length === 0 ? (
            <div className="p-12 text-center text-gray-400">No posts yet.</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {posts.map((post) => (
                <li key={post._id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-4">
                    {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-12 h-12 rounded object-cover" />}
                    <div>
                      <p className="font-semibold">{post.title}</p>
                      <p className="text-xs text-gray-400 uppercase">{post.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => { setEditingPost(post); setPostModalOpen(true); }} className="text-sm text-blue-600">Edit</button>
                    <button onClick={() => handleDelete(post._id)} className="text-sm text-red-600">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <PostModal 
        open={postModalOpen} 
        post={editingPost} 
        onClose={() => setPostModalOpen(false)} 
        onSubmit={handlePostSubmit} 
      />
    </>
  );
}