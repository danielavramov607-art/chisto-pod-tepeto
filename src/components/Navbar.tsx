"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X, Flame } from "lucide-react";

const navLinks = [
  { href: "/#home", label: "Начало" },
  { href: "/#services", label: "Услуги" },
  // { href: "/#reviews", label: "Отзиви" }, // Temporarily hidden
  { href: "/#contact", label: "Контакти" },
];

const promoLink = {
  href: "/reviews",
  label: "-20% Първите 10",
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <Image
              src="/logo_navbar.png"
              alt="Чисто под Тепето - Професионално почистване Пловдив"
              width={224}
              height={56}
              className="h-15 w-auto mt-0.3"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-8">
            {/* Left: Navigation Links */}
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right: Promo Button + Phone Button */}
            <div className="flex items-center gap-3">
              {/* Promo Button */}
              <Link
                href={promoLink.href}
                className="inline-flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-700 font-bold px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md animate-pulse"
              >
                <Flame className="w-4 h-4 text-orange-500" />
                <span>{promoLink.label}</span>
              </Link>

              {/* Call Now Button */}
              <a
                href="tel:0888123345"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-full transition-colors shadow-md hover:shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>0888 123 345</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50">
          <div className="px-4 py-4 space-y-3">
            {/* Promo Banner at Top */}
            <Link
              href={promoLink.href}
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-700 font-bold py-3 px-4 rounded-full transition-all shadow-sm animate-pulse"
            >
              <Flame className="w-5 h-5 text-orange-500" />
              <span>{promoLink.label}</span>
            </Link>

            <div className="border-t border-gray-200 my-3" />

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block py-2 px-3 rounded-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Call Now Button */}
            <a
              href="tel:0888123345"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-full transition-colors shadow-md mt-4"
            >
              <Phone className="w-4 h-4" />
              <span>0888 123 345</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
