import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="SasyaVana Home"
          className="flex items-center gap-2 text-2xl font-bold text-green-700 transition-colors duration-200 hover:text-green-800"
        >
          <span aria-hidden="true">🌿</span>
          <span>SasyaVana</span>
        </Link>

        <nav aria-label="Primary Navigation" className="hidden items-center gap-8 md:flex">
          <Link to="/" className="transition-colors duration-200 hover:text-green-700">Home</Link>

          <Link to="/categories" className="transition-colors duration-200 hover:text-green-700">Categories</Link>

          <Link to="/nurseries" className="transition-colors duration-200 hover:text-green-700">Nurseries</Link>

          <Link to="/about" className="transition-colors duration-200 hover:text-green-700">About</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button type="button" className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gray-100">
            Search</button>

          <button type="button" className="rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gray-100">
            Login</button>

          <button type="button"
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-green-700"
          >Register</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
