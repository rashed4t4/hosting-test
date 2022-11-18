import React from 'react'
import { Authenticator, Flex } from '@aws-amplify/ui-react';
import { useSelector } from 'react-redux';
import PostSignUp from '../pages/PostSignUp';

function WithAuthenticator({children}) {

  const justSignedUp = useSelector((state)=>state.userState.justSignedUp)
  console.log(justSignedUp)
  return (
      <Authenticator >
        {justSignedUp &&  <PostSignUp/>}
        {children}
      </Authenticator>
   
  )
}

export default WithAuthenticator