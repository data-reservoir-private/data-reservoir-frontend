import React from 'react'
import classNames from 'classnames';
import { ptSansBold } from '@/constant/font';

export type TransjakartaCodeProps = {
  code: string,
  color: string,
  onClickCode?: (code: string) => void
}

export default function TransjakartaCode(props: TransjakartaCodeProps) {
  let codeSplit = [];
  
  // JAK dan MJAK
  if (props.code.startsWith("JAK")) codeSplit = ["JAK", props.code.replace("JAK", "")]
  else if (props.code.startsWith("MJAK")) codeSplit = ["MJAK", props.code.replace("MJAK", "")]

  // FIBAWC kepanjangan
  else if (props.code.startsWith("FIBAWC")) codeSplit = ["FIBAWC", "2023"]

  // Ada yang pakai underscore (L13E_TRIAL)
  else if (props.code.indexOf("_") !== -1) codeSplit = props.code.split("_")
  else codeSplit = [props.code];

  return (
    <div
      className={classNames('w-10 h-10 hover:brightness-75 cursor-pointer flex justify-center items-center text-sm flex-col rounded-full', ptSansBold.className)}
      style={{
        backgroundColor: props.color
      }}
      onClick={() => props.onClickCode && props.onClickCode(props.code)}
    >
      {
        codeSplit.map((x, idx) => (<span key={idx}>{x}</span>))
      }
    </div>
  )
}
