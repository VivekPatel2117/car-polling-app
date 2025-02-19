import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="border py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Logo and About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Poolcar</h2>
          <p className="text-sm">
            Your go-to platform for amazing rental cars and experiences. Let's make your trip special!
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about-us" className="text-sm hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="text-sm hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-sm hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-condition" className="text-sm hover:underline">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
            >
              <Linkedin size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Poolcar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
