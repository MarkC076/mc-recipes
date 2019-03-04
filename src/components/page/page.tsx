import * as React from 'react'

import StyledPage from './page.css'

interface IPageProps {
  children: any
}

const Page = ({ children }: IPageProps) => <StyledPage>{children}</StyledPage>

export default Page
