/**
 * Integration test examples
 */

import { fireEvent, render, screen } from "@testing-library/react"

import { CardModel } from "../../Card"
import { RANK, RANK_VALUES, SUIT } from "../../constants"

import { Pile } from "../Pile"
import { PileModel } from "../Pile.model"

const CARDS = RANK_VALUES.map((rank) => new CardModel({ rank, suit: SUIT.CLUBS }))
const CARD_LAST_TEST_ID = `${RANK.KING}-${SUIT.CLUBS}`

let pile: PileModel

beforeEach(() => {
  pile = new PileModel()
  CARDS.forEach((card) => pile.add(card))
})

it("renders Pile without crashing", () => {
  render(<Pile index={0} pile={pile} />)
  const placeholder = screen.getByTestId(/Placeholder/i)
  expect(placeholder).toBeInTheDocument()
})

it("renders Cards from Pile", () => {
  render(<Pile index={0} pile={pile} />)

  CARDS.forEach((card) => {
    const cardEl = screen.getByTestId(`${card.rank}-${card.suit}`)
    expect(cardEl).toBeInTheDocument()
  })
})

it("calls onCardClick only by clicking on the last Card", () => {
  const onCardClick = jest.fn()

  render(<Pile index={0} pile={pile} onCardClick={onCardClick} />)

  CARDS.slice(0, CARDS.length - 1).forEach((card, index) => {
    const cardEl = screen.getByTestId(`${card.rank}-${card.suit}`)
    fireEvent(cardEl, new MouseEvent("click", { bubbles: true }))
    expect(onCardClick).not.toBeCalled()
  })

  const cardLast = screen.getByTestId(CARD_LAST_TEST_ID)
  fireEvent(cardLast, new MouseEvent("click", { bubbles: true }))
  expect(onCardClick).toBeCalled()
})

describe("drag-n-drop", () => {
  // Mock native DragEvent to make assertions possible.
  // Native DragEvent can not be constructed due to security reasons, read more:
  // https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/DragEvent
  class CustomDragEvent extends Event {
    data: { [key: string]: string } = {}

    dataTransfer = {
      setData: (key: string, value: string) => {
        this.data[key] = value
      },

      getData: (key: string): string | undefined => {
        return this.data[key]
      },
    }
  }

  Object.defineProperty(window, "DragEvent", {
    value: CustomDragEvent,
  })

  describe("drag Card", () => {
    it("broadcasts card/pile indexes", () => {
      render(<Pile index={0} pile={pile} />)

      const cardLast = screen.getByTestId(CARD_LAST_TEST_ID)
      const event = new CustomDragEvent("dragstart", { bubbles: true })
      const setDataSpy = jest.spyOn(event.dataTransfer, "setData")

      fireEvent(cardLast, event)

      expect(setDataSpy).toBeCalledWith("cardIndex", "12")
      expect(setDataSpy).toBeCalledWith("pileIndex", "0")
    })
  })

  describe("drop on Pile", () => {
    it("reads broadcasted data and calls onCardDrop", () => {
      const onCardDrop = jest.fn()
      const cardIndex = "12"
      const pileIndexFrom = "3"
      const pileIndexTo = 1

      render(<Pile index={pileIndexTo} pile={pile} onCardDrop={onCardDrop} />)

      const placeholder = screen.getByTestId("Placeholder")
      const event = new CustomDragEvent("drop", { bubbles: true })

      event.dataTransfer.setData("cardIndex", cardIndex)
      event.dataTransfer.setData("pileIndex", pileIndexFrom)

      fireEvent(placeholder, event)

      expect(onCardDrop).toBeCalledWith(
        false,
        Number(cardIndex),
        Number(pileIndexFrom),
        pileIndexTo
      )
    })
  })
})
