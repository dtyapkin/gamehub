import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET')!,
  },
  // Публичный URL админки. Если Dockploy отдаёт /admin на отдельном
  // поддомене (admin.example.com), укажи его здесь - иначе после логина
  // Strapi сделает редирект на http://backend:1337/admin и закинет
  // на внутренний адрес, недоступный из браузера.
  url: env('STRAPI_ADMIN_URL', '/admin'),
  apiToken: {
    salt: env('API_TOKEN_SALT')!,
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT')!,
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY')!,
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    docLinks: env.bool('FLAG_DOC_LINKS', true),
  },
});

export default config;
