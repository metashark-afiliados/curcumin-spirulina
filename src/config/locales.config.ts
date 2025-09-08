// src/config/locales.config.ts
/**
 * @file src/config/locales.config.ts
 * @description Manifiesto de Configuración y Única Fuente de Verdad (SSoT) para
 *              todos los locales de la aplicación. Es un módulo isomórfico,
 *              seguro para ser consumido tanto por el servidor como por el cliente.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.1.0
 * @see .docs-espejo/config/locales.config.ts.md
 */
// "server-only" ha sido eliminado para resolver el conflicto de importación
// en componentes de cliente como global-error.tsx. Este módulo es universal.

export const LOCALES = {
  AF_ZA: { id: 1, code: "af-ZA", name: "Afrikaans (Sudáfrica)" },
  SQ_AL: { id: 2, code: "sq-AL", name: "Albanés (Albania)" },
  DE_DE: { id: 3, code: "de-DE", name: "Alemán (Alemania)" },
  AM_ET: { id: 4, code: "am-ET", name: "Amárico (Etiopía)" },
  AR_SA: { id: 5, code: "ar-SA", name: "Árabe (Arabia Saudita)" },
  HY_AM: { id: 6, code: "hy-AM", name: "Armenio (Armenia)" },
  AZ_AZ: { id: 7, code: "az-AZ", name: "Azerbaiyano (Azerbaiyán)" },
  BN_BD: { id: 8, code: "bn-BD", name: "Bengalí (Bangladesh)" },
  BE_BY: { id: 9, code: "be-BY", name: "Bielorruso (Bielorrusia)" },
  MY_MM: { id: 10, code: "my-MM", name: "Birmano (Myanmar)" },
  BS_BA: { id: 11, code: "bs-BA", name: "Bosnio (Bosnia y Herzegovina)" },
  BG_BG: { id: 12, code: "bg-BG", name: "Búlgaro (Bulgaria)" },
  KM_KH: { id: 13, code: "km-KH", name: "Camboyano (Camboya)" },
  KN_IN: { id: 14, code: "kn-IN", name: "Canarés (India)" },
  CA_ES: { id: 15, code: "ca-ES", name: "Catalán (España)" },
  CS_CZ: { id: 16, code: "cs-CZ", name: "Checo (República Checa)" },
  ZH_CN: { id: 17, code: "zh-CN", name: "Chino (Simplificado, China)" },
  ZH_TW: { id: 18, code: "zh-TW", name: "Chino (Tradicional, Taiwán)" },
  SI_LK: { id: 19, code: "si-LK", name: "Cingalés (Sri Lanka)" },
  KO_KR: { id: 20, code: "ko-KR", name: "Coreano (Corea del Sur)" },
  HR_HR: { id: 21, code: "hr-HR", name: "Croata (Croacia)" },
  DA_DK: { id: 22, code: "da-DK", name: "Danés (Dinamarca)" },
  SK_SK: { id: 23, code: "sk-SK", name: "Eslovaco (Eslovaquia)" },
  SL_SI: { id: 24, code: "sl-SI", name: "Esloveno (Eslovenia)" },
  ES_ES: { id: 25, code: "es-ES", name: "Español (España)" },
  ET_EE: { id: 26, code: "et-EE", name: "Estonio (Estonia)" },
  EU_ES: { id: 27, code: "eu-ES", name: "Euskera (España)" },
  FI_FI: { id: 28, code: "fi-FI", name: "Finlandés (Finlandia)" },
  FR_FR: { id: 29, code: "fr-FR", name: "Francés (Francia)" },
  GL_ES: { id: 30, code: "gl-ES", name: "Gallego (España)" },
  KA_GE: { id: 31, code: "ka-GE", name: "Georgiano (Georgia)" },
  EL_GR: { id: 32, code: "el-GR", name: "Griego (Grecia)" },
  GU_IN: { id: 33, code: "gu-IN", name: "Gujarati (India)" },
  HE_IL: { id: 34, code: "he-IL", name: "Hebreo (Israel)" },
  HI_IN: { id: 35, code: "hi-IN", name: "Hindi (India)" },
  NL_NL: { id: 36, code: "nl-NL", name: "Holandés (Países Bajos)" },
  HU_HU: { id: 37, code: "hu-HU", name: "Húngaro (Hungría)" },
  ID_ID: { id: 38, code: "id-ID", name: "Indonesio (Indonesia)" },
  EN_US: { id: 39, code: "en-US", name: "Inglés (EE. UU.)" },
  IS_IS: { id: 40, code: "is-IS", name: "Islandés (Islandia)" },
  IT_IT: { id: 41, code: "it-IT", name: "Italiano (Italia)" },
  JA_JP: { id: 42, code: "ja-JP", name: "Japonés (Japón)" },
  KK_KZ: { id: 43, code: "kk-KZ", name: "Kazajo (Kazajistán)" },
  LO_LA: { id: 44, code: "lo-LA", name: "Lao (Laos)" },
  LV_LV: { id: 45, code: "lv-LV", name: "Letón (Letonia)" },
  LT_LT: { id: 46, code: "lt-LT", name: "Lituano (Lituania)" },
  MK_MK: { id: 47, code: "mk-MK", name: "Macedonio (Macedonia del Norte)" },
  MS_MY: { id: 48, code: "ms-MY", name: "Malayo (Malasia)" },
  ML_IN: { id: 49, code: "ml-IN", name: "Malayalam (India)" },
  MR_IN: { id: 50, code: "mr-IN", name: "Maratí (India)" },
  MN_MN: { id: 51, code: "mn-MN", name: "Mongol (Mongolia)" },
  NE_NP: { id: 52, code: "ne-NP", name: "Nepalí (Nepal)" },
  NO_NO: { id: 53, code: "no-NO", name: "Noruego (Noruega)" },
  FA_IR: { id: 54, code: "fa-IR", name: "Persa (Irán)" },
  PL_PL: { id: 55, code: "pl-PL", name: "Polaco (Polonia)" },
  PT_BR: { id: 56, code: "pt-BR", name: "Português (Brasil)" },
  PA_IN: { id: 57, code: "pa-IN", name: "Punyabí (India)" },
  RO_RO: { id: 58, code: "ro-RO", name: "Rumano (Rumania)" },
  RU_RU: { id: 59, code: "ru-RU", name: "Ruso (Rusia)" },
  SR_RS: { id: 60, code: "sr-RS", name: "Serbio (Serbia)" },
  SW_KE: { id: 61, code: "sw-KE", name: "Suajili (Kenia)" },
  SV_SE: { id: 62, code: "sv-SE", name: "Sueco (Suecia)" },
  TL_PH: { id: 63, code: "tl-PH", name: "Tagalo (Filipinas)" },
  TA_IN: { id: 64, code: "ta-IN", name: "Tamil (India)" },
  TE_IN: { id: 65, code: "te-IN", name: "Telugu (India)" },
  TH_TH: { id: 66, code: "th-TH", name: "Tailandés (Tailandia)" },
  TR_TR: { id: 67, code: "tr-TR", name: "Turco (Turquía)" },
  UK_UA: { id: 68, code: "uk-UA", name: "Ucraniano (Ucrania)" },
  UR_PK: { id: 69, code: "ur-PK", name: "Urdu (Pakistán)" },
  UZ_UZ: { id: 70, code: "uz-UZ", name: "Uzbeko (Uzbekistán)" },
  VI_VN: { id: 71, code: "vi-VN", name: "Vietnamita (Vietnam)" },
  ZU_ZA: { id: 72, code: "zu-ZA", name: "Zulú (Sudáfrica)" },
} as const;

export const SUPPORTED_LOCALES = Object.values(LOCALES);
export const SUPPORTED_LOCALE_CODES = SUPPORTED_LOCALES.map((l) => l.code);
export const DEFAULT_LOCALE = LOCALES.ES_ES;
export type AppLocale = (typeof SUPPORTED_LOCALE_CODES)[number];
// src/config/locales.config.ts
