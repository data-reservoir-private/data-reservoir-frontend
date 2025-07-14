import React from 'react';

export interface GridDetailImageLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export default function GridDetailImageLink(props: GridDetailImageLinkProps) {
  return (
    <a { ...props} className='text-blue-300 underline' target='_blank'>Link</a>
  );
}
