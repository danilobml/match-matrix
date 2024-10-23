'use client'

import FormsList from "../components/FormsList"
import WithAuth from "../components/WithAuth"

const FormsPage = () => {
  return (
    <FormsList />
  )
}

export default WithAuth(FormsPage)