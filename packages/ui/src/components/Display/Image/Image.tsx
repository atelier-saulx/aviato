import { isText } from '@aviato/utils'
import React, {
  forwardRef,
  ElementRef,
  ForwardedRef,
  useRef,
  ReactNode,
} from 'react'

import { Conditional, IconPlaceholder, Text } from '~/components'
import { useImagePreloader, useMergedRef } from '~/hooks'
import { styled } from '~/theme'

const Figure = styled('figure', {
  width: '100%',
  position: 'relative',
  margin: 0,
})

const Wrapper = styled('div', {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '4px',
})

const StyledImage = styled('img', {
  variants: {
    visibility: {
      hidden: {
        visibility: 'hidden',
      },
      visible: {
        visibility: 'visible',
      },
    },
  },
})

const Placeholder = styled('div', {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$ActionLight',
  color: '$TextSecondary',
  inset: '0px',
})

export type ImageFit = 'contain' | 'cover'

export interface ImageProps {
  src?: string
  alt?: string
  width?: number | string
  height?: number | string
  fit?: ImageFit
  placeholder?: ReactNode
  caption?: string
  imageRef?: ForwardedRef<HTMLImageElement>
}

export const Image = forwardRef<ElementRef<typeof Figure>, ImageProps>(
  (properties, forwardedRef) => {
    const {
      src,
      alt,
      fit = 'cover',
      width = '100%',
      height = 'auto',
      placeholder,
      caption,
      imageRef,
      ...remainingProps
    } = properties

    const { imagesPreloaded } = useImagePreloader([src])

    const internalImgRef = useRef<HTMLImageElement>(null)
    const mergedImgRef = useMergedRef(imageRef, internalImgRef)

    const PlaceholderVariant = isText(placeholder) ? (
      <Text
        weight="medium"
        color="Secondary"
        size="extrasmall"
        css={{ lineHeight: '24px' }}
      >
        {placeholder}
      </Text>
    ) : (
      placeholder
    )

    const placeholderIcon = <IconPlaceholder />

    return (
      <Figure ref={forwardedRef} {...remainingProps}>
        <Wrapper>
          <StyledImage
            src={src}
            alt={alt}
            style={{ objectFit: fit, width, height }}
            ref={mergedImgRef}
            visibility={imagesPreloaded ? 'visible' : 'hidden'}
          />

          <Conditional test={!imagesPreloaded}>
            <Placeholder title={alt}>
              {PlaceholderVariant ?? placeholderIcon}
            </Placeholder>
          </Conditional>
        </Wrapper>

        <Conditional test={caption}>
          <Text
            color="Secondary"
            size="extrasmall"
            as="figcaption"
            alignment="middle"
            css={{ marginTop: 8 }}
          >
            {caption}
          </Text>
        </Conditional>
      </Figure>
    )
  }
)

Image.displayName = 'Image'
