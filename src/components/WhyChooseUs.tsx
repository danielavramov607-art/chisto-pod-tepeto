import { Wrench, Leaf, Clock, MapPin, CalendarCheck } from "lucide-react";

const reasons = [
  {
    icon: Wrench,
    title: "Професионално оборудване",
    description: "Използваме модерна техника и машини за почистване",
  },
  {
    icon: Leaf,
    title: "Еко препарати",
    description: "Безопасни за здравето и околната среда продукти",
  },
  {
    icon: Clock,
    title: "Спазваме срокове",
    description: "Винаги навреме и с гаранция за качество",
  },
  {
    icon: MapPin,
    title: "Пловдив и региона",
    description: "Обслужваме целия Пловдив и околните селища",
  },
  {
    icon: CalendarCheck,
    title: "Абонаментни планове",
    description: "Изгодни оферти за редовно почистване",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-16 lg:py-24 bg-gradient-to-b from-blue-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Защо да изберете{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              нас
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Доверете се на нашия опит и професионализъм
          </p>
        </div>

        {/* 5-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-teal-200 text-center"
              >
                {/* Icon */}
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-teal-600" />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
