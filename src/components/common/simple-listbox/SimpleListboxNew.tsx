import { FarmFrenzyTableType, FarmFrenzyTableTypeOptions } from '@/constant/tables';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import classNames from 'classnames';
import React from 'react';
import { BsChevronDown } from 'react-icons/bs';

interface SimpleListboxNewProps<TValue> {
  onChange: (v: TValue) => void,

  /**
   * Key:Value object. Key is the label and the value is the actual value
   */
  options: { [label: string]: TValue }
  value: TValue | null,
  defaultEmptyLabel?: string
}

export default function SimpleListboxNew<TValue>(props: SimpleListboxNewProps<TValue>) {
  const l = Object.entries(props.options).find(x => x[1] == props.value);

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
          {(props.value && l) ? l[0] : props.defaultEmptyLabel ?? "Select a value"}
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
          Object.entries(props.options).map(([key, value]) => (
            <ListboxOption value={value} key={key} className='p-0.5 px-2.5 hover:bg-gray-700'>
              { key }
            </ListboxOption>  
          ))
        }
      </ListboxOptions>
    </Listbox>
  );
}
