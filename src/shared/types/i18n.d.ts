// src/i18n.d.ts
import "i18next";
import type Resources from "./resources";
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "about";
    resources: Resources;
  }
}
