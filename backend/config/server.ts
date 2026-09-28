import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS')!,
  },
  // Обязательно для Docker + реверс-прокси (Dockploy/Traefik/nginx).
  // Без этого Strapi считает, что его зовут по внутреннему имени контейнера,
  // и собирает абсолютные URL для редиректов, cookie и статики админки
  // вида http://backend:1337/admin - такие ссылки не открываются снаружи.
  proxy: env.bool('STRAPI_BEHIND_PROXY', false),
  // Публичный адрес API. '/' = Strapi не подставляет префикс.
  // Если админка живёт на отдельном поддомене, укажи здесь полный URL.
  url: env('STRAPI_PUBLIC_URL', '/'),
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

export default config;
