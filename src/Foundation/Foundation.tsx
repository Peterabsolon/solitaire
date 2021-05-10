import { FC, DragEvent } from "react"
import { observer } from "mobx-react-lite"

import { Card } from "../Card"
import { Placeholder } from "../Placeholder"

import { FoundationModel } from "./Foundation.model"

interface FoundationProps {
  foundation: FoundationModel
  index: number
  onCardDrop?: (
    isFromDeck: boolean,
    cardIndex: number,
    pileIndex: number,
    foundationIndex: number
  ) => void
}

export const Foundation: FC<FoundationProps> = observer(({ foundation, index, onCardDrop }) => {
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
    <Placeholder onDrop={handleDrop} onDragOver={handleDragOver}>
      {foundation.lastCard && <Card card={foundation.lastCard} />}
    </Placeholder>
  )
})

Foundation.displayName = "Foundation"
