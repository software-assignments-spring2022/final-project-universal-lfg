import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { StreamChat } from 'stream-chat';
import { useChatContext, Channel, Chat, ChannelList, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider} from 'stream-chat-expo';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { DeepPartial, Theme } from 'stream-chat-expo';
import ChatRoom from './ChatRoom'
const Stack = createStackNavigator()
const API_KEY = 'fgmh55s8ehws'

function SelectedChat({route, navigation}){
  const { channel } = useChatContext();
  const { name } = channel.data
  useEffect(() => {
    navigation.setOptions({title: name})
  }, [])
  return(
    <SafeAreaProvider>
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaProvider>
  )
}

function ChatList(props) {
  const {client} = useChatContext(); 
  const filter = {
    type:'messaging', 
    members:{
      $in: [client.user.id]
    }
  }
  return (
    <SafeAreaProvider>
        <ChannelList filters={filter} onSelect={(channel) => {
          const {name} = channel.data
          const lobbyParams = {
            title: name,
            lobbyId: channel.id
          }
          props.navigation.navigate('ChatRoom', {lobbyParams:lobbyParams})
          }} />
    </SafeAreaProvider>
  );
}

export default function ChatListStack({route, navigation}){
  return(
      <Stack.Navigator screenOptions={{initialRouteName: "ChatList"}}>
          <Stack.Screen name = 'ChatList' component={ChatList} initialParams={{route:route, navigation:navigation}} options={{headerShown:false}}/>
          <Stack.Screen name = 'ChatRoom' component={ChatRoom} options={{headerBackTitleVisible:false, headerShown:false}}/>
      </Stack.Navigator>
  )
}

