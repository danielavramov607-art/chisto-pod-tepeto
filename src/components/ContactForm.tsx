"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Loader2, Gift } from "lucide-react";
import toast from "react-hot-toast";
import { submitLead } from "@/app/actions/submitLead";

const serviceOptions = [
  { value: "", label: "Изберете услуга" },
  { value: "home-office", label: "Почистване на домове и офиси" },
  { value: "furniture", label: "Пране на мека мебел" },
  { value: "carpets", label: "Пране на килими и мокети" },
  { value: "renovation", label: "Почистване след ремонт" },
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [isPromo, setIsPromo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceType: "",
    preferredDateTime: "",
    message: "",
  });

  useEffect(() => {
    const promoParam = searchParams.get("promo");
    setIsPromo(promoParam === "true");
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitLead(formData, isPromo);

      if (result.success) {
        toast.success(result.message);
        setFormData({ name: "", phone: "", serviceType: "", preferredDateTime: "", message: "" });
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Възникна грешка. Моля, опитайте отново.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-linear-to-b from-white to-teal-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
              Свържете се{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-blue-600">
                с нас
              </span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Изпратете ни запитване и ще се свържем с вас в най-кратък срок с безплатна оферта.
            </p>

            {/* Contact info */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="font-medium">0888 123 345</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="font-medium">Пловдив и региона</span>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-100">
            {/* Promo Badge */}
            {isPromo && (
              <div className="mb-6 flex items-center gap-2 bg-linear-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl">
                <Gift className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-sm font-medium">
                  Вие кандидатствате за <strong>-20% отстъпка</strong> от кампанията &quot;Първите 10&quot;!
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Вашето име *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-200 text-black placeholder:text-gray-400"
                  placeholder="Иван Иванов"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-200 text-black placeholder:text-gray-400"
                  placeholder="0888 123 456"
                />
              </div>

              {/* Service Type */}
              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                  Тип услуга *
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-200 bg-white text-black"
                >
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Date and Time */}
              <div>
                <label htmlFor="preferredDateTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Предпочитана дата и час
                </label>
                <input
                  type="datetime-local"
                  id="preferredDateTime"
                  name="preferredDateTime"
                  value={formData.preferredDateTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-200 text-black"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Съобщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-200 resize-none text-black placeholder:text-gray-400"
                  placeholder="Опишете какво имате нужда..."
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold text-white bg-linear-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Изпращане...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Изпрати запитване
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
