import type { Core } from '@strapi/strapi';

// Публичные права на рекламные слоты. Без них /api/ad-placements отдаёт 403
// и на сайте не появляется ни одного блока. Права выдаются здесь, а не вручную
// в админке, чтобы чистая установка на VPS сразу работала: иначе всё держится
// на строках в базе, которые теряются вместе с дампом или при сбросе БД.
const AD_PLACEMENT_UID = 'api::ad-placement.ad-placement';
const PUBLIC_ACTIONS = ['find', 'findOne'];

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const role = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!role) {
      strapi.log.warn('[bootstrap] Public-роль не найдена, права не выданы');
      return;
    }

    const granted = (await strapi.db
      .query('plugin::users-permissions.role')
      .load({ id: role.id }, 'permissions')) as Array<{ action: string }>;

    const already = new Set(granted.map((permission) => permission.action));

    for (const action of PUBLIC_ACTIONS) {
      const fullAction = `${AD_PLACEMENT_UID}.${action}`;

      if (already.has(fullAction)) {
        continue;
      }

      await strapi.db
        .query('plugin::users-permissions.permission')
        .create({ data: { action: fullAction, role: role.id } });

      strapi.log.info(`[bootstrap] Public-роли выдано право: ${fullAction}`);
    }
  },
};
