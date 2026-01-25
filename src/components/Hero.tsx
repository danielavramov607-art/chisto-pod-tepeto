import Image from "next/image";
import { Phone } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/50 to-teal-50/70" />

      {/* Abstract wave shapes */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-auto"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          className="fill-teal-100/60"
        />
        <path
          d="M0,256L48,261.3C96,267,192,277,288,272C384,267,480,245,576,234.7C672,224,768,224,864,234.7C960,245,1056,267,1152,261.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          className="fill-blue-100/50"
        />
      </svg>

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              ЧИСТО ПОД{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                ТЕПЕТО
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
              Професионално почистване
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Запитване за оферта
              </a>

              <a
                href="tel:0888123345"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                Обади се сега
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-slate-900">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Безплатен оглед и оферта</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Екологични препарати</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Гарантирано качество</span>
              </div>
            </div>
          </div>

          {/* Right side - Image placeholder */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-xl">
              {/* Image container with decorative elements */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/Gemini_Generated_Image_5hyqx65hyqx65hyq.png"
                  alt="Екип на Чисто под тепето"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
