import { FC } from "react"
import { observer } from "mobx-react-lite"
import styled, { css } from "styled-components"
import { times } from "lodash"

import { Card, CardModel, Wrapper as CardWrapper } from "../Card"
import { CARD_WIDTH } from "../constants"

import { PileModel } from "./Pile.model"

interface PileProps {
  pile: PileModel
  onCardClick?: (cards: CardModel[], pile: PileModel) => void
}

export const Pile: FC<PileProps> = observer(({ pile, onCardClick }) => {
  return (
    <Wrapper>
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
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: relative;
  width: ${CARD_WIDTH}px;
  margin-right: 24px;
`

const Cards = styled.div`
  ${CardWrapper} {
    ${times(7).map(
      (index) => css`
        &:nth-child(${index + 2}) {
          position: absolute;
          top: ${(index + 1) * 20}px;
        }
      `
    )}
  }
`
