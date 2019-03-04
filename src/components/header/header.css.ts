import styled from '@emotion/styled'
import { transparentize } from 'polished'

import { heights, dimensions, colors } from '../../styles/variables'

const StyledHeader = styled.div`
  height: ${heights.header}px;
  padding: 0 ${dimensions.containerPadding}rem;
  background-color: ${colors.brand};
  color: ${transparentize(0.5, colors.white)};

  .HeaderInner {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
  }

  a {
    color: ${colors.white};
    font-size: 1.5rem;
    font-weight: 600;
  }

  a:hover,
  a:focus {
    text-decoration: none;
  }
`
export default StyledHeader
