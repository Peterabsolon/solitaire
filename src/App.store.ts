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

  // Cards the user is currently dragging
  selectedCardsPile = new PileModel()
  selectedCardSourcePile?: PileModel

  constructor() {
    makeAutoObservable(this)
  }

  // ====================================================
  // Actions
  // ====================================================
  clearSelection = () => {
    this.selectedCardsPile.clear()
    this.selectedCardSourcePile = undefined
  }

  // TODO: add test
  selectCard = (cards: CardModel[], pile: PileModel) => {
    if (this.selectedCardsPile.firstCard && this.selectedCardSourcePile) {
      const canAdd = pile.canAdd(this.selectedCardsPile.firstCard)

      if (canAdd) {
        // Add card to pile if we can
        this.selectedCardsPile.cards.forEach((card) => pile.add(card))
        this.selectedCardSourcePile.turnLastCard()
      } else {
        // Else restore
        this.selectedCardsPile.cards.forEach((card) => this.selectedCardSourcePile?.add(card))
      }

      this.clearSelection()
      return
    }

    this.selectedCardsPile.cards.replace(cards)
    this.selectedCardSourcePile = pile

    cards.forEach((card) => pile.remove(card))
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
