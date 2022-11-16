import React from 'react'
import { Authenticator, Flex } from '@aws-amplify/ui-react';

function WithAuthenticator({children}) {
  return (
   
      <Authenticator >
        {children}
      </Authenticator>
   
  )
}

export default WithAuthenticator