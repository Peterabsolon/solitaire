import { FC } from "react"
import { observer } from "mobx-react-lite"

import { CardModel } from "./Card.model"

interface CardProps {
  card: CardModel
}

export const Card: FC<CardProps> = observer((props) => {
  console.log(props)

  return <div>Card</div>
})
