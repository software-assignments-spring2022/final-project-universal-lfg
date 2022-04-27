import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Channel, Chat, ChannelList, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider } from 'stream-chat-expo';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { DeepPartial, Theme } from 'stream-chat-expo';
const API_KEY = 'fgmh55s8ehws'

//Instance of chat client 
const chatClient = StreamChat.getInstance(API_KEY);

export default function ChatRoom(props) {
  const [channel, setChannel] = useState()
  
  return (
    <SafeAreaProvider>
        {channel ? (
          <Channel channel={channel} >
            <MessageList />
            <MessageInput />
          </Channel>
        ) : (
          <ChannelList onSelect={setChannel} />
        )}
    </SafeAreaProvider>
  );
}

