'use client';

import { useEffect, useState } from 'react';
import { recipeFromText, recipeToText } from '@/lib/api';

const emptyForm = { title: '', category: '', image: '', content: '', recipe: '' };

export default function PostModal({ open, post, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title,
        category: post.category,
        image: post.image || '',
        content: post.content,
        recipe: recipeToText(post.recipe)
      });
    } else {
      setForm(emptyForm);
    }
  }, [post, open]);

  if (!open) return null;

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Optional: Limit file size to 1MB
    if (file.size > 1024 * 1024) {
      alert("File is too large! Please select an image under 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange('image', reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      recipe: recipeFromText(form.recipe)
    });
  }

  return (
    <div className="fixed inset-0 bg-navy/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-md p-8 w-full max-w-[520px] max-h-[88vh] overflow-y-auto">
        <h3 className="text-lg mb-5">{post ? 'Edit Post' : 'New Post'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[13px] font-semibold mb-1.5">Title</label>
            <input
              type="text" required value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g. Suya Platter"
              className="w-full px-3.5 py-3 border border-[#eceeee] rounded text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[13px] font-semibold mb-1.5">Category</label>
            <select
              required value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3.5 py-3 border border-[#eceeee] rounded text-sm"
            >
              <option value="">Select category</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-[13px] font-semibold mb-1.5">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-coral file:text-white hover:file:bg-coral-dark"
            />
            {form.image && (
              <div className="mt-2">
                <img src={form.image} alt="Preview" className="h-20 w-20 object-cover rounded border" />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-[13px] font-semibold mb-1.5">Content / Description</label>
            <textarea
              required value={form.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Short description of the post"
              className="w-full px-3.5 py-3 border border-[#eceeee] rounded text-sm min-h-[100px]"
            />
          </div>
          <div className="mb-5">
            <label className="block text-[13px] font-semibold mb-1.5">Recipe (ingredients &amp; steps)</label>
            <textarea
              required value={form.recipe}
              onChange={(e) => handleChange('recipe', e.target.value)}
              placeholder="One ingredient or step per line"
              className="w-full px-3.5 py-3 border border-[#eceeee] rounded text-sm min-h-[100px]"
            />
          </div>
          <div className="flex gap-2.5 justify-end">
            <button type="button" onClick={onClose} className="border border-[#eceeee] text-navy font-semibold text-sm rounded px-6 py-2.5">
              Cancel
            </button>
            <button type="submit" className="bg-coral hover:bg-coral-dark text-white font-semibold text-sm rounded px-6 py-2.5 transition">
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}