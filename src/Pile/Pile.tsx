import { FC } from "react"
import { observer } from "mobx-react-lite"
import styled, { css } from "styled-components"
import { noop, times } from "lodash"

import { Card, CardModel, Wrapper as CardWrapper } from "../Card"
import { Placeholder } from "../Placeholder"

import { PileModel } from "./Pile.model"

interface PileProps {
  pile: PileModel
  onCardClick?: (cards: CardModel[], pile: PileModel) => void
}

export const Pile: FC<PileProps> = observer(({ pile, onCardClick = noop }) => {
  return (
    <Placeholder onClick={pile.cards.length ? undefined : () => onCardClick([], pile)}>
      <Cards>
        {pile.cards.map((card, index) => {
          const handleCardClick = () => {
            if (onCardClick && card.isTurned) {
              const cards = [...pile.cards].slice(index, pile.cards.length)
              onCardClick(cards, pile)
            }
          }

          return <Card key={card.key} card={card} onClick={handleCardClick} />
        })}
      </Cards>
    </Placeholder>
  )
})

Pile.displayName = "Pile"

const Cards = styled.div`
  ${CardWrapper} {
    ${times(20).map(
      (index) => css`
        &:nth-child(${index + 2}) {
          position: absolute;
          top: ${(index + 1) * 20}px;
        }
      `
    )}
  }
`
