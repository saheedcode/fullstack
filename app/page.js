


'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroCard from '@/components/HeroCard';
import MiniCard from '@/components/MiniCard';
import RecipeCard from '@/components/RecipeCard';
import PopularItem from '@/components/PopularItem';
import { apiRequest, fallbackImage, formatDate } from '@/lib/api';

export default function HomePage() {
  const [heroPosts, setHeroPosts] = useState(null);
  const [heroError, setHeroError] = useState('');

  const [explorePosts, setExplorePosts] = useState(null);
  const [exploreError, setExploreError] = useState('');

  const [weeklyBest, setWeeklyBest] = useState(null);
  const [weeklyError, setWeeklyError] = useState('');

  const [allPosts, setAllPosts] = useState(null);
  const [allError, setAllError] = useState('');

  useEffect(() => {
    apiRequest('/posts?limit=4').then(setHeroPosts).catch((e) => setHeroError(e.message));
    apiRequest('/posts?limit=3').then(setExplorePosts).catch((e) => setExploreError(e.message));
    apiRequest('/posts/weekly-best').then(setWeeklyBest).catch((e) => setWeeklyError(e.message));
    apiRequest('/posts').then(setAllPosts).catch((e) => setAllError(e.message));
  }, []);

  const lastPost = explorePosts && explorePosts.length > 0 ? explorePosts[explorePosts.length - 1] : null;

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All' 
  ? allPosts 
  : allPosts?.filter(post => post.category === selectedCategory);

// Then in your render:
{filteredPosts?.slice(0, 6).map((post) => <RecipeCard key={post._id} post={post} />)}

  return (
    <>
      
      <Navbar />

      <div className="mx-auto max-w-[1180px] px-6">
        {/* Hero grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 py-10">
          {heroError && <p className="text-muted text-sm">Could not load recipes ({heroError}). Is the backend running?</p>}
          {heroPosts && heroPosts.length === 0 && <p className="text-muted text-sm">No recipes posted yet. Be the first from the dashboard!</p>}
          {heroPosts?.map((post) => <HeroCard key={post._id} post={post} />)}
        </div>

        {/* Newsletter */}
    <div className="bg-white border border-gray-100 rounded-xl px-9 py-8 flex flex-col md:flex-row items-center justify-between gap-5 mb-12 shadow-sm">
  <h3 className="text-xl font-bold text-navy max-w-[260px]">Want To Get New Food Daily?</h3>
  
  <form
    className="flex flex-1 w-full md:w-auto flex-wrap gap-3"
    onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing!'); }}
  >
    <input 
      type="text" 
      placeholder="Name" 
      required 
      className="flex-1 min-w-[160px] px-5 py-3.5 border border-gray-200 bg-gray-50 rounded-lg text-sm transition outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 placeholder:text-gray-400" 
    />
    <input 
      type="email" 
      placeholder="E-mail" 
      required 
      className="flex-1 min-w-[160px] px-5 py-3.5 border border-gray-200 bg-gray-50 rounded-lg text-sm transition outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 placeholder:text-gray-400" 
    />
    <button 
      type="submit" 
      className="bg-coral hover:bg-coral-dark text-white font-semibold text-sm rounded-lg px-7 py-3.5 transition duration-300 shadow-md hover:shadow-lg active:scale-95"
    >
      Submit Now
    </button>
  </form>
</div>

        {/* Explore latest recipes */}
        <section className="pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-heading">Explore Latest Recipes</h2>
            <a href="#" className="text-xs font-bold text-navy">VIEW ALL &rsaquo;</a>
          </div>
          <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-6">
            <div className="bg-white rounded-md shadow-card overflow-hidden">
              {exploreError && <p className="p-5 text-sm text-muted">Could not load recipes.</p>}
              {explorePosts && explorePosts.length === 0 && <p className="p-5 text-sm text-muted">No recipes yet.</p>}
              {explorePosts && explorePosts[0] && (
                <>
                  <div className="relative h-[260px] w-full">
                    <Image
                      src={explorePosts[0].image || fallbackImage(explorePosts[0].category)}
                      alt={explorePosts[0].title}
                      fill
                      sizes="500px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[19px] mb-2">
                      <Link href={`/post/${explorePosts[0].slug}`}>{explorePosts[0].title}</Link>
                    </h3>
                    <p className="text-muted text-sm">
                      {(explorePosts[0].content || '').slice(0, 120)}
                      {(explorePosts[0].content || '').length > 120 ? '…' : ''}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div>
              {explorePosts?.slice(1).map((post) => <MiniCard key={post._id} post={post} />)}
            </div>



<div className="bg-white rounded-md shadow-card p-6 text-center">
              <div className="relative w-[74px] h-[74px] rounded-full mx-auto mb-3.5 overflow-hidden">
                <Image 
                  src={lastPost?.image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80"} 
                  alt="Author/Post" 
                  fill 
                  sizes="74px" 
                  className="object-cover" 
                />
              </div>
              <h4 className="text-base">Hi, I'm {lastPost?.author?.email ? lastPost.author.email.split('@')[0] : 'Jenny!'}</h4>
              <p className="text-muted text-[13px] my-2.5">
                {lastPost ? "Check out my latest recipe featured here!" : "When an unknown printer took a galley of type and scrambled it to make a type specimen book."}
              </p>
              <div className="flex justify-center gap-2 mb-5">
                {['f', 't', 'ig', 'p'].map((s) => (
                  <a key={s} href="#" className="w-[30px] h-[30px] rounded-full bg-mint flex items-center justify-center text-xs text-navy">{s}</a>
                ))}
              </div>
              <ul className="text-left border-t border-[#eceeee] pt-4">
                {[['Facebook', '12.4k'], ['Twitter', '9.1k'], ['Instagram', '21.7k'], ['Youtube', '3.2k']].map(([label, count]) => (
                  <li key={label} className="flex justify-between text-[13px] font-semibold py-1.5">
                    <span>{label}</span><span>{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>


<section className="bg-mint py-12 text-center">
  <h2 className="text-2xl">Our Top Categories</h2>
  <p className="text-muted max-w-[480px] mx-auto mt-2.5 mb-8 text-sm">
    Browned butter and brown sugar caramelly goodness, crispy edges thick and soft centers and melty little puddles.
  </p>
  <div className="flex justify-center gap-6 flex-wrap px-6">
    {[
      ['All', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&q=80'], // Added 'All' option
      ['Breakfast', 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=200&q=80'],
      ['Dessert', 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&q=80'],
      ['Lunch', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&q=80'],
      ['Appetizer', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80'],
      ['Dinner', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&q=80'],
      ['Pizza', 'https://images.unsplash.com/photo-1568158879083-c42860933ed7?w=200&q=80']
    ].map(([label, img]) => (
      <div 
        key={label} 
        className="text-center cursor-pointer transition-transform hover:scale-105"
        onClick={() => setSelectedCategory(label)}
      >
        <div className={`w-24 h-24 rounded-full overflow-hidden border-4 ${selectedCategory === label ? 'border-coral' : 'border-white'} shadow-card mb-2.5 relative`}>
          <Image src={img} alt={label} fill sizes="96px" className="object-cover" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
      </div>
    ))}
  </div>
</section>


      <div className="mx-auto max-w-[1180px] px-6">
        {/* Weekly best - the 4 most recently created posts */}
        <section className="py-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-heading">Weekly Best Recipes</h2>
            <a href="#" className="text-xs font-bold text-navy">VIEW ALL &rsaquo;</a>
          </div>

          {weeklyError && <p className="text-muted text-sm">Could not load weekly best recipes ({weeklyError}).</p>}
          {weeklyBest && weeklyBest.length === 0 && <p className="text-muted text-sm">No recipes posted yet this week.</p>}

          {weeklyBest && weeklyBest.length > 0 && (
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-6">
              <Link href={`/post/${weeklyBest[0].slug}`} className="relative block rounded-md overflow-hidden shadow-card min-h-[340px]">
                <div className="relative h-[340px] w-full">
                  <Image
                    src={weeklyBest[0].image || fallbackImage(weeklyBest[0].category)}
                    alt={weeklyBest[0].title}
                    fill
                    sizes="700px"
                    className="object-cover"
                  />
                </div>
                <div className="absolute left-0 bottom-0 right-0 p-6 bg-gradient-to-t from-navy/90 to-transparent text-white">
                  <h3 className="text-[19px] mb-1.5">{weeklyBest[0].title}</h3>
                  <div className="text-xs opacity-85">
                    By {weeklyBest[0].author?.email ? weeklyBest[0].author.email.split('@')[0] : 'admin'} &middot; {formatDate(weeklyBest[0].createdAt)}
                  </div>
                </div>
              </Link>
              <div>
                {weeklyBest.slice(1).map((post) => <MiniCard key={post._id} post={post} />)}
              </div>
            </div>
          )}
        </section>

        {/* Ebook banner */}
        <div className="bg-navy rounded-md overflow-hidden grid md:grid-cols-2 items-center text-white mb-14">
          <div className="p-10">
            <h3 className="text-2xl mb-2.5">Free Recipe E-Books</h3>
            <p className="text-[#b9c2c8] mb-5 text-sm">Join my free email list to receive three free cookbooks!</p>
            <a href="#" className="inline-block bg-coral hover:bg-coral-dark text-white font-semibold text-sm rounded px-7 py-3.5 transition">
              CHECK BOOKS ONLINE
            </a>
          </div>
          <div className="relative h-[220px] md:h-[260px] w-full">
            <Image src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" alt="Cookbook" fill sizes="500px" className="object-cover" />
          </div>
        </div>

        {/* Healthy + popular */}
        <section className="grid md:grid-cols-[2.3fr_1fr] gap-8 pb-14">
          <div>
            <h2 className="section-heading mb-6">Healthy Recipes</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {allError && <p className="text-muted text-sm">Could not load recipes.</p>}
              {allPosts && allPosts.length === 0 && <p className="text-muted text-sm">No recipes yet.</p>}
              {allPosts?.slice(0, 6).map((post) => <RecipeCard key={post._id} post={post} />)}
            </div>
          </div>
          <div>
            <h2 className="text-lg mb-6">Popular Recipes</h2>
            <ul>
              {allPosts?.slice(0, 5).map((post) => <PopularItem key={post._id} post={post} />)}
            </ul>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

