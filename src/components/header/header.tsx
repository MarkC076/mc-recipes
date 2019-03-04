import * as React from 'react'
import { Link } from 'gatsby'

import StyledHeader from './header.css'

interface IHeaderProps {
  title: string
}

const Header = ({ title }: IHeaderProps) => (
  <StyledHeader>
    <div className="HeaderInner">
      <Link to="/">{title}</Link>
    </div>
  </StyledHeader>
)

export default Header
