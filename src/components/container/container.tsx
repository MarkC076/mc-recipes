import * as React from 'react'
import StyledContainer from './container.css'

interface IContainerProps {
  className?: string
  children: any
}

const Container = ({ children, className }: IContainerProps) => <StyledContainer className={className}>{children}</StyledContainer>

export default Container
