/*

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Auth } from '@/lib/api';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check auth status on mount
    setLoggedIn(Auth.isLoggedIn());
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Categories', href: '/categories' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Utility Top Bar }
      <div className="hidden md:block bg-[#0b131a] text-[#7d8790] text-[11px] py-1.5">
        <div className="mx-auto max-w-[1180px] px-6 flex justify-between items-center">
          <div className="flex gap-4">
            {['Forum', 'About', 'FAQ', 'All Recipes'].map((item) => (
              <span key={item} className="hover:text-white cursor-pointer">{item}</span>
            ))}
          </div>
          <div>FOLLOW US: f t in</div>
        </div>
      </div>

      {/* Main Navbar }
      <div className="border-b border-[#eceeee]">
        <div className="mx-auto max-w-[1180px] px-6 h-[84px] flex items-center justify-between">
          
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            <span className="text-2xl">{isOpen ? '✕' : '☰'}</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <span className="cursor-pointer">☰</span>
            <nav>
              <ul className="flex gap-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="font-semibold text-sm hover:text-coral transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Link href="/" className="font-display font-bold text-2xl text-text-main flex items-center gap-2">
            🍲 <span>zaira</span>
          </Link>

          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center border border-[#eceeee] rounded-full px-3 py-1.5">
              <input type="text" placeholder="Search here..." className="text-xs outline-none w-24" />
              <span className="cursor-pointer">🔍</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm font-semibold">
              <span className="cursor-pointer">♡ 0</span>
              <span className="cursor-pointer">✉ 0</span>
              
              {/* Unified Auth Button }
              <button 
                onClick={() => { window.location.href = loggedIn ? '/dashboard' : '/login'; }} 
                className="flex items-center gap-1.5 hover:text-coral transition-colors"
              >
                👤 {loggedIn ? 'Dashboard' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu }
      {isOpen && (
        <div className="md:hidden absolute top-[84px] left-0 w-full bg-white border-b border-[#eceeee] p-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>
          ))}
          <hr className="border-[#eceeee]" />
          <button 
            onClick={() => { window.location.href = loggedIn ? '/dashboard' : '/login'; }} 
            className="text-left font-semibold text-coral text-lg"
          >
            {loggedIn ? 'Dashboard' : 'Sign In'}
          </button>
        </div>
      )}
    </header>
  );
}
*/


'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Auth } from '@/lib/api';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    setLoggedIn(Auth.isLoggedIn());
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Contact', href: '/contact' },
  ];

  const categories = [
    { name: 'Breakfast', href: '/category/breakfast' },
    { name: 'Lunch', href: '/category/lunch' },
    { name: 'Dinner', href: '/category/dinner' },
    { name: 'Dessert', href: '/category/dessert' },
    { name: 'Appetizer', href: '/category/appetizer' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Utility Top Bar */}
      <div className="hidden md:block bg-[#0b131a] text-[#7d8790] text-[11px] py-1.5">
        <div className="mx-auto max-w-[1180px] px-6 flex justify-between items-center">
          <div className="flex gap-4">
            {['Forum', 'About', 'FAQ', 'All Recipes'].map((item) => (
              <span key={item} className="hover:text-white cursor-pointer">{item}</span>
            ))}
          </div>
          <div>FOLLOW US: f t in</div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-[#eceeee]">
        <div className="mx-auto max-w-[1180px] px-6 h-[84px] flex items-center justify-between">
          
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            <span className="text-2xl">{isOpen ? '✕' : '☰'}</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <nav>
              <ul className="flex gap-6 items-center">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="font-semibold text-sm hover:text-coral transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
                
                {/* Categories Dropdown */}
                <li 
                  className="relative cursor-pointer font-semibold text-sm hover:text-coral transition-colors py-8"
                  onMouseEnter={() => setShowCategories(true)}
                  onMouseLeave={() => setShowCategories(false)}
                >
                  Categories ▾
                  {showCategories && (
                    <ul className="absolute top-full left-0 w-48 bg-white shadow-xl border border-gray-100 py-2 rounded-lg z-50 animate-in fade-in zoom-in duration-200">
                      {categories.map((cat) => (
                        <li key={cat.name}>
                          <Link href={cat.href} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-coral">
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </nav>
          </div>

          <Link href="/" className="font-display font-bold text-2xl text-text-main flex items-center gap-2">
            🍲 <span>zaira</span>
          </Link>

          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center border border-[#eceeee] rounded-full px-3 py-1.5">
              <input type="text" placeholder="Search here..." className="text-xs outline-none w-24 bg-transparent" />
              <span className="cursor-pointer">🔍</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm font-semibold">
              <button onClick={() => { window.location.href = loggedIn ? '/dashboard' : '/login'; }} className="flex items-center gap-1.5 hover:text-coral transition-colors">
                👤 {loggedIn ? 'Dashboard' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-[84px] left-0 w-full bg-white border-b border-[#eceeee] p-6 flex flex-col gap-4 shadow-xl z-40">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>
          ))}
          <div className="text-lg font-medium text-coral">Categories</div>
          <div className="pl-4 flex flex-col gap-3">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.href} className="text-sm text-gray-600" onClick={() => setIsOpen(false)}>
                {cat.name}
              </Link>
            ))}
          </div>
          <hr />
          <button 
            onClick={() => { window.location.href = loggedIn ? '/dashboard' : '/login'; setIsOpen(false); }} 
            className="text-left font-semibold text-coral text-lg"
          >
            {loggedIn ? 'Dashboard' : 'Sign In'}
          </button>
        </div>
      )}
    </header>
  );
}