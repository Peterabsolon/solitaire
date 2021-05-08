import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Flex } from "rebass"

import { useStore } from "./App.store"
import { Card } from "./Card"
import { Deck } from "./Deck"
import { Foundation } from "./Foundation"
import { Pile } from "./Pile"

const App = observer(() => {
  const {
    deck,
    foundations,
    handlePileCardClick,
    hasWon,
    initialize,
    piles,
    selectedCardsPile,
  } = useStore()

  useEffect(initialize, [initialize])

  return (
    <div>
      <h1>Solitaire</h1>

      {hasWon && <h1 color="green">Victory!</h1>}

      <Flex justifyContent="space-between">
        <div>
          <Deck deck={deck} />
        </div>

        <Flex>
          {foundations.map((foundation, index) => (
            <Foundation key={index} foundation={foundation} />
          ))}
        </Flex>
      </Flex>

      <Flex>
        {piles.map((pile, index) => (
          <Pile key={index} pile={pile} onCardClick={handlePileCardClick} />
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
