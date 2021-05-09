import { FC } from "react"
import { observer } from "mobx-react-lite"
import styled from "styled-components"

import { useStore } from "../App.store"
import { CARD_HEIGHT, CARD_WIDTH } from "../constants"
import { Card } from "../Card"
import { Placeholder } from "../Placeholder"

import { FoundationModel } from "./Foundation.model"

interface FoundationProps {
  foundation: FoundationModel
}

export const Foundation: FC<FoundationProps> = observer(({ foundation }) => {
  const store = useStore()

  return (
    <Placeholder onClick={() => store.handleFoundationClick(foundation)}>
      {foundation.lastCard && <Card card={foundation.lastCard} />}
    </Placeholder>
  )
})

Foundation.displayName = "Foundation"
