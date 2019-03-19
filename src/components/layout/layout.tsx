import * as React from 'react'

import 'modern-normalize'
import '../../styles/global'

import Header from '../header/header'
import LayoutRoot from './layoutRoot/layoutRoot'
import LayoutMain from './layoutMain/LayoutMain'
import MetaData from '../metaData/metaData'

interface IIndexLayout {
  children: any
}

const IndexLayout = ({ children }: IIndexLayout) => {
  return (
    <LayoutRoot>
      <MetaData />
      <Header />
      <LayoutMain>{children}</LayoutMain>
    </LayoutRoot>
  )
}

export default IndexLayout
