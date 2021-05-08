import { createContext, useContext } from "react"
import { IObservableArray, observable } from "mobx"
import { times } from "lodash"

import { DeckModel } from "./Deck"
import { PileModel } from "./Pile"

class AppStore {
  // ====================================================
  // Model
  // ====================================================

  /** The playing deck from which cards are turned and board initialized */
  deck = new DeckModel()

  /** Foundations are the 4 piles on the top-right */
  foundations: IObservableArray<PileModel> = observable(times(4).map(() => new PileModel()))

  /** Standard 7 piles at the bottom */
  piles: IObservableArray<PileModel> = observable(times(7).map(() => new PileModel()))

  // ====================================================
  // Action
  // ====================================================
  initPiles = () => {
    times(7).forEach((_, pileIndex) => {
      times(pileIndex + 1).forEach(() => {
        const card = this.deck.pile.pop()

        if (card) {
          this.piles[pileIndex].add(card)
        }
      })
    })

    console.log("this.piles", this.piles)
  }

  init = () => {
    this.initPiles()
  }
}

const store = new AppStore()

const storeContext = createContext(store)

export const useStore = () => useContext(storeContext)
