import React from 'react';
import classNames from 'classnames';
import { ptSansBold } from '@/constant/font';

export type TransjakartaCorridorNumberingProps = {
  code: string,
  order: number,
  color: string,
  onClickCode?: (code: string) => void
}

export default function TransjakartaCorridorNumbering(props: TransjakartaCorridorNumberingProps) {
  return (
    <div
      className={classNames('w-12 h-12 text-white flex justify-center items-center text-sm flex-col rounded-full', ptSansBold.className)}
      style={{
        backgroundColor: props.color
      }}
      onClick={() => props.onClickCode && props.onClickCode(props.code)}
    >
      <span>{props.code.padStart(2, "0")}</span>
      <span>{props.order.toString().padStart(2, "0")}</span>
    </div>
  );
}
