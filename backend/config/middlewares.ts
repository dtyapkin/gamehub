import type { Core } from '@strapi/strapi';

// CORS_ORIGIN приходит из .env одной строкой: либо "*", либо список
// доменов через запятую. Strapi ждёт массив origins, а не строку, поэтому
// список надо разобрать руками - иначе "https://a.com,https://b.com"
// будет трактоваться как один несуществующий домен и CORS перестанет работать.
const corsOrigin = (process.env.CORS_ORIGIN || '*')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    // Фронтенд ходит в Strapi server-side, поэтому браузерный CORS ему не
    // нужен. Но админка и любые клиентские запросы к /api идут из браузера
    // с домена сайта - им заголовки Allow-Origin нужны обязательно.
    // Один разрешённый домен удобно отдать строкой, несколько - массивом.
    name: 'strapi::cors',
    config: {
      origin: corsOrigin.length === 1 ? corsOrigin[0] : corsOrigin,
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
