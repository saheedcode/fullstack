/*

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiRequest } from '@/lib/api';
import RecipeCard from '@/components/RecipeCard';

export default function CategoryPage() {
  const { slug } = useParams(); // This gets "breakfast" from the URL
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // This tells your API to get recipes only for this specific category
    apiRequest(`/posts?category=${slug}`)
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error:", err));
  }, [slug]);

  return (
    <div className="mx-auto max-w-[1180px] px-6 py-10">
      <h1 className="text-3xl font-bold capitalize mb-8">{slug} Recipes</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <RecipeCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}


*/

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Added useRouter
import { apiRequest } from '@/lib/api';
import RecipeCard from '@/components/RecipeCard';

export default function CategoryPage() {
  const { slug } = useParams();
  const router = useRouter(); // Initialize router
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    apiRequest(`/posts?category=${slug}`)
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error:", err));
  }, [slug]);

  return (
    <div className="mx-auto max-w-[1180px] px-6 py-10">
      
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-coral transition-colors"
      >
        <span>&larr;</span> Back
      </button>

      <h1 className="text-3xl font-bold capitalize mb-8">{slug} Recipes</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <RecipeCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}