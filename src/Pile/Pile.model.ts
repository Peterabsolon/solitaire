import { action, computed, observable } from "mobx"
import { DragEvent } from "react"

import { CardModel } from "../Card"
import { RANK, RANK_VALUES } from "../constants"
import { TOnCardDropFn } from "../App.types"

export class PileModel {
  // ====================================================
  // Model
  // ====================================================
  cards = observable<CardModel>([])

  // ====================================================
  // Computed
  // ====================================================
  @computed get hasCards() {
    return this.cards.length > 0
  }

  // Array length needs to be accessed in order for MobX to track it and hence update this computed when it changes.
  // This seems like a weird quirk, but not really once you're familiar with how MobX reactivity engine works.
  @computed get lastCard(): CardModel | undefined {
    return this.hasCards ? this.cards[this.cards.length - 1] : undefined
  }

  @computed get firstCard(): CardModel | undefined {
    return this.hasCards ? this.cards[0] : undefined
  }

  // ====================================================
  // Public
  // ====================================================
  @action add = (card: CardModel): void => {
    this.cards.push(card)
  }

  @action pop = (): CardModel | undefined => {
    return this.cards.pop()
  }

  @action remove = (card: CardModel): void => {
    this.cards.remove(card)
  }

  @action clear = () => {
    this.cards.clear()
  }

  // http://en.wikipedia.org/wiki/Fisher-Yates_shuffle#The_modern_algorithm
  @action shuffle = () => {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))

      const temp = this.cards[i]
      this.cards[i] = this.cards[j]
      this.cards[j] = temp
    }
  }

  @action canAdd = (card: CardModel) => {
    if (!this.lastCard) {
      return card.rank === RANK.KING
    }

    const cardRank = RANK_VALUES.indexOf(card.rank)
    const cardLastRank = RANK_VALUES.indexOf(this.lastCard.rank)

    const isColorDifferent = card.isBlack !== this.lastCard.isBlack
    const isRankBelow = cardRank === cardLastRank - 1

    return isColorDifferent && isRankBelow
  }

  @action revealLastCard = () => {
    this.lastCard?.reveal()
  }

  // ====================================================
  // UI event handlers
  // ====================================================
  @action handleCardDrag = (event: DragEvent, index: number) => {
    const target = event.target as HTMLDivElement

    const cardIndex = target.getAttribute("data-index")
    const pileIndex = index.toString()

    event.dataTransfer.setData("cardIndex", cardIndex!)
    event.dataTransfer.setData("pileIndex", pileIndex)
  }

  @action handleCardDrop = (event: DragEvent, index: number, onCardDrop?: TOnCardDropFn) => {
    if (!onCardDrop) {
      return
    }

    const cardIndex = event.dataTransfer.getData("cardIndex")
    const pileIndexFrom = event.dataTransfer.getData("pileIndex")
    const isFromDeck = event.dataTransfer.getData("isFromDeck")

    onCardDrop(Boolean(isFromDeck), Number(cardIndex), Number(pileIndexFrom), index)
  }
}
