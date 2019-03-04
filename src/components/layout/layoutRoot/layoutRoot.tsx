import * as React from 'react'
import { Global, css } from '@emotion/core'
import normalize from '../../../styles/normalize'

import StyledLayoutRoot from './layoutRoot.css'

interface ILayoutRootProps {
  children: any
}

const LayoutRoot = ({ children }: ILayoutRootProps) => (
  <>
    <Global styles={() => css(normalize)} />
    <StyledLayoutRoot>{children}</StyledLayoutRoot>
  </>
)

export default LayoutRoot
