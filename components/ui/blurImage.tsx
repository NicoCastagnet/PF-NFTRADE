import type { ImageProps } from 'next/image'
import Image from 'next/image'
import { useEffect, useState } from 'react'

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const BlurImage: React.FC<ImageProps> = ({ src, ...props }) => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
  }, [src])

  return (
    <Image
      {...props}
      src={src}
      alt={props.alt || 'Blur image alt'}
      layout="fill"
      priority
      objectFit="cover"
      className={cn(
        'duration-700 ease-in-out rounded-lg overflow-hidden',
        props.className as string,
        isLoading
          ? 'bg-gradient-to-r from-sky-500 to-indigo-500 blur-lg animate-pulse'
          : 'grayscale-0 blur-0 scale-100',
      )}
      onLoadingComplete={() => setLoading(false)}
      onError={() => setLoading(false)}
    />
  )
}

export default BlurImage
