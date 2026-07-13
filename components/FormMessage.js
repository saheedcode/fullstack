export default function FormMessage({ text, type }) {
  if (!text) return null;

  const styles = type === 'error'
    ? 'bg-[#fdeceb] text-[#c0392b]'
    : 'bg-[#e7f6ee] text-[#1e8a5f]';

  return (
    <div className={`text-[13px] px-3 py-2.5 rounded mb-4 ${styles}`}>
      {text}
    </div>
  );
}