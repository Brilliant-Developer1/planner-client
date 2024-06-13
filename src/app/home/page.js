import React from 'react'
import { Navbar } from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import UserTypes from '../components/UserTypes'

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <UserTypes/>
      <Footer/>
    </div>
  )
}

export default HomePage