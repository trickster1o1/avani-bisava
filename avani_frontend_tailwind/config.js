import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.API_PRODUCTION
  : publicRuntimeConfig.API_DEVELOPMENT;

export const baseUrl = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.BASE_URL_PRODUCTION
  : publicRuntimeConfig.BASE_URL_DEVELOPMENT;

export const APP_NAME = publicRuntimeConfig.APP_NAME;
