export default function getBoundedInteger(
  value: string,
  minimum: number,
  maximum: number,
  emptyValue?: number,
) {
  const cleanedValue = value.replace(/\D/g, "");
  if (cleanedValue === "") return emptyValue;

  const parsedValue = Number.parseInt(cleanedValue, 10);
  if (Number.isNaN(parsedValue)) return emptyValue;
  return Math.min(maximum, Math.max(minimum, parsedValue));
}
