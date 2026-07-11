import { personalConfig } from "./personal";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: personalConfig.site.name,
  description: personalConfig.site.description,
  url: personalConfig.site.url,
  keywords: personalConfig.site.keywords,
  author: personalConfig.site.author,
  links: {
    github: personalConfig.links.github,
    email: personalConfig.links.email,

    steam: personalConfig.links.steam,
    wechat: personalConfig.links.wechat,
    qq: personalConfig.links.qq,
    bilibili: personalConfig.links.bilibili,
    tiktok: personalConfig.links.tiktok,
    luogu: personalConfig.links.luogu,
  },
};
