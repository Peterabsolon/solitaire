import { FC, DragEvent } from "react"
import { observer } from "mobx-react-lite"
import styled, { css } from "styled-components"
import { noop, times } from "lodash"

import { Card, CardModel, Wrapper as CardWrapper } from "../Card"
import { Placeholder } from "../Placeholder"

import { PileModel } from "./Pile.model"

interface PileProps {
  index: number
  onCardClick?: (cards: CardModel[], pile: PileModel) => void
  onCardDrop?: (
    isFromDeck: boolean,
    cardIndex: number,
    pileIndexFrom: number,
    pileIndexTo: number
  ) => void
  pile: PileModel
}

export const Pile: FC<PileProps> = observer(({ index, onCardClick = noop, onCardDrop, pile }) => {
  const handleWrapperClick = () => {
    if (pile.cards.length) {
      return
    }

    onCardClick([], pile)
  }

  const handleCardDrag = (event: DragEvent) => {
    const target = event.target as HTMLDivElement

    const cardIndex = target.getAttribute("data-index")
    const pileIndex = index.toString()

    event.dataTransfer.setData("cardIndex", cardIndex!)
    event.dataTransfer.setData("pileIndex", pileIndex)
  }

  const handleDrop = (event: DragEvent) => {
    if (!onCardDrop) {
      return
    }

    const cardIndex = event.dataTransfer.getData("cardIndex")
    const pileIndexFrom = event.dataTransfer.getData("pileIndex")
    const isFromDeck = event.dataTransfer.getData("isFromDeck")

    onCardDrop(Boolean(isFromDeck), Number(cardIndex), Number(pileIndexFrom), index)
  }

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
  }

  return (
    <Placeholder onClick={handleWrapperClick} onDrop={handleDrop} onDragOver={handleDragOver}>
      <Cards>
        {pile.cards.map((card, index) => {
          const handleCardClick = () => {
            if (onCardClick && card.isTurned) {
              const cards = [...pile.cards].slice(index, pile.cards.length)
              onCardClick(cards, pile)
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
