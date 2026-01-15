import { Phone, FileText, Sparkles } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Phone,
    title: "Свържете се с нас",
    description: "Обадете се или изпратете запитване онлайн. Ще отговорим бързо на всички ваши въпроси.",
  },
  {
    number: 2,
    icon: FileText,
    title: "Даваме оферта",
    description: "Предоставяме безплатна оценка и детайлна оферта, съобразена с вашите нужди.",
  },
  {
    number: 3,
    icon: Sparkles,
    title: "Извършваме почистването",
    description: "Нашият екип идва на уговорената дата и време. Вие се наслаждавате на чистотата!",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-gradient-to-br from-teal-50/50 via-white to-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Как{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              работим
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Три лесни стъпки до перфектната чистота
          </p>
        </div>

        {/* 3-step process */}
        <div className="relative">
          {/* Connecting line - hidden on mobile */}
          <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-teal-200 via-blue-200 to-teal-200" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative text-center">
                  {/* Step number badge */}
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-teal-100">
                      <Icon className="w-8 h-8 text-teal-600" />
                    </div>
                    {/* Number badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-sm">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>

                  {/* Arrow for mobile - between steps */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-6">
                      <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA button */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Започнете сега
          </a>
        </div>
      </div>
    </section>
  );
}
