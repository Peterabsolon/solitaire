import { computed, override } from "mobx"

import { CardModel, Rank } from "../Card"
import { PileModel } from "../Pile"

export class FoundationModel extends PileModel {
  @computed get isDone() {
    return this.cards.length === 13
  }

  @override canAdd = (card: CardModel) => {
    if (!this.lastCard) {
      return card.rank === Rank.Ace
    }

    const cardRank = Object.values(Rank).indexOf(card.rank)
    const cardLastRank = Object.values(Rank).indexOf(this.lastCard.rank)

    const isSameSuit = card.suit === this.lastCard.suit
    const isRankAbove = cardRank - 1 === cardLastRank

    return isSameSuit && isRankAbove
  }
}
