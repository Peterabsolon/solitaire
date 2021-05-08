import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Flex, Box } from "rebass"

import { useStore } from "./App.store"

import { Pile } from "./Pile"

const App = observer(() => {
  const { foundations, piles, init } = useStore()

  useEffect(init, [])

  return (
    <div>
      <Flex justifyContent="space-between">
        <div>Deck</div>

        <Flex>
          {foundations.map((foundation) => (
            <Pile pile={foundation} foundation />
          ))}
        </Flex>
      </Flex>

      <Flex>
        {piles.map((pile, index) => (
          <Pile pile={pile} index={index} />
        ))}
      </Flex>
    </div>
  )
})

export default App
