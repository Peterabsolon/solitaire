import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Flex } from "rebass"

import { useStore } from "./App.store"
import { Card } from "./Card"

import { Pile } from "./Pile"

const App = observer(() => {
  const { foundations, piles, initialize, selectedCardsPile, selectCard } = useStore()

  useEffect(initialize, [initialize])

  return (
    <div>
      <Flex justifyContent="space-between">
        <div>Deck</div>

        <Flex>
          {foundations.map((foundation) => (
            <Pile pile={foundation} />
          ))}
        </Flex>
      </Flex>

      <Flex>
        {piles.map((pile, index) => (
          <Pile pile={pile} onCardClick={selectCard} />
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
