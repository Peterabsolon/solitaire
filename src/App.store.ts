import { createContext, useContext, DragEvent } from "react"
import { makeAutoObservable, observable } from "mobx"
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
  foundations = observable<FoundationModel>(times(4).map(() => new FoundationModel()))

  // Standard 7 piles at the bottom
  piles = observable<PileModel>(times(7).map(() => new PileModel()))

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
  handlePileCardClick = (card: CardModel, pile: PileModel) => {
    const validFoundation = this.foundations.find((foundation) => foundation.canAdd(card))
    if (validFoundation) {
      validFoundation.add(card)
      pile.remove(card)
      pile.revealLastCard()
    }
  }

  handlePileCardDrag = (event: DragEvent) => {
    event.dataTransfer.setData("isFromDeck", "true")
  }

  handleDropFromDeck = (target: PileModel) => {
    const card = this.deck.pileTurned.lastCard

    if (card && target && target.canAdd(card)) {
      target.add(card)
      this.deck.pileTurned.remove(card)
    }
  }

  handleDropToPile = (
    fromDeck: boolean,
    cardIndex: number,
    pileIndexFrom: number,
    pileIndexTo: number
  ) => {
    const pile = this.piles[pileIndexTo]

    if (fromDeck) {
      this.handleDropFromDeck(pile)
      return
    }

    const sourcePile = this.piles[pileIndexFrom]
    const sourceCards = sourcePile.cards
    const cards = sourceCards.slice(cardIndex, sourceCards.length)

    if (cards.length && pile && pile.canAdd(cards[0])) {
      cards.forEach((card) => {
        pile.add(card)
        sourcePile.remove(card)
      })

      sourcePile.revealLastCard()
    }
  }

  handleDropToFoundation = (
    fromDeck: boolean,
    cardIndex: number,
    pileIndex: number,
    foundationIndex: number
  ) => {
    const foundation = this.foundations[foundationIndex]

    if (fromDeck) {
      this.handleDropFromDeck(foundation)
      return
    }

    const pile = this.piles[pileIndex]
    const card = pile.cards[cardIndex]

    if (card && foundation && foundation.canAdd(card)) {
      foundation.add(card)
      pile.remove(card)
      pile.revealLastCard()
    }
  }

  initialize = () => {
    this.deck.initialize()

    times(7).forEach((_, pileIndex) => {
      times(pileIndex + 1).forEach((_, cardIndex) => {
        const card = this.deck.pile.pop()
        const isLast = cardIndex === pileIndex

        if (card) {
          if (isLast) {
            card.reveal()
          }

          this.piles[pileIndex].add(card)
        }
      })
    })
  }

  reset = () => {
    this.deck.reset()
    this.foundations.forEach((foundation) => foundation.clear())
    this.piles.forEach((pile) => pile.clear())

    this.initialize()
  }
}

const store = new AppStore()
const storeContext = createContext(store)
const useStore = () => useContext(storeContext)

export { useStore }
