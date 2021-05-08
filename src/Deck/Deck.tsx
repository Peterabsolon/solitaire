import { FC } from "react"
import { observer } from "mobx-react-lite"
import { Flex } from "rebass"

import { Card } from "../Card"
import { Placeholder } from "../Placeholder"

import { DeckModel } from "./Deck.model"
interface DeckProps {
  deck: DeckModel
}

export const Deck: FC<DeckProps> = observer(({ deck }) => {
  const cardUnturned = deck.pile.lastCard
  const cardTurned = deck.pileTurned.lastCard

  return (
    <Flex>
      <Placeholder onClick={deck.turnCard}>
        {cardUnturned && <Card card={cardUnturned} />}
      </Placeholder>

      {cardTurned && <Card card={cardTurned} />}
    </Flex>
  )
})
