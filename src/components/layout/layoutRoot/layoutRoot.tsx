import * as React from 'react'
import { Global, css } from '@emotion/core'
import global from '../../../styles/global'

import StyledLayoutRoot from './layoutRoot.css'

interface ILayoutRootProps {
  children: any
}

const LayoutRoot = ({ children }: ILayoutRootProps) => (
  <>
    <Global styles={() => css(global)} />
    <StyledLayoutRoot>{children}</StyledLayoutRoot>
  </>
)

export default LayoutRoot
