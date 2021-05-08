import { FC } from "react"
import { observer } from "mobx-react-lite"
import styled, { css } from "styled-components"
import { noop } from "lodash"

import { CARD_WIDTH } from "../constants"

import { CardModel } from "./Card.model"

interface CardProps {
  card: CardModel
  isTurned?: boolean
  onClick?: (card: CardModel) => void
}

export const Card: FC<CardProps> = observer(({ card, onClick = noop, isTurned = true }) => {
  return (
    <Wrapper isTurned={isTurned} isBlack={card.isBlack} onClick={() => onClick(card)}>
      {isTurned && (
        <>
          {card.rank}
          {card.suit}
        </>
      )}
    </Wrapper>
  )
})

interface WrapperProps {
  isTurned: boolean
  isBlack: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  border: 2px solid red;
  border-radius: 4px;
  width: ${CARD_WIDTH}px;
  height: 200px;
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
      background: rgba(255, 0, 0, 0.5);
    `}
  `}
`
