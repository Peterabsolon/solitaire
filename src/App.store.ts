import { createContext, useContext } from "react"
import { IObservableArray, makeAutoObservable, observable } from "mobx"
import { times } from "lodash"

import { CardModel } from "./Card"
import { DeckModel } from "./Deck"
import { FoundationModel } from "./Foundation"
import { PileModel } from "./Pile"

class AppStore {
  // ====================================================
  // Model
  // ====================================================
  // The playing deck from which cards are turned and board initialized
  deck = new DeckModel()

  // Foundations are the 4 piles on the top-right
  foundations: IObservableArray<FoundationModel> = observable(times(4).map(() => new FoundationModel({}))) // prettier-ignore

  // Standard 7 piles at the bottom
  piles: IObservableArray<PileModel> = observable(times(7).map(() => new PileModel({})))

  // Pile of cards the user is currently dragging
  selectedCardsPile = new PileModel({})
  selectedCardSourcePile?: PileModel

  constructor() {
    makeAutoObservable(this)
  }

  // ====================================================
  // Computed
  // ====================================================
  get hasWon() {
    return this.foundations.every((foundation) => foundation.isDone)
  }

  // ====================================================
  // Actions
  // ====================================================
  clearSelection = () => {
    this.selectedCardsPile.clear()
    this.selectedCardSourcePile = undefined
  }

  restoreSelection = () => {
    this.selectedCardsPile.cards.forEach((card) => this.selectedCardSourcePile?.add(card))
  }

  // TODO: add test
  handlePileCardClick = (cards: CardModel[], pile: PileModel) => {
    if (this.selectedCardsPile.firstCard && this.selectedCardSourcePile) {
      if (pile.canAdd(this.selectedCardsPile.firstCard)) {
        // Add card to pile if we can
        this.selectedCardsPile.cards.forEach((card) => pile.add(card))

        // Turn last card from source pile, if it's not in deck (where they are all turned already)
        if (!this.selectedCardSourcePile.isDeckPile) {
          this.selectedCardSourcePile.turnLastCard()
        }
      } else {
        this.restoreSelection()
      }

      this.clearSelection()
      return
    }

    this.selectedCardsPile.cards.replace(cards)
    this.selectedCardSourcePile = pile

    cards.forEach((card) => pile.remove(card))
  }

  handleFoundationClick = (foundation: FoundationModel) => {
    const card = this.selectedCardsPile.firstCard

    // only one can be added at a time
    if (!card || this.selectedCardsPile.cards.length > 1) {
      return
    }

    if (foundation.canAdd(card)) {
      foundation.add(card)
      this.selectedCardSourcePile?.turnLastCard()
    } else {
      this.restoreSelection()
    }

    this.clearSelection()
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
