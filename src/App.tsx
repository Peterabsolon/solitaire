import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Flex } from "rebass"

import { useStore } from "./App.store"
import { Deck } from "./Deck"
import { Foundation } from "./Foundation"
import { Pile } from "./Pile"

const App = observer(() => {
  const {
    deck,
    foundations,
    handleDropToFoundation,
    handleDropToPile,
    handlePileCardClick,
    hasWon,
    initialize,
    piles,
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
            <Foundation
              key={index}
              index={index}
              foundation={foundation}
              onCardDrop={handleDropToFoundation}
            />
          ))}
        </Flex>
      </Flex>

      <Flex>
        {piles.map((pile, index) => (
          <Pile
            key={index}
            index={index}
            pile={pile}
            onCardClick={handlePileCardClick}
            onCardDrop={handleDropToPile}
          />
        ))}
      </Flex>
    </div>
  )
})

export default App
