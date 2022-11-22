import { FC } from "react"
import { observer } from "mobx-react-lite"

import { Card } from "../Card"
import { Placeholder } from "../Placeholder"
import { TOnCardDropFn } from "../App.types"

import { FoundationModel } from "./Foundation.model"

interface FoundationProps {
  foundation: FoundationModel
  index: number
  onCardDrop?: TOnCardDropFn
}

export const Foundation: FC<FoundationProps> = observer(({ foundation, index, onCardDrop }) => (
  <Placeholder
    onDrop={(event) => foundation.handleDrop(event, index, onCardDrop)}
    onDragOver={(event) => event.preventDefault()}
  >
    {foundation.lastCard && <Card card={foundation.lastCard} />}
  </Placeholder>
))

Foundation.displayName = "Foundation"
