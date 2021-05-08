import { FC } from "react"
import { observer } from "mobx-react-lite"
import styled, { css } from "styled-components"

import { Card, Wrapper as CardWrapper } from "../Card"

import { PileModel } from "./Pile.model"
import { times } from "lodash"

interface PileProps {
  pile: PileModel
  index?: number
  foundation?: boolean
}

export const Pile: FC<PileProps> = observer(({ pile, foundation, index }) => {
  return (
    <Wrapper>
      {!foundation && (
        <Cards>
          {pile.cards.map((card, index) => {
            const isLast = index === pile.cards.length - 1

            return <Card card={card} isTurned={isLast} />
          })}
        </Cards>
      )}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: relative;
`

const Cards = styled.div`
  ${CardWrapper} {
    ${times(7).map(
      (index) => css`
        &:nth-child(${index + 2}) {
          position: absolute;
          top: ${(index + 1) * 10}px;
        }
      `
    )}
  }
`
