import { DropdownOptions } from "@/app/components/Dropdown";
import { Option } from "./types";
import { MASK_INPUT } from "./enums";
import { Replacement } from "@react-input/mask";
import { AxiosResponse } from "axios";

export const SEARCH_EN: string = "Search";
export const CLEAR_EN: string = "CLEAR";
export const RESET_EN: string = "Reset";
export const TABLE_DETAIL_TITLE: string = "ตารางละเอียด";
export const NO_DATA: string = "NO DATA";
export const CANCEL_LABEL: string = "ยกเลิก";
export const CLOSE_LABEL: string = "ปิด";
export const CONFIRM_LABEL: string = "ยืนยัน";
export const BACK_LABEL: string = "กลับ";
export const LOGIN_LABEL: string = "Login";
export const EDIT_LABEL: string = "แก้ไข";
export const SAVE_LABEL: string = "บันทึก";
export const ADD_LABEL: string = "เพิ่ม";
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
export const MAIN_CLASS_OPTIONS: Option[] = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" }
];

export const GENDER_OPTIONS: Option[] = [
  { label: "F", value: "F" },
  { label: "M", value: "M" }
];
export const FILE_MAPPER = new Map([["PNG", "data:image/png"]]);
export const DEFAULT_PER_PAGE = 50;
export const DEFAULT_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100];
export const DEFAULT_TIMEOUT_EXPORT = { timeout: 50000 };
export const DEFAULT_All_VALUE = "99999";
export const TIMEOUT_ERROR_MESSAGE =
  "ขออภัยในความไม่สะดวก กรุณาลองใหม่อีกครั้ง";
export const TEMPLATE_ERROR_MESSAGE = {
  NOT_FOUND: "{Messages} not found in the system"
};
export const DEFAULT_PROVINCE_OPTION: DropdownOptions = {
  value: "00",
  label: "เลือกทุกจังหวัด",
  id: "db52a5ef-30a3-4054-9d88-d22f65e23178"
};

export const DEFAULT_DISTRINCT_OPTION: DropdownOptions = {
  value: "00",
  label: "เลือกทุกอำเภอ",
  id: "0000"
};

export const DEFAULT_MAPPINGS_OPTION: DropdownOptions[] = [
  {
    value: "Occupation",
    id: "OCCUPATION"
  },
  {
    value: "Prefix",
    id: "PREFIX"
  },
  {
    value: "Relationship",
    id: "RELATIONSHIP"
  }
];
export const REPLACEMENT = new Map<MASK_INPUT, Replacement>([
  [MASK_INPUT.NUM_ONLY, { _: /\d/ }],
  [MASK_INPUT.EN_ONLY, { _: /^[A-Za-z]+$/ }],
  [MASK_INPUT.TH_ONLY, { _: /^[\u0E00-\u0E7F\.]+$/ }],
  [MASK_INPUT.CODE, { _: /^[A-Za-z\d]+$/ }],
  [MASK_INPUT.DEFAULT, { _: /./ }]
]);
export const createMask = (len: number) => new Array(len).fill("_").join("");
type AxiosErrorResponse = {
  response: AxiosResponse<{ data: any; message: string }>;
};
export const isErrorAxiosResponse = (
  value: unknown
): value is AxiosErrorResponse =>
  typeof value === "object" && value !== null && "response" in value;
export const maskLen = {
  _4: createMask(4),
  _20: createMask(20),
  _50: createMask(50),
  _10: createMask(10),
  _100: createMask(100),
  _255: createMask(255)
};
