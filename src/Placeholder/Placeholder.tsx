import { FC } from "react"
import { observer } from "mobx-react-lite"
import styled from "styled-components"

import { BORDER_RADIUS, CARD_HEIGHT, CARD_WIDTH } from "../constants"

interface PlaceholderProps {
  onClick?: () => void
  onDrop?: (event: any) => void
  onDragOver?: (event: any) => void
}

export const Placeholder: FC<PlaceholderProps> = observer(
  ({ children, onClick, onDrop, onDragOver }) => (
    <Wrapper onClick={onClick} onDragOver={onDragOver} onDropCapture={onDrop}>
      {children}
    </Wrapper>
  )
)

Placeholder.displayName = "Placeholder"

const Wrapper = styled.div`
  width: ${CARD_WIDTH};
  height: ${CARD_HEIGHT};
  border-radius: ${BORDER_RADIUS};
  margin-right: 24px;
  margin-bottom: 24px;
  background: #0d680d;
  position: relative;
`
