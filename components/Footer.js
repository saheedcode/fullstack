export default function Footer() {
  const columns = [
    { title: 'Company', items: ['About Us', 'The Test Kitchen', 'Podcast', 'Events', 'Jobs'] },
    { title: 'Get Help', items: ['Contact & FAQ', 'Orders & Returns', 'Gift Cards', 'Register', 'Catalog'] },
    { title: 'Explore', items: ['The Shop', 'Recipes', 'Food', 'Travel', 'Hotline'] },
    { title: 'Follow Us On', items: ['Facebook', 'Twitter', 'Instagram', 'Youtube', 'Pinterest'] }
  ];

  return (
    <footer className="bg-[#0b131a] text-[#7d8790] pt-16 pb-8">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-display font-bold text-2xl text-white flex items-center gap-2 mb-4">
              🍲 <span>zaira</span>
            </div>
            <p className="text-[13px] leading-relaxed max-w-[200px]">
              Browned butter and brown sugar caramelly goodness, crispy edges thick and soft puddles of chocolate.
            </p>
          </div>

          {/* Navigation Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-sm font-semibold mb-6 relative pb-2 w-fit">
                {col.title}
                <span className="absolute left-0 bottom-0 h-[2px] w-[20px] bg-coral rounded-full"></span>
              </h4>
              <ul className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item} className="text-[13px] hover:text-coral transition-colors cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Site Credits</span>
          </div>
          <span>&copy; {new Date().getFullYear()} All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}