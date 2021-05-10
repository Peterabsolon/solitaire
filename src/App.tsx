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
    reset,
  } = useStore()

  useEffect(initialize, [initialize])

  return (
    <div>
      <Flex alignItems="center">
        <h1>Solitaire</h1>

        <button type="button" onClick={reset} style={{ marginLeft: 12 }}>
          Reset
        </button>
      </Flex>

      {hasWon && <h1>Victory!</h1>}

      <Flex justifyContent="space-between">
        <Deck deck={deck} />

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
