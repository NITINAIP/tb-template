import z from "zod";

export const formatNumber = (value: number | string): string | number => {
  return Number(value).toLocaleString();
};

export function formatDate(value: string | number | Date): string {
  const date = new Date(value);

  if (isNaN(date.getTime())) return String(value);

  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

export const toBuddhistYear = (gregorian: string | number) => {
  return (Number(gregorian) + 543).toString();
};
export const isPhoneTh = (value: string) =>
  /^0[689]\d-?\d{3}-?\d{4}$/g.test(value);

export const uuid = () => window.crypto.randomUUID();
type ErrorMap<T extends object> = Partial<Record<keyof T, string>>;

export const toErrorMap = <T extends object>(
  error: z.ZodError<T>
): ErrorMap<T> => {
  const { fieldErrors } = z.flattenError(error);
  const out: Partial<Record<keyof T, string>> = {};

  for (const key of Object.keys(fieldErrors) as Array<keyof T>) {
    const first = fieldErrors[key]?.[0];
    if (first) out[key] = first;
  }

  return out;
};
export const validate = (_value: any, schema: z.ZodObject) => {

  const result = schema.safeParse(_value);
  let errors: unknown | null = null;
  if (!result.success) {
    errors = toErrorMap(result.error);
  }
  return { invalid: !result.success, errors: errors };
};
