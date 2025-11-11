import AuthProgressbar from '@/components/common/authProgressbar'
import LoginComp from '@/components/pageComponents/loginComp'
import React from 'react'

function page() {
  return (
    <div>
       <AuthProgressbar
                  level={2}
                  />
      <LoginComp />
    </div>
  )
}

export default page