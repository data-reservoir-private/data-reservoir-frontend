import classNames from 'classnames';
import React from 'react';

export type PickerProps = {
  singleOption: false,
  options: string[] | {label: string, value: string}[],
  selected: string[],
  onClickCategory: (category: string, enabled: boolean) => void,
  className?: string
} | {
  singleOption: true,
  options: string[] | {label: string, value: string}[],
  selected: string | null
  onClickCategory: (category: string, enabled: boolean) => void,
  className?: string
}

export default function Picker(props: PickerProps) {

  return (
    <div className={classNames('grid grid-cols-3 gap-y-4 gap-x-1', props.className)}>
      {
        props.options.map(c => {

          let l = typeof c === "string" ? c : c.label;
          let v = typeof c === "string" ? c : c.value;

          return (
            <div className={classNames('p-2 rounded-sm hover:bg-slate-800 border-gray-600 border-2 cursor-pointer', {
              'bg-slate-700 hover:bg-slate-500': props.singleOption ? props.selected === v : props.selected.includes(v)
            })}
              key={v}
              onClick={() => props.onClickCategory(v, props.singleOption ? !(props.selected === v) : !props.selected.includes(v))}
            >
              {l}
            </div>
          );
        })
      }
    </div>
  );
}
