import React from 'react'
import { PT_Sans } from 'next/font/google';
import classNames from 'classnames';
import { ptSansBold, ptSansRegular } from '@/constant/font';

export type TransjakartaCodeProps = {
  code: string,
  color: string,
  onClickCode?: (c: string) => void
}

export default function TransjakartaCode(props: TransjakartaCodeProps) {
  let codeSplit = [];
  
  // JAK dan MJAK
  if (props.code.startsWith("JAK")) codeSplit = ["JAK", props.code.replace("JAK", "")]
  else if (props.code.startsWith("MJAK")) codeSplit = ["MJAK", props.code.replace("MJAK", "")]
  else if (props.code.startsWith("FIBAWC")) codeSplit = ["FIBAWC", "2023"]
  else if (props.code.indexOf("_") !== -1) codeSplit = props.code.split("_")
  else codeSplit = [props.code];

  return (
    <div
      className={classNames('w-10 h-10 hover:brightness-75 cursor-pointer flex justify-center items-center text-sm flex-col rounded-full', ptSansBold.className)}
      style={{
        backgroundColor: props.color
      }}
      onClick={_ => props.onClickCode && props.onClickCode(props.code)}
    >
      {
        codeSplit.map((x, idx) => (<span key={idx}>{x}</span>))
      }
    </div>
  )
}
