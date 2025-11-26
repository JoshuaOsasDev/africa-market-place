import AuthProgressbar from '@/components/common/authProgressbar'
import SignUpComp from '@/components/pageComponents/signUpComp'
import React from 'react'

function page() {
  return (
    <div className='py-2'>
       <AuthProgressbar
                  level={2}
                  />
          <SignUpComp />
    </div>
  )
}

export default page