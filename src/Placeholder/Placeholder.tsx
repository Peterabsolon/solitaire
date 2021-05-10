import { FC } from "react"
import { observer } from "mobx-react-lite"
import styled from "styled-components"

import { BORDER_RADIUS, CARD_HEIGHT, CARD_WIDTH } from "../constants"

interface PlaceholderProps {
  className?: string
  onClick?: () => void
  onDrop?: (event: any) => void
  onDragOver?: (event: any) => void
}

export const Placeholder: FC<PlaceholderProps> = observer(
  ({ children, className, onClick, onDrop, onDragOver }) => (
    <Wrapper className={className} onClick={onClick} onDragOver={onDragOver} onDropCapture={onDrop}>
      {children}
    </Wrapper>
  )
)

Placeholder.displayName = "Placeholder"

const Wrapper = styled.div`
  width: ${CARD_WIDTH};
  height: ${CARD_HEIGHT};
  border-radius: ${BORDER_RADIUS};
  margin-bottom: 1vw;
  margin-right: 1vw;
  background: #424242;
  position: relative;
`
