import Link from 'next/link';
import Image from 'next/image';
import { fallbackImage, formatDate } from '@/lib/api';

export default function RecipeCard({ post }) {
  const img = post.image || fallbackImage(post.category);

  return (
    <Link href={`/post/${post.slug}`} className="block bg-white rounded-md shadow-card overflow-hidden">
      <div className="relative h-[150px] w-full">
        <Image src={img} alt={post.title} fill sizes="220px" className="object-cover" />
      </div>
      <div className="p-3.5">
        <h5 className="text-[13.5px] leading-snug mb-1.5">{post.title}</h5>
        <div className="text-[11px] text-muted">{formatDate(post.createdAt)}</div>
      </div>
    </Link>
  );
}