import styled from '@emotion/styled'

import { widths } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

const StyledContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  max-width: ${getEmSize(widths.lg)}em;
`

export default StyledContainer
