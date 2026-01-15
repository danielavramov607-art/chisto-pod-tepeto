"use client";

import { Home, Sofa, Layers, Hammer, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Почистване на домове и офиси",
    description:
      "Цялостно почистване на жилища и офис пространства. Използваме професионални препарати и техники за безупречен резултат.",
  },
  {
    icon: Sofa,
    title: "Пране на мека мебел",
    description:
      "Дълбоко почистване на дивани, фотьойли и матраци. Премахваме петна, миризми и алергени ефективно.",
  },
  {
    icon: Layers,
    title: "Пране на килими и мокети",
    description:
      "Професионално изпиране на килими и мокети на място или в нашата база. Възстановяваме първоначалния вид и свежест.",
  },
  {
    icon: Hammer,
    title: "Почистване след ремонт",
    description:
      "Основно почистване след строителни и ремонтни дейности. Премахваме прах, замърсявания и строителни отпадъци.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Нашите{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              услуги
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Предлагаме професионални почистващи услуги за дома и бизнеса в Пловдив и региона
          </p>
        </div>

        {/* Services grid - 2x2 on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Button */}
                <button className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors duration-200 group/btn">
                  Виж повече
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
