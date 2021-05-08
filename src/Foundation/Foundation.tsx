import { FC } from "react"
import { observer } from "mobx-react-lite"
import styled from "styled-components"

import { useStore } from "../App.store"
import { CARD_HEIGHT, CARD_WIDTH } from "../constants"
import { Card } from "../Card"

import { FoundationModel } from "./Foundation.model"

interface FoundationProps {
  foundation: FoundationModel
}

export const Foundation: FC<FoundationProps> = observer(({ foundation }) => {
  const store = useStore()

  return (
    <Wrapper onClick={() => store.handleFoundationClick(foundation)}>
      Foundation
      {foundation.lastCard && <Card card={foundation.lastCard} />}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  background: #e4e4e4;
  margin-left: 24px;
`
