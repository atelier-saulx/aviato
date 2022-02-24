import {
  Column,
  Page,
  Badge,
  BadgeVariant,
  BadgeType,
  BadgeSize,
  Group,
  Row,
  IconCheck,
  IconClipboard,
  IconAperture,
  IconLoading,
} from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const BadgePage = () => {
  const ShowBadgeMatrix = () => {
    const badgeTypes: BadgeType[] = ['primary', 'action']

    const badgeVariants: BadgeVariant[] = ['light', 'filled', 'outlined']

    const badgeSizes: BadgeSize[] = [
      'extrasmall',
      'small',
      'medium',
      'large',
      'extralarge',
    ]

    const getBadgeSizes = (type: BadgeType, variant: BadgeVariant) => {
      return badgeSizes.map((size, index) => {
        const mappedSizes: { [key in BadgeSize]: string } = {
          extrasmall: 'XS',
          small: 'SM',
          medium: 'MD',
          large: 'LG',
          extralarge: 'XL',
        }

        const mappedSize = mappedSizes[size]

        return (
          <Badge
            type={type}
            variant={variant}
            size={size}
            key={`BadgeExample${index}`}
          >
            {mappedSize} size
          </Badge>
        )
      })
    }

    const getBadgeVariants = (type: BadgeType) => {
      return badgeVariants.map((variant, index) => {
        return (
          <Group key={`BadgeVariant-${index}`} direction="column">
            {getBadgeSizes(type, variant)}
          </Group>
        )
      })
    }

    const getBadges = () => {
      return badgeTypes.map((type, index) => {
        return (
          <Group
            key={`BadgeType-${index}`}
            direction="row"
            css={{ paddingBottom: 20 }}
          >
            {getBadgeVariants(type)}
          </Group>
        )
      })
    }

    return <Column>{getBadges()}</Column>
  }

  const ShowBadgeExamples = () => {
    return (
      <Group direction="column">
        <Column>
          <NextText color="Secondary">Left area</NextText>
          <Row css={{ width: 200 }}>
            <Badge leftArea={<IconCheck />}>Left area</Badge>
          </Row>
        </Column>

        <Column>
          <NextText color="Secondary">Right area</NextText>
          <Row>
            <Badge rightArea={<IconClipboard />}>Right area</Badge>
          </Row>
        </Column>

        <Column>
          <NextText color="Secondary">Both areas</NextText>
          <Row css={{ width: 200 }}>
            <Badge leftArea={<IconAperture />} rightArea={<IconLoading />}>
              Both areas
            </Badge>
          </Row>
        </Column>

        <Column>
          <NextText color="Secondary">Full width</NextText>
          <Row css={{ width: 200 }}>
            <Badge fullWidth>Full width</Badge>
          </Row>
        </Column>

        <Column>
          <NextText color="Secondary">Overflow</NextText>
          <Row css={{ width: 200 }}>
            <Badge fullWidth>Lorem ipsum dolor sit amet consectur</Badge>
          </Row>
        </Column>
      </Group>
    )
  }

  return (
    <Page>
      <NextTitle>Badge</NextTitle>

      <NextText color="Secondary">Display badge, pill or tag.</NextText>

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
import { Badge } from '@aviato/ui'

<Badge
  type="primary"
  variant="filled"
  size="normal"
>
  Badge text
</Badge>
      `}
      >
        <ShowBadgeMatrix />
      </ShowcaseComponent>

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
import { Badge } from '@aviato/ui'

<Badge
  leftArea={<IconCheck />}
  rightArea={<IconAperture />}
>
  Badge text
</Badge>
      `}
      >
        <ShowBadgeExamples />
      </ShowcaseComponent>
    </Page>
  )
}

export default BadgePage
