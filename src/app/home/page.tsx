'use client'

import HomePage from "../components/HomePage"
import WithAuth from "../components/WithAuth"

const page = () => {
  return (
    <HomePage />
  )
}

export default WithAuth(page)
