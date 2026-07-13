
/*

'use client';

import { useEffect, useState, use } from 'react'; // Added 'use'
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { apiRequest, CATEGORY_LABEL, fallbackImage, formatDate } from '@/lib/api';

export default function PostPage({ params }) {
  // Await params to be safe across different Next.js versions
  const { slug } = use(params); 
  
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');


  /*
  useEffect(() => {
    if (!slug) return;
    
    // Ensure the path matches your backend route
    apiRequest(`/api/posts/${encodeURIComponent(slug)}`)
      .then(setPost)
      .catch((err) => setError(err.message));
  }, [slug]);


  useEffect(() => {
  if (!slug) return;
  
  console.log("Fetching post for slug:", slug); // Debug line
  
  apiRequest(`/api/posts/${slug}`) // Try without encodeURIComponent
    .then((data) => {
      console.log("API Success:", data);
      setPost(data);
    })
    .catch((err) => {
      console.error("API Error:", err);
      setError(err.message || 'Failed to load post');
    });
}, [slug]);

  

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[760px] px-6 pb-16">
        {error && <p className="text-muted text-sm py-8">Could not load this recipe ({error}).</p>}
        {!post && !error && <p className="text-muted text-sm py-8">Loading recipe…</p>}

        {post && (
          <>
            <div className="relative h-[380px] w-full rounded-md overflow-hidden shadow-card my-8">
              <Image src={post.image || fallbackImage(post.category)} alt={post.title} fill sizes="760px" className="object-cover" />
            </div>
            <span className="inline-block bg-coral text-white text-[11px] font-bold uppercase px-2.5 py-1 rounded mb-3">
              {CATEGORY_LABEL[post.category] || post.category}
            </span>
            <h1 className="text-[30px] mb-2.5">{post.title}</h1>
            <div className="text-muted text-[13px] mb-5">
              By {post.author?.email ? post.author.email.split('@')[0] : 'admin'} &middot; {formatDate(post.createdAt)}
            </div>
            <p className="mb-4">{post.content}</p>

            <div className="bg-white rounded-md shadow-card p-6 mt-7">
              <h3 className="text-lg mb-3.5">Recipe</h3>
              {Array.isArray(post.recipe) ? (
                <ul className="list-disc pl-5 space-y-2">
                  {post.recipe.map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              ) : (
                <p>{post.recipe}</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

*/



'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { apiRequest, CATEGORY_LABEL, fallbackImage, formatDate } from '@/lib/api';

export default function PostPage({ params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;
  
  const router = useRouter();
  
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Safety check
    if (!slug) {
      setLoading(false);
      setError('Invalid URL: No recipe slug found.');
      return;
    }
    
    setLoading(true);
    apiRequest(`/api/posts/${slug}`)
      .then((data) => {
        setPost(data);
        setError('');
      })
      .catch((err) => {
        console.error("API Fetch Error:", err);
        setError(err.message || 'Failed to load post');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[760px] px-6 pb-16 pt-8">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-coral transition-colors"
        >
          <span>&larr;</span> Back to Recipes
        </button>

        {loading && <p className="text-muted text-sm py-8">Loading recipe, please wait...</p>}
        
        {error && (
          <div className="py-8">
            <p className="text-red-500 text-sm mb-4">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-coral underline font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {post && !loading && (
          <>
            <div className="relative h-[380px] w-full rounded-md overflow-hidden shadow-card my-4">
              <Image 
                src={post.image || fallbackImage(post.category)} 
                alt={post.title || "Recipe Image"} 
                fill 
                sizes="760px" 
                className="object-cover" 
                priority 
              />
            </div>
            
            <span className="inline-block bg-coral text-white text-[11px] font-bold uppercase px-2.5 py-1 rounded mb-3">
              {CATEGORY_LABEL[post.category] || post.category || 'Recipe'}
            </span>
            
            <h1 className="text-[32px] font-bold text-navy mb-3">{post.title}</h1>
            <div className="text-muted text-[13px] mb-6">
              By {post.author?.email ? post.author.email.split('@')[0] : 'admin'} &middot; {formatDate(post.createdAt)}
            </div>
            
            <p className="mb-6 leading-relaxed text-gray-700">
              {typeof post.content === 'object' ? (post.content.content || JSON.stringify(post.content)) : post.content}
            </p>
<div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 mt-7">
  <h3 className="text-lg font-bold mb-4">Instructions</h3>
  
  {/* Logic: Handle Array, Object, or String */}
  {Array.isArray(post.recipe) ? (
    <ul className="list-decimal pl-5 space-y-3">
      {post.recipe.map((line, i) => <li key={i}>{line}</li>)}
    </ul>
  ) : typeof post.recipe === 'object' && post.recipe !== null ? (
    <div className="text-gray-600">
      {/* If it has a 'content' field (like in your JSON screenshot), display it */}
      {post.recipe.content ? (
        <p>{post.recipe.content}</p>
      ) : (
        /* Otherwise, show the whole JSON string so you can see what the data looks like */
        <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(post.recipe, null, 2)}</pre>
      )}
    </div>
  ) : (
    <p className="text-gray-600">{String(post.recipe || 'No instructions provided.')}</p>
  )}
</div>
          </>
        )}
      </div>
    </>
  );
}