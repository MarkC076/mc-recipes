import * as React from 'react'
import { Link } from 'gatsby'

import StyledHeader from './header.css'

const Header = () => (
  <StyledHeader>
    <div className="HeaderInner">
      <Link to="/">Recipe Dev</Link>
    </div>
  </StyledHeader>
)

export default Header
