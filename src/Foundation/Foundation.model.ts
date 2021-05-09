import { computed, override } from "mobx"

import { CardModel, RANK, RANK_VALUES } from "../Card"
import { PileModel } from "../Pile"

export class FoundationModel extends PileModel {
  @computed get isDone() {
    return this.cards.length === RANK_VALUES.length
  }

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
}
