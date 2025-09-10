import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-200 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <a href="/" className="flex items-center space-x-2 mb-6">
            <img
              src="https://regenhub.io/wp-content/uploads/2023/03/ReGenHub-Logo-Icon.png"
              alt="ReGenHub logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold tracking-wide">ReGenHub</span>
          </a>
          <p className="text-green-300 max-w-xs">
            Empowering businesses to reduce waste and embrace circular economy.
          </p>
        </div>

        <div>
          <h4 className="text-green-100 font-semibold mb-4">Marketplace</h4>
          <ul className="space-y-2 text-green-300">
            <li><a href="#marketplace" className="hover:text-green-100">Browse materials</a></li>
            <li><a href="#how-it-works" className="hover:text-green-100">How it works</a></li>
            <li><a href="#news" className="hover:text-green-100">News</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-green-100 font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-green-300">
            <li><a href="#about" className="hover:text-green-100">About us</a></li>
            <li><a href="#contact" className="hover:text-green-100">Contact</a></li>
            <li><a href="#" className="hover:text-green-100">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-green-100 font-semibold mb-4">Follow us</h4>
          <div className="flex space-x-6 text-green-300 text-2xl">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-100">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-100">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-100">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-green-700 pt-6 text-center text-green-400 text-sm">
        &copy; 2024 ReGenHub. All rights reserved.
      </div>
    </footer>
  );
}
