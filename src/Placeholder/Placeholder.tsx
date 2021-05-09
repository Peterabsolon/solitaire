import { FC } from "react"
import { observer } from "mobx-react-lite"
import styled from "styled-components"

import { CARD_HEIGHT, CARD_WIDTH } from "../constants"

interface PlaceholderProps {
  onClick?: () => void
}

export const Placeholder: FC<PlaceholderProps> = observer(({ children, onClick }) => (
  <Wrapper onClick={onClick}>{children}</Wrapper>
))

Placeholder.displayName = "Placeholder"

const Wrapper = styled.div`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  margin-right: 24px;
  margin-bottom: 24px;
  background: #efefef;
  position: relative;
  border-radius: 4px;
`
