import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <section>
          <Link to="/" aria-label="SasyaVana Home"
            className="mb-4 flex items-center gap-2 text-2xl font-bold text-green-700 transition-colors duration-200 hover:text-green-800"
          ><span aria-hidden="true">🌿</span> <span>SasyaVana</span> </Link>

          <p className="mt-3 text-sm leading-6 text-gray-600">Connecting people with trusted nurseries and healthy plants.</p>
        </section>

        <nav aria-label="Quick Links"><h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="transition-colors duration-200 hover:text-green-700">Home</Link></li>
            <li><Link to="/categories" className="transition-colors duration-200 hover:text-green-700">Categories</Link></li>
            <li><Link to="/nurseries" className="transition-colors duration-200 hover:text-green-700">Nurseries</Link></li>
            <li><Link to="/about" className="transition-colors duration-200 hover:text-green-700">About</Link></li>
          </ul>
        </nav>

        <nav aria-label="Support"><h3 className="mb-4 text-lg font-semibold text-gray-900">Support</h3>

          <ul className="space-y-2">
            <li><Link to="/contact" className="transition-colors duration-200 hover:text-green-700">Contact</Link></li>
            <li><Link to="/privacy" className="transition-colors duration-200 hover:text-green-700">Privacy Policy</Link></li>
            <li><Link to="/terms" className="transition-colors duration-200 hover:text-green-700">Terms & Conditions</Link></li>
          </ul>
        </nav>

        <section>
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Follow Us</h3>

          <div className="flex flex-wrap gap-3">
            <button type="button" className="rounded-md border border-gray-300 px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-100"
            >Facebook</button>

            <button type="button" className="rounded-md border border-gray-300 px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-100"
            >Instagram</button>

            <button type="button" className="rounded-md border border-gray-300 px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-100"
            >YouTube </button>
          </div>
        </section>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">© 2026 SasyaVana. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
