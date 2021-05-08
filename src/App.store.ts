import { createContext, useContext } from "react"
import { IObservableArray, makeAutoObservable, observable } from "mobx"
import { times } from "lodash"

import { DeckModel } from "./Deck"
import { PileModel } from "./Pile"
import { CardModel } from "./Card"

class AppStore {
  // ====================================================
  // Model
  // ====================================================
  // The playing deck from which cards are turned and board initialized
  deck = new DeckModel()

  // Foundations are the 4 piles on the top-right
  foundations: IObservableArray<PileModel> = observable(times(4).map(() => new PileModel()))

  // Standard 7 piles at the bottom
  piles: IObservableArray<PileModel> = observable(times(7).map(() => new PileModel()))

  // Card the user is currently dragging
  selectedCard?: CardModel
  selectedCardSourcePile?: PileModel

  constructor() {
    makeAutoObservable(this)
  }

  // ====================================================
  // Actions
  // ====================================================
  clearSelectedCard = () => {
    this.selectedCard = undefined
    this.selectedCardSourcePile = undefined
  }

  // TODO: add test
  selectCard = (card: CardModel, sourcePile: PileModel) => {
    if (this.selectedCard && this.selectedCardSourcePile) {
      const canAdd = sourcePile.canAdd(this.selectedCard)

      if (canAdd) {
        sourcePile.add(this.selectedCard)
        this.selectedCardSourcePile.turnLastCard()
      } else {
        this.selectedCardSourcePile.add(this.selectedCard)
      }

      this.clearSelectedCard()
      return
    }

    this.selectedCard = card
    this.selectedCardSourcePile = sourcePile

    sourcePile.remove(card)
  }

  deselectCard = () => {
    if (!this.selectedCardSourcePile || !this.selectedCard) {
      return // shouldn't happen, just to keep TS happy
    }

    this.selectedCardSourcePile.add(this.selectedCard)
  }

  initialize = () => {
    times(7).forEach((_, pileIndex) => {
      times(pileIndex + 1).forEach((_, cardIndex) => {
        const card = this.deck.pile.pop()
        const isLast = cardIndex === pileIndex

        if (card) {
          if (isLast) {
            card.turn()
          }

          this.piles[pileIndex].add(card)
        }
      })
    })
  }
}

const store = new AppStore()

const storeContext = createContext(store)

export const useStore = () => useContext(storeContext)
