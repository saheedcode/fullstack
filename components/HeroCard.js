import Link from 'next/link';
import Image from 'next/image';
import { CATEGORY_LABEL, fallbackImage, formatDate } from '@/lib/api';

const BADGE_COLOR = {
  breakfast: 'bg-[#e8a13a]',
  lunch: 'bg-coral',
  dinner: 'bg-navy'
};

export default function HeroCard({ post }) {
  const img = post.image || fallbackImage(post.category);
  const authorName = post.author?.email ? post.author.email.split('@')[0] : 'admin';

  return (
    <Link href={`/post/${post.slug}`} className="relative block bg-white rounded-md overflow-hidden shadow-card">
      <span className={`absolute top-3.5 left-3.5 z-10 text-white text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded ${BADGE_COLOR[post.category] || 'bg-navy'}`}>
        {CATEGORY_LABEL[post.category] || post.category}
      </span>
      <div className="relative h-[190px] w-full">
        <Image src={img} alt={post.title} fill sizes="280px" className="object-cover" />
      </div>
      <div className="p-4">
        <h4 className="text-[15px] leading-snug">{post.title}</h4>
        <div className="text-xs text-muted mt-2">By {authorName} &middot; {formatDate(post.createdAt)}</div>
      </div>
    </Link>
  );
}