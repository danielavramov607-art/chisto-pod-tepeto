import { getSupabaseServiceClient } from "@/lib/supabase";
import Link from "next/link";
import { Gift, Star, CheckCircle, Clock, Sparkles } from "lucide-react";

const TOTAL_PROMO_SLOTS = 10;

async function getPromoLeadsCount(): Promise<number> {
  try {
    const supabase = getSupabaseServiceClient();
    const { count, error } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("is_promo", true);

    if (error) {
      console.error("[Reviews] Error fetching promo leads count:", error);
      return 0;
    }

    return count ?? 0;
  } catch (error) {
    console.error("[Reviews] Failed to get promo leads count:", error);
    return 0;
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ReviewsPage() {
  const filledSlots = await getPromoLeadsCount();
  const availableSlots = TOTAL_PROMO_SLOTS - filledSlots;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-teal-50/30">
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Gift className="w-4 h-4" />
            <span>Ексклузивна оферта</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Първите{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-500">
              10 клиенти
            </span>{" "}
            получават
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              -20% отстъпка
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Стартираме с VIP кампания! Бъдете сред първите 10 клиенти и получете
            20% отстъпка от първата си услуга. Качество, гарантирано от нас!
          </p>

          {/* Counter Display */}
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-4 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600">{filledSlots}</div>
              <div className="text-sm text-gray-500">заети</div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500">{availableSlots}</div>
              <div className="text-sm text-gray-500">свободни</div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-400">{TOTAL_PROMO_SLOTS}</div>
              <div className="text-sm text-gray-500">общо</div>
            </div>
          </div>
        </div>
      </section>

      {/* Slots Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            VIP места
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {Array.from({ length: TOTAL_PROMO_SLOTS }).map((_, index) => {
              const slotNumber = index + 1;
              const isFilled = index < filledSlots;

              return (
                <div
                  key={slotNumber}
                  className={`relative rounded-2xl p-4 transition-all duration-300 ${
                    isFilled
                      ? "bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-200"
                      : "bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 hover:border-green-400 hover:shadow-lg hover:scale-105"
                  }`}
                >
                  {/* Slot Number Badge */}
                  <div
                    className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isFilled
                        ? "bg-gray-300 text-gray-600"
                        : "bg-gradient-to-r from-teal-500 to-green-500 text-white"
                    }`}
                  >
                    {slotNumber}
                  </div>

                  <div className="flex flex-col items-center text-center pt-2">
                    {isFilled ? (
                      <>
                        <CheckCircle className="w-10 h-10 text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-gray-500">
                          Заето място
                        </span>
                        <span className="text-xs text-gray-400 mt-1">
                          №{slotNumber}
                        </span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-10 h-10 text-green-500 mb-2" />
                        <span className="text-sm font-semibold text-green-700">
                          Свободно!
                        </span>
                        <Link
                          href="/?promo=true#contact"
                          className="mt-2 text-xs bg-gradient-to-r from-teal-500 to-green-500 text-white px-3 py-1.5 rounded-full font-medium hover:from-teal-600 hover:to-green-600 transition-all"
                        >
                          Заяви сега
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {availableSlots > 0 ? (
            <div className="mt-12 text-center">
              <Link
                href="/?promo=true#contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Gift className="w-5 h-5" />
                Заяви своето място с -20% отстъпка
              </Link>
              <p className="mt-4 text-sm text-gray-500">
                Остават само {availableSlots} свободни места!
              </p>
            </div>
          ) : (
            <div className="mt-12 text-center bg-gray-100 rounded-2xl p-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                Кампанията приключи!
              </h3>
              <p className="text-gray-500 mb-4">
                Всички 10 VIP места са заети. Но все пак можете да се свържете с нас!
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-full transition-all"
              >
                Свържете се с нас
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Защо да изберете нас?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: "Качествено почистване",
                description:
                  "Използваме професионални препарати и оборудване за безупречен резултат.",
              },
              {
                icon: CheckCircle,
                title: "Гаранция за качество",
                description:
                  "Ако не сте доволни, ще почистим отново безплатно!",
              },
              {
                icon: Clock,
                title: "Гъвкав график",
                description:
                  "Работим в удобно за вас време, включително почивни дни.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-green-50 border border-teal-100"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
