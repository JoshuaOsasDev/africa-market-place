import Banner from '@/components/common/banner'
import Footer from '@/components/common/footer'
import Header from '@/components/common/header'
import React from 'react'

function layout({
    children
 }: {
    children: React.ReactNode
}) {
  return (
    <div className=" min-h-screen  bg-[#EAEAEA] px-2 flex flex-col">
    <Header />
    <Banner />
          { 
              children
          }
    <Footer />
  </div>
  )
}

export default layout