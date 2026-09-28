interface AdPlacement {
  id: number;
  documentId?: string; // Есть в Strapi v5
  attributes?: {
    Page: string;
    Position: string;
    YandexBlockID: string;
    IsActive: boolean;
  };
  // Поля напрямую (для Strapi v5)
  Page?: string;
  Position?: string;
  YandexBlockID?: string;
  IsActive?: boolean;
}

let cachedAds: Record<string, Record<string, string>> | null = null;
let cacheTime = 0;
const CACHE_TTL = 3600 * 1000; // 1 час

export async function getAdsForPage(page: string): Promise<Record<string, string>> {
  const now = Date.now();

  if (cachedAds && now - cacheTime < CACHE_TTL) {
    return cachedAds[page] || {};
  }

  const apiUrl = process.env.STRAPI_API_URL;
  
  if (!apiUrl) {
    console.error('❌ STRAPI_API_URL не задана в .env.local');
    return {};
  }

  try {
    // ВАЖНО: Убедитесь, что 'ad-placements' точно совпадает с API ID вашей коллекции в Strapi
    // (Settings -> Collection Types -> AdPlacement -> Advanced Settings -> API ID)
    const res = await fetch(
      `${apiUrl}/api/ad-placements?filters[IsActive][$eq]=true&pagination[pageSize]=100`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error(`❌ Ошибка запроса к Strapi: ${res.status} ${res.statusText}`);
      return {};
    }

    const data = await res.json();

    // 🔍 РАСКОММЕНТИРУЙТЕ ЭТУ СТРОКУ НА 1 СЕКУНДУ, чтобы увидеть в консоли, что именно присылает Strapi:
    // console.log('📦 RAW Strapi Response:', JSON.stringify(data, null, 2));

    const grouped: Record<string, Record<string, string>> = {};

    // Безопасная обработка массива
    const items = Array.isArray(data.data) ? data.data : [];

    items.forEach((item: any) => {
      // Магия совместимости: берем attributes (Strapi v4) или сам item (Strapi v5)
      const attrs = item.attributes || item;

      if (!attrs) return; // Пропускаем битые записи

      const { Page, Position, YandexBlockID, IsActive } = attrs;

      // Строгая проверка, что все нужные поля существуют
      if (Page && Position && YandexBlockID && IsActive !== false) {
        if (!grouped[Page]) {
          grouped[Page] = {};
        }
        grouped[Page][Position] = YandexBlockID;
      }
    });

    // Пустой результат НЕ кэшируем. Иначе ситуация "база ещё не
    // мигрирована" залипает на час: контейнер закеширует {} и продолжит
    // отдавать пустую рекламу даже после импорта данных.
    if (Object.keys(grouped).length > 0) {
      cachedAds = grouped;
      cacheTime = now;
    }

    return grouped[page] || {};
  } catch (error) {
    console.error('❌ Критическая ошибка при получении рекламы:', error);
    return {};
  }
}