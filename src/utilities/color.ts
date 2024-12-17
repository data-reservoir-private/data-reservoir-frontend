import { COLOR_CLASS, COLOR_HEX } from "@/constant/color";

export function getCategoryColorHex(str: string) {
  return str in COLOR_HEX ? COLOR_HEX[str as keyof typeof COLOR_HEX] : COLOR_HEX.Default; 
}
export function getCategoryColorClass(str: string) {
  return str in COLOR_CLASS ? COLOR_CLASS[str as keyof typeof COLOR_CLASS] : COLOR_CLASS.Default;
}