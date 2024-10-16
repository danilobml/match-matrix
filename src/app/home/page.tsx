'use client'

import Home from "../components/Home"
import WithAuth from "../components/WithAuth"

const HomePage = () => {
  return (
    <Home />
  )
}

export default WithAuth(HomePage)
