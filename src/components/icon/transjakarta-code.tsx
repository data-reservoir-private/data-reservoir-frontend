import { Box } from "@mui/material";
import clsx from "classnames";

export default function TransjakartaCodeIcon({
  code,
  color,
  size = 'md',
  className
}: {
  code: string;
  color: string;
  size?: 'md' | 'sm'
  className?: string;
}) {
  return (
    <Box
      className={clsx(
        "font-[PT_Sans] font-bold rounded-full flex items-center justify-center p-2 hover:opacity-75 transition-all",
        {
          "w-16 h-16 text-2xl": code.length <= 2 && size === 'md',
          "w-16 h-16 text-xl": code.length === 3 && size === 'md',
          "w-16 h-16 text-md": code.length <= 6 && code.length > 3 && size === 'md',
          "w-16 h-16 text-sm": code.length <= 8 && code.length > 6 && size === 'md',
          "w-16 h-16 text-xs": code.length > 8 && size === 'md',

          "w-12 h-12 text-2xl": code.length <= 2 && size === 'sm',
          "w-12 h-12 text-xl": code.length === 3 && size === 'sm',
          "w-12 h-12 text-sm": code.length <= 6 && code.length > 3 && size === 'sm',
          "h-12 text-xs": code.length > 6 && code.length > 6 && size === 'sm',
        },
        className
      )}
      sx={{
        backgroundColor: color,
      }}
    >
      {code}
    </Box>
  );
}
