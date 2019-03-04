import * as React from 'react'
import StyledLayoutMain from './layoutMain.css'

interface ILayoutMainProps {
  children: any
}

const LayoutMain = ({ children }: ILayoutMainProps) => <StyledLayoutMain>{children}</StyledLayoutMain>

export default LayoutMain
