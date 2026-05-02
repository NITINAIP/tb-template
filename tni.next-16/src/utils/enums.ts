/* eslint-disable no-unused-vars */

export enum ActionType {
  ADD = "add",
  VIEW = "view",
  EDIT = "edit",
  DELETE = "delete"
}

export enum StaticPath {
  PROVINCES = "/provinces",
  DISTRICTS = "/districts",
  SUB_DISTRICTS = "/subdistricts",
  OCCUPATIONS = "/occupations",
  Titles = "/titles",
  Relations = "/relations",
  Users = "/users",
  CERTIFICATES = "/certificates",
  BankCodes = "/bank-codes",
  Mappings = "/mappings"
}

export enum DialogStatus {
  SUCCESS = "success",
  WARN = "warn",
  ERROR = "error"
}
export enum PERMISSION {
  VIEW = "VIEW",
  EDIT = "EDIT",
  NEW = "NEW",
  EXPORT_EXCEL = "EXPORT_EXCEL",
  EXPORT_ZIP = "EXPORT_ZIP"
}
export enum PERMISSION_MODULE {
  LOG_SYSTEM = "LOG_SYSTEM",
  SEARCH_DOCTYPE = "SEARCH_DOCTYPE",
  SETUP_MASTER_DOCUMENT = "SETUP_MASTER_DOCUMENT",
  SETUP_AREA = "SETUP_AREA",
  SETUP_AREAACD = "SETUP_AREAACD",
  SETUP_BANK = "SETUP_BANK",
  SETUP_BRANCH = "SETUP_BRANCH",
  SETUP_CATEGORY = "SETUP_CATEGORY",
  SETUP_DOCUMENT_DOWNLOAD_GROUP = "SETUP_DOCUMENT_DOWNLOAD_GROUP",
  USER_MANAGEMENT = "USER_MANAGEMENT"
}
export enum MASK_INPUT {
  EN_ONLY,
  TH_ONLY,
  NUM_ONLY,
  CODE,
  DEFAULT
}

export type PERMISSION_MODULE_ACTIVE = {
  [key in PERMISSION_MODULE]: boolean;
};
export type PERMISSION_MODULE_LIST = {
  [key in PERMISSION_MODULE]?: string[];
};
