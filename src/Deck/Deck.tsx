import { FC, DragEvent } from "react"
import { observer } from "mobx-react-lite"
import { Flex } from "rebass"

import { useStore } from "../App.store"
import { Card } from "../Card"
import { Placeholder } from "../Placeholder"

import { DeckModel } from "./Deck.model"

interface DeckProps {
  deck: DeckModel
}

export const Deck: FC<DeckProps> = observer(({ deck }) => {
  const { handlePileCardClick } = useStore()

  const cardUnturned = deck.pile.lastCard
  const cardTurned = deck.pileTurned.lastCard

  const handleCardDrag = (event: DragEvent) => {
    event.dataTransfer.setData("isFromDeck", "true")
  }

  return (
    <Flex>
      <Placeholder onClick={deck.turnCard}>
        {cardUnturned && <Card card={cardUnturned} />}
      </Placeholder>

      {cardTurned && (
        <Card
          card={cardTurned}
          onClick={() => handlePileCardClick([cardTurned], deck.pileTurned)}
          onDragStart={handleCardDrag}
        />
      )}
    </Flex>
  )
})

Deck.displayName = "Deck"
