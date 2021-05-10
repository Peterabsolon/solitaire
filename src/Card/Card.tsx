import { FC, DragEvent } from "react"
import { observer } from "mobx-react-lite"
import styled, { css } from "styled-components"
import { noop } from "lodash"

import { BORDER_RADIUS, CARD_HEIGHT, CARD_WIDTH, RANK, SUIT } from "../constants"

import { CardModel } from "./Card.model"

interface CardProps {
  card: CardModel
  index?: number
  onClick?: (card: CardModel) => void
  onDragStart?: (event: DragEvent) => void
}

export const Card: FC<CardProps> = observer(
  ({ card, onClick = noop, onDragStart = noop, index }) => (
    <Wrapper
      draggable
      data-index={index}
      isTurned={card.isTurned}
      isBlack={card.isBlack}
      onClick={onClick}
      onDragStart={onDragStart}
      rank={card.rank}
      suit={card.suit}
    />
  )
)

Card.displayName = "Card"

interface WrapperProps {
  isTurned: boolean
  isBlack: boolean
  rank: RANK
  suit: SUIT
}

export const Wrapper = styled.div<WrapperProps>`
  border-radius: ${BORDER_RADIUS};
  width: ${CARD_WIDTH};
  height: ${CARD_HEIGHT};
  display: flex;
  margin-bottom: 1vw;
  margin-right: 1vw;

  ${(props) => css`
    color: ${props.isBlack ? "#000" : "#f00"};

    ${props.isTurned
      ? css`
          background-image: url("cards/${props.rank}-${props.suit}.svg");
          background-size: cover;
          box-shadow: inset 0 0 0 0.15vw #1e0c7d;
        `
      : css`
          background-image: url("cards/back.svg");
          background-size: cover;
        `}
  `}
`
