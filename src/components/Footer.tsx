export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} My DevLog. All rights reserved.</p>
      </div>
    </footer>
  );
};
