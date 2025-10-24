import React from 'react'
import Header from '../components/Header/Header'
import User from '../components/User/User'
import UserModal from '../components/UserModal/UserModal'
import UserDrawer from '../components/UserDrawer/UserDrawer'
const MainLayout = () => {
  return (
    <div>
      <Header/>
      <User/>
      <UserModal/>
      <UserDrawer/>
    </div>
  )
}

export default MainLayout
