import React from 'react'
import Header from '../components/Header/Header'
import User from '../components/User/User'
import UserModal from '../components/UserModal/UserModal'
const MainLayout = () => {
  return (
    <div>
      <Header/>
      <User/>
      <UserModal/>
    </div>
  )
}

export default MainLayout
