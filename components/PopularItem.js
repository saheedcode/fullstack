import Link from 'next/link';
import Image from 'next/image';
import { CATEGORY_LABEL, fallbackImage, formatDate } from '@/lib/api';

export default function PopularItem({ post }) {
  const img = post.image || fallbackImage(post.category);

  return (
    <li className="flex gap-3 py-3 border-b border-[#eceeee]">
      <div className="relative w-[62px] h-[62px] flex-shrink-0 rounded overflow-hidden">
        <Image src={img} alt={post.title} fill sizes="62px" className="object-cover" />
      </div>
      <div>
        <span className="block text-[9px] font-bold text-coral mb-1 uppercase">
          {CATEGORY_LABEL[post.category] || post.category}
        </span>
        <h5 className="text-[13px] leading-snug">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h5>
        <div className="text-[11px] text-muted mt-1">{formatDate(post.createdAt)}</div>
      </div>
    </li>
  );
}