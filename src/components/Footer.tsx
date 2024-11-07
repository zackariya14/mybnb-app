import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="md:flex md:justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold tracking-widest">MyBnB</h2>
            <p className="text-sm opacity-80">Find your next stay with us!</p>
          </div>

          <div className="flex space-x-6 text-sm">
            <Link href="/about" className="hover:text-yellow-300 transition">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-yellow-300 transition">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-yellow-300 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-yellow-300 transition">
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between items-center border-t border-blue-700 pt-6">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-yellow-300 transition">
              <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.592 0 0 .592 0 1.325v21.351C0 23.408.592 24 1.325 24H12v-9.294H9.285V11.29H12V8.413c0-2.708 1.65-4.186 4.07-4.186 1.156 0 2.146.086 2.433.125v2.823h-1.673c-1.315 0-1.569.625-1.569 1.542v2.019h3.137l-.41 3.417h-2.726V24h5.358c.733 0 1.325-.592 1.325-1.324V1.325C24 .592 23.408 0 22.675 0z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-yellow-300 transition">
              <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.954 4.569c-.885.392-1.833.656-2.825.775a4.932 4.932 0 002.163-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.939 13.939 0 011.671 3.149a4.822 4.822 0 001.523 6.573 4.902 4.902 0 01-2.23-.616v.061a4.923 4.923 0 003.946 4.827 4.904 4.904 0 01-2.224.085 4.926 4.926 0 004.604 3.417A9.867 9.867 0 010 21.539a13.905 13.905 0 007.548 2.209c9.142 0 14.307-7.721 14.307-14.416 0-.22-.005-.439-.014-.658A10.348 10.348 0 0024 4.59z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-yellow-300 transition">
              <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.325 3.608 1.299.976.976 1.238 2.242 1.299 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.325 2.633-1.299 3.608-.976.976-2.242 1.238-3.608 1.299-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.325-3.608-1.299-.976-.976-1.238-2.242-1.299-3.608C2.174 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.325-2.633 1.299-3.608.976-.976 2.242-1.238 3.608-1.299 1.266-.058 1.646-.069 4.85-.069zM12 0C8.741 0 8.332.014 7.052.072 5.77.129 4.6.345 3.678 1.267 2.756 2.19 2.54 3.361 2.483 4.643.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.057 1.282.273 2.453 1.195 3.375.922.922 2.093 1.138 3.375 1.195 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 1.282-.057 2.453-.273 3.375-1.195.922-.922 1.138-2.093 1.195-3.375.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.057-1.282-.273-2.453-1.195-3.375-.922-.922-2.093-1.138-3.375-1.195C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
            </a>
          </div>

          <div className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} MyBnB. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
