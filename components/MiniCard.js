import Link from 'next/link';
import Image from 'next/image';
import { CATEGORY_LABEL, fallbackImage, formatDate } from '@/lib/api';

export default function MiniCard({ post }) {
  const img = post.image || fallbackImage(post.category);

  return (
    <Link href={`/post/${post.slug}`} className="flex gap-3 mb-5">
      <div className="relative w-[90px] h-[70px] flex-shrink-0 rounded overflow-hidden">
        <Image src={img} alt={post.title} fill sizes="90px" className="object-cover" />
      </div>
      <div>
        <span className="inline-block text-[9px] font-bold text-white bg-coral px-1.5 py-0.5 rounded-sm mb-1.5 uppercase">
          {CATEGORY_LABEL[post.category] || post.category}
        </span>
        <h5 className="text-[13.5px] leading-snug">{post.title}</h5>
        <div className="text-[11px] text-muted mt-1">{formatDate(post.createdAt)}</div>
      </div>
    </Link>
  );
}