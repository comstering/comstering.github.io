export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F3F4F6] dark:bg-[#1E293B] text-[#6B7280] dark:text-[#94A3B8] border-t border-[#E5E7EB] dark:border-[#334155]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Dev Notes. All rights reserved.</p>
      </div>
    </footer>
  );
};
