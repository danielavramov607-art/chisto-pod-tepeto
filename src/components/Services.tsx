"use client";

import { useState, useEffect } from "react";
import { Home, Sofa, Layers, Hammer, ArrowRight, X } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Почистване на домове и офиси",
    description:
      "Цялостно почистване на жилища и офис пространства. Използваме професионални препарати и техники за безупречен резултат.",
    modalType: "home",
  },
  {
    icon: Sofa,
    title: "Пране на мека мебел",
    description:
      "Дълбоко почистване на дивани, фотьойли и матраци. Премахваме петна, миризми и алергени ефективно.",
    modalType: "furniture",
  },
  {
    icon: Layers,
    title: "Пране на килими и мокети",
    description:
      "Професионално изпиране на килими и мокети на място или в нашата база. Възстановяваме първоначалния вид и свежест.",
    modalType: "carpet",
  },
  {
    icon: Hammer,
    title: "Почистване след ремонт",
    description:
      "Основно почистване след строителни и ремонтни дейности. Премахваме прах, замърсявания и строителни отпадъци.",
    modalType: "renovation",
  },
];

function HomeCleaningModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-500 to-blue-500 flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Почистване на домове и офиси
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Затвори"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-8">
          {/* Основно почистване */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              Основно (еднократно) почистване
            </h3>
            <div className="space-y-3 pl-4">
              <div>
                <p className="font-semibold text-slate-900">Описание:</p>
                <p className="text-gray-600">
                  Цялостно почистване на жилище или офис – подходящо при силно замърсяване, след наематели, преди/след нанасяне или когато просто искате пълно освежаване.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Включва:</p>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Всички помещения</li>
                  <li>Детайлно почистване на кухня и баня</li>
                  <li>Подове, повърхности, врати, ключове</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Абонаментно почистване */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Абонаментно (редовно) почистване
            </h3>
            <div className="space-y-3 pl-4">
              <div>
                <p className="font-semibold text-slate-900">Описание:</p>
                <p className="text-gray-600">
                  Редовно поддържащо почистване – седмично, два пъти седмично, или по график, съобразен с вашите нужди.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Подходящо за:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">Офиси</span>
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">Входове</span>
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">Airbnb апартаменти</span>
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">Домове</span>
                </div>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Предимства:</p>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>По-ниска цена на посещение</li>
                  <li>Винаги поддържана чистота</li>
                  <li>Приоритетно обслужване</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-6 py-4 rounded-b-2xl">
          <a
            href="#contact"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center px-6 py-3 text-white font-semibold bg-linear-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 rounded-full transition-all duration-300"
          >
            Запитване за оферта
          </a>
        </div>
      </div>
    </div>
  );
}

function FurnitureCleaningModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-500 to-blue-500 flex items-center justify-center">
              <Sofa className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Пране на мека мебел
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Затвори"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-8">
          {/* Дълбоко екстракционно почистване */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              Дълбоко екстракционно почистване
            </h3>
            <div className="space-y-3 pl-4">
              <div>
                <p className="font-semibold text-slate-900">Описание:</p>
                <p className="text-gray-600">
                  Професионално машинно пране чрез метода на екстракцията – най-ефективният начин за премахване на натрупаната мръсотия в дълбочина на тъканите.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Какво почистваме:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">Дивани (ъглови и прави)</span>
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">Фотьойли</span>
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">Матраци (еднолицеви и двулицеви)</span>
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">Тапицирани столове и табуретки</span>
                </div>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Включва:</p>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Машинно впръскване на препарат</li>
                  <li>Детайлно изсмукване на замърсяванията</li>
                  <li>Третиране на упорити петна и неприятни миризми</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Защо да изберете машинно пране? */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Защо да изберете машинно пране?
            </h3>
            <div className="space-y-3 pl-4">
              <div>
                <p className="font-semibold text-slate-900">Здраве:</p>
                <p className="text-gray-600">
                  Премахване на акари, прах и алергени, което е критично за хора с алергии и малки деца.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Свежест:</p>
                <p className="text-gray-600">
                  Възстановяване на оригиналния цвят на текстила и оставяне на дълготраен свеж аромат.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Екологичност:</p>
                <p className="text-gray-600">
                  Използваме само сертифицирани, биоразградими препарати, безопасни за домашни любимци.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-6 py-4 rounded-b-2xl">
          <a
            href="#contact"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center px-6 py-3 text-white font-semibold bg-linear-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 rounded-full transition-all duration-300"
          >
            Запитване за оферта
          </a>
        </div>
      </div>
    </div>
  );
}

function CarpetCleaningModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-500 to-blue-500 flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Пране на килими и мокети
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Затвори"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-8">
          {/* Професионално изпиране */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              Професионално изпиране на килими и мокети
            </h3>
            <div className="space-y-3 pl-4">
              <div>
                <p className="font-semibold text-slate-900">Описание:</p>
                <p className="text-gray-600">
                  Предлагаме гъвкави решения за вашите подови настилки, като съобразяваме метода на пране спрямо материята и степента на замърсяване.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Варианти на услугата:</p>
                <div className="space-y-3 mt-2">
                  <div className="bg-teal-50 rounded-lg p-3">
                    <p className="font-semibold text-slate-900">На място:</p>
                    <p className="text-gray-600 text-sm">
                      Машинно изпиране с екстракция за мокети и големи килими, които не могат да бъдат местени. Идеално за офиси и големи домове.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="font-semibold text-slate-900">В нашата база:</p>
                    <p className="text-gray-600 text-sm">
                      Вземане на килимите от ваш адрес, професионално изпиране в специализирана база и връщане в чист и свеж вид.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Процес на работа */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Процес на работа
            </h3>
            <div className="space-y-3 pl-4">
              <div>
                <p className="font-semibold text-slate-900">Дълбоко почистване:</p>
                <p className="text-gray-600">
                  Мощно изсмукване на набития прах и пясък, следвано от изпиране с професионални машини.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Премахване на петна:</p>
                <p className="text-gray-600">
                  Специализирано третиране на петна от кафе, вино, храна и домашни любимци.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Бързо съхнене:</p>
                <p className="text-gray-600">
                  Благодарение на мощната ни техника, остатъчната влага е минимална, което съкращава времето за изсъхване.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-6 py-4 rounded-b-2xl">
          <a
            href="#contact"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center px-6 py-3 text-white font-semibold bg-linear-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 rounded-full transition-all duration-300"
          >
            Запитване за оферта
          </a>
        </div>
      </div>
    </div>
  );
}

function RenovationCleaningModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-500 to-blue-500 flex items-center justify-center">
              <Hammer className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Почистване след ремонт
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Затвори"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-8">
          {/* Професионално почистване след строителство */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              Професионално почистване след строителство и ремонт
            </h3>
            <div className="space-y-3 pl-4">
              <div>
                <p className="font-semibold text-slate-900">Описание:</p>
                <p className="text-gray-600">
                  Специализирана услуга за премахване на фин строителен прах и упорити замърсявания, които стандартното почистване не може да отстрани.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Какво включва:</p>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Машинно почистване на твърди подови настилки</li>
                  <li>Обезпрашаване на стени, тавани и всички повърхности</li>
                  <li>Почистване на прозорци, дограми и первази (премахване на стикери, лепило и пръски от боя)</li>
                  <li>Детайлно почистване и дезинфекция на санитарни възли</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Защо да се доверите на професионалисти? */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Защо да се доверите на професионалисти?
            </h3>
            <div className="space-y-3 pl-4">
              <div>
                <p className="font-semibold text-slate-900">Специализирана техника:</p>
                <p className="text-gray-600">
                  Използваме индустриални прахосмукачки и машини, които улавят най-фините частици прах.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Професионални препарати:</p>
                <p className="text-gray-600">
                  Безопасно премахваме остатъци от цимент, фугираща смес, силикон и монтажна пяна без риск за повърхностите.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Готовност за нанасяне:</p>
                <p className="text-gray-600">
                  След нас домът или офисът ви са напълно готови за обзавеждане и живеене.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-6 py-4 rounded-b-2xl">
          <a
            href="#contact"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center px-6 py-3 text-white font-semibold bg-linear-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 rounded-full transition-all duration-300"
          >
            Запитване за оферта
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <section id="services" className="py-16 lg:py-24 bg-linear-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Нашите{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-blue-600">
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
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-teal-500 to-blue-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
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
                <button
                  onClick={service.modalType ? () => setActiveModal(service.modalType) : undefined}
                  className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors duration-200 group/btn"
                >
                  Виж повече
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <HomeCleaningModal isOpen={activeModal === "home"} onClose={() => setActiveModal(null)} />
      <FurnitureCleaningModal isOpen={activeModal === "furniture"} onClose={() => setActiveModal(null)} />
      <CarpetCleaningModal isOpen={activeModal === "carpet"} onClose={() => setActiveModal(null)} />
      <RenovationCleaningModal isOpen={activeModal === "renovation"} onClose={() => setActiveModal(null)} />
    </section>
  );
}
