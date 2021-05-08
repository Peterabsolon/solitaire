import { FC } from "react"
import { observer } from "mobx-react-lite"

import { DeckModel } from "./Deck.model"

interface DeckProps {
  Deck: DeckModel
}

export const Deck: FC<DeckProps> = observer((props) => {
  console.log(props)

  return <div>Deck</div>
})
