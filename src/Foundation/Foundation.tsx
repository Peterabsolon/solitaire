import { FC } from "react"
import { observer } from "mobx-react-lite"

import { useStore } from "../App.store"
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
