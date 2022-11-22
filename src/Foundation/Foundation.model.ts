import { action, computed, override } from "mobx"

import { CardModel } from "../Card"
import { PileModel } from "../Pile"
import { RANK, RANK_VALUES } from "../constants"
import { DragEvent } from "react"
import { TOnCardDropFn } from "../App.types"

export class FoundationModel extends PileModel {
  // ====================================================
  // Computed
  // ====================================================
  @computed get isDone() {
    return this.cards.length === RANK_VALUES.length
  }

  // ====================================================
  // Actions
  // ====================================================
  @override canAdd = (card: CardModel) => {
    if (!this.lastCard) {
      return card.rank === RANK.ACE
    }

    const cardRank = RANK_VALUES.indexOf(card.rank)
    const cardLastRank = RANK_VALUES.indexOf(this.lastCard.rank)

    const isSameSuit = card.suit === this.lastCard.suit
    const isRankAbove = cardRank === cardLastRank + 1

    return isSameSuit && isRankAbove
  }

  // ====================================================
  // UI event handlers
  // ====================================================
  @action handleDrop = (event: DragEvent, index: number, onCardDrop?: TOnCardDropFn) => {
    if (!onCardDrop) {
      return
    }

    const cardIndex = event.dataTransfer.getData("cardIndex")
    const pileIndexFrom = event.dataTransfer.getData("pileIndex")
    const isFromDeck = event.dataTransfer.getData("isFromDeck")

    onCardDrop(Boolean(isFromDeck), Number(cardIndex), Number(pileIndexFrom), index)
  }
}
