import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Flex } from "rebass"

import { useStore } from "./App.store"
import { Card } from "./Card"
import { Foundation } from "./Foundation"
import { Pile } from "./Pile"

const App = observer(() => {
  const { foundations, piles, initialize, selectedCardsPile, handlePileCardClick } = useStore()

  useEffect(initialize, [initialize])

  return (
    <div>
      <h1>Solitaire</h1>

      <Flex justifyContent="space-between">
        <div>Deck</div>

        <Flex>
          {foundations.map((foundation, index) => (
            <Foundation key={index} foundation={foundation} />
          ))}
        </Flex>
      </Flex>

      <Flex>
        {piles.map((pile) => (
          <Pile pile={pile} onCardClick={handlePileCardClick} />
        ))}
      </Flex>

      <div>
        {selectedCardsPile.cards.map((card) => (
          <Card card={card} />
        ))}
      </div>
    </div>
  )
})

export default App
