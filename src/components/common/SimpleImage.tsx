import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'

interface SimpleImageProps {
  className?: string,
  src: string,
  alt: string,
  sizes?: string,
  quality?: number
}

export default function SimpleImage(props: SimpleImageProps) {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      fill
      sizes={props.sizes ?? '10vw'}
      quality={props.quality ?? 50}
      className={classNames('p-1 object-contain', props.className)}
    />
  )
}
