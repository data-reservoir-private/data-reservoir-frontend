import classNames from 'classnames'
import React from 'react'

interface SimpleImageProps {
  className?: string,
  src: string,
  alt: string,
  sizes?: string,
  quality?: number,
  unoptimized?: boolean,
  pixelated?: boolean
}

export default function SimpleImage(props: SimpleImageProps) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      sizes={props.sizes ?? '10vw'}
      className={classNames('p-1 object-contain', props.className)}
      style={props.pixelated ? { imageRendering: 'pixelated' } : {}}
    />
  )
}
