import { FarmFrenzyTableType, FarmFrenzyTableTypeOptions } from '@/constant/tables';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import classNames from 'classnames';
import React from 'react';
import { BsChevronDown } from 'react-icons/bs';

/**
 * @deprecated Change to new
 */
export interface SimpleListboxProps {
  onChange: (v: string) => void,

  /**
   * Key:Value object. Key is the value while label is the label
   */
  options: { [value: string]: string }
  value: string | null,
  defaultEmptyLabel?: string
}

export default function SimpleListbox(props: SimpleListboxProps) {
  return (
    <Listbox
      onChange={props.onChange}
      value={props.value}
      defaultValue={props.value}
    >
      <ListboxButton
        className={classNames("w-full overflow-hidden rounded-lg border disabled:cursor-not-allowed disabled:opacity-50", 
          "inline-flex items-center rounded-sm border-2 px-3 py-1 text-sm border-gray-500 bg-gray-600 text-white outline-none"
        )}
      >
        <div className='flex justify-between w-full items-center'>
          {props.value ? props.options[props.value] : props.defaultEmptyLabel ?? "Select a value"}
          <BsChevronDown/>
        </div>  
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        className={classNames("w-[var(--button-width)] flex flex-col gap-2 overflow-hidden rounded-sm disabled:cursor-not-allowed disabled:opacity-50 outline-0 cursor-pointer",
          "border-gray-500 bg-gray-600 text-white text-sm border-2 border-t-0 rounded-t-none z-50"
        )}
      >
        {
          props.defaultEmptyLabel && 
            <ListboxOption value={''} key={''} className='p-0.5 px-2.5 hover:bg-gray-700'>{props.defaultEmptyLabel}</ListboxOption>
        }
        {
          Object.entries(props.options).map(([key, label]) => (
            <ListboxOption value={key} key={key} className='p-0.5 px-2.5 hover:bg-gray-700'>
              { label }
            </ListboxOption>
          ))
        }
      </ListboxOptions>
    </Listbox>
  );
}
