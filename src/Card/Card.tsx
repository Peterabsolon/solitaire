import { FC, DragEvent } from "react"
import { observer } from "mobx-react-lite"
import styled, { css } from "styled-components"
import { noop } from "lodash"

import { CARD_HEIGHT, CARD_WIDTH } from "../constants"

import { CardModel } from "./Card.model"

interface CardProps {
  card: CardModel
  index?: number
  onClick?: (card: CardModel) => void
  onDragStart?: (event: DragEvent) => void
}

export const Card: FC<CardProps> = observer(
  ({ card, onClick = noop, onDragStart = noop, index }) => {
    return (
      <Wrapper
        draggable
        data-index={index}
        isTurned={card.isTurned}
        isBlack={card.isBlack}
        onClick={onClick}
        onDragStart={onDragStart}
      >
        {card.isTurned && (
          <>
            {card.rank}
            {card.suit}
          </>
        )}
      </Wrapper>
    )
  }
)

Card.displayName = "Card"

interface WrapperProps {
  isTurned: boolean
  isBlack: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  border: 2px solid red;
  border-radius: 4px;
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  display: flex;
  // align-items: center;
  // justify-content: center;
  margin-bottom: 24px;
  margin-right: 24px;
  background: #fff;
  font-size: 24px;

  ${(props) => css`
    color: ${props.isBlack ? "#000" : "#f00"};

    ${!props.isTurned &&
    css`
      background: #ff898c;
    `}
  `}
`
