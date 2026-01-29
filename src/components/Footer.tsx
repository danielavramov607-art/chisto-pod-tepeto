import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";

const services = [
  { href: "/#services", label: "Почистване на домове" },
  { href: "/#services", label: "Офис почистване" },
  { href: "/#services", label: "Пране на мека мебел" },
  { href: "/#services", label: "Следремонтно почистване" },
];

const contactInfo = [
  {
    icon: Phone,
    text: "0888 123 345",
    href: "tel:0888123345",
  },
  {
    icon: Mail,
    text: "info@chistopodtepeto.bg",
    href: "mailto:info@chistopodtepeto.bg",
  },
  {
    icon: MapPin,
    text: "гр. Пловдив",
    href: null,
  },
  {
    icon: Clock,
    text: "Пон - Нед: 08:00 - 20:00",
    href: null,
  },
];

const socials = [
  {
    icon: Facebook,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Branding */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center justify-between">
            <Link href="/" className="inline-block">
              <Image
                src="/logo_navbar.png"
                alt="Чисто под Тепето"
                width={180}
                height={48}
                className="w-40 h-auto brightness-0 invert"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed text-center max-w-50">
              Професионално почистване
              <br />
              за вашия дом и бизнес в Пловдив.
            </p>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Услуги</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <ul className="space-y-3">
              {contactInfo.map((item) => {
                const IconComponent = item.icon;
                const content = (
                  <span className="flex items-start gap-3 text-slate-400 text-sm group-hover:text-white transition-colors">
                    <IconComponent className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                    <span>{item.text}</span>
                  </span>
                );

                return (
                  <li key={item.text}>
                    {item.href ? (
                      <a href={item.href} className="group">
                        {content}
                      </a>
                    ) : (
                      <span className="group">{content}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Последвайте ни</h3>
            <div className="flex gap-4">
              {socials.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 bg-slate-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p>© 2026 Чисто под Тепето. Всички права запазени.</p>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Политика за поверителност
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
