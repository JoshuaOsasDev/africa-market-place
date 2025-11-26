import AuthProgressbar from '@/components/common/authProgressbar'
import LoginComp from '@/components/pageComponents/loginComp'
import React from 'react'

function page() {
  return (
    <div className='py-2'>
       <AuthProgressbar
                  level={2}
                  />
      <LoginComp />
    </div>
  )
}

export default page