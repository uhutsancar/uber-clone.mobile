import {  Text, View } from 'react-native'
import React from 'react'

const RideLayout = ({children} : {children: React.ReactNode}) => {
  return <View>
          <Text>TOP OF THE KAYOUT</Text>
          {children}
          <Text>BOTTOM OF THE KAYOUT</Text>
    </View>

}

export default RideLayout

