import { FC, DragEvent } from "react"
import { observer } from "mobx-react-lite"
import styled, { css } from "styled-components"
import { noop, times } from "lodash"

import { Card, CardModel, Wrapper as CardWrapper } from "../Card"
import { Placeholder } from "../Placeholder"

import { PileModel } from "./Pile.model"

interface PileProps {
  index: number
  onCardClick?: (cards: CardModel, pile: PileModel) => void
  onCardDrop?: (
    isFromDeck: boolean,
    cardIndex: number,
    pileIndexFrom: number,
    pileIndexTo: number
  ) => void
  pile: PileModel
}

export const Pile: FC<PileProps> = observer(({ index, onCardClick = noop, onCardDrop, pile }) => {
  const handleCardDrag = (event: DragEvent) => {
    const target = event.target as HTMLDivElement

    const cardIndex = target.getAttribute("data-index")
    const pileIndex = index.toString()

    event.dataTransfer.setData("cardIndex", cardIndex!)
    event.dataTransfer.setData("pileIndex", pileIndex)
  }

  const handleCardDrop = (event: DragEvent) => {
    if (!onCardDrop) {
      return
    }

    const cardIndex = event.dataTransfer.getData("cardIndex")
    const pileIndexFrom = event.dataTransfer.getData("pileIndex")

    onCardDrop(false, Number(cardIndex), Number(pileIndexFrom), index)
  }

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
  }

  return (
    <StyledPlaceholder onDrop={handleCardDrop} onDragOver={handleDragOver}>
      <Cards>
        {pile.cards.map((card, index) => {
          const handleCardClick = () => {
            const isLast = index === pile.cards.length - 1
            if (isLast) {
              onCardClick(card, pile)
            }
          }

          return (
            <Card
              key={card.key}
              index={index}
              card={card}
              onClick={handleCardClick}
              onDragStart={handleCardDrag}
            />
          )
        })}
      </Cards>
    </StyledPlaceholder>
  )
})

const StyledPlaceholder = styled(Placeholder)`
  background: none;
  height: 30vw;
`

Pile.displayName = "Pile"

const Cards = styled.div`
  ${CardWrapper} {
    ${times(20).map(
      (index) => css`
        &:nth-child(${index + 2}) {
          position: absolute;
          top: ${(index + 1) * 1.5}vw;
        }
      `
    )}
  }
`
