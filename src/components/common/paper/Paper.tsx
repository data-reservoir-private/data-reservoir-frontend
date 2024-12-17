import classNames from 'classnames';
import React, { ReactNode } from 'react';

export default function Paper({children, className}: {children: ReactNode, className?: string}) {
  return (
    <div className={classNames('text-white bg-blackish margin-auto rounded-md content-center scrollbar-default', className ?? "")}>
      {children}
    </div>
  );
}
