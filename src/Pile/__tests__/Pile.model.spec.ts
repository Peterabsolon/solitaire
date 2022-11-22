/**
 * Unit test examples
 */

import { CardModel } from "../../Card"
import { RANK, RANK_VALUES, SUIT } from "../../constants"

import { PileModel } from "../Pile.model"

describe("canAdd", () => {
  describe("empty pile", () => {
    it("can add King only", () => {
      const pile = new PileModel()

      const invalidRanks = RANK_VALUES.slice(0, RANK_VALUES.length - 1) // all except last - King
      const cardKing = new CardModel({ rank: RANK.KING, suit: SUIT.CLUBS })

      invalidRanks.forEach((rank) => expect(pile.canAdd(new CardModel({ rank, suit: SUIT.CLUBS }))).toBe(false))

      expect(pile.canAdd(cardKing)).toBe(true)
    })
  })

  describe("non-empty pile", () => {
    it("can add opposite color only", () => {
      const pile = new PileModel()

      const cardBlack = new CardModel({ rank: RANK.KING, suit: SUIT.CLUBS })
      const cardBlackNext = new CardModel({ rank: RANK.QUEEN, suit: SUIT.CLUBS })
      const cardRedNext = new CardModel({ rank: RANK.QUEEN, suit: SUIT.HEARTS })

      pile.add(cardBlack)

      expect(pile.canAdd(cardBlackNext)).toBe(false)
      expect(pile.canAdd(cardRedNext)).toBe(true)
    })

    it("can add card rank below only", () => {
      const pile = new PileModel()

      const cardKingBlack = new CardModel({ rank: RANK.KING, suit: SUIT.CLUBS })
      const cardQueenRed = new CardModel({ rank: RANK.QUEEN, suit: SUIT.HEARTS })
      const invalidRanks = RANK_VALUES.slice(0, RANK_VALUES.length - 2) // all except King and Queen

      pile.add(cardKingBlack)

      invalidRanks.forEach((rank) => expect(pile.canAdd(new CardModel({ rank, suit: SUIT.CLUBS }))).toBe(false))

      expect(pile.canAdd(cardQueenRed)).toBe(true)
    })
  })
})
