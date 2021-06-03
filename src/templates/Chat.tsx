import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import {getUserAvatar  } from "reducks/users/userSlice";
import { SectionContainer } from "style/GlobalStyle"
import { ChatText } from "components/UI/index";
import 'react-chat-elements/dist/main.css';
import { ChatItem, MessageBox } from 'react-chat-elements-typescript'
import { Chat } from "types/chat"
import { db } from "firebase/index";
import {useHistory} from "react-router-dom"
import moment from 'moment'; // #1
import 'moment/locale/ja';
import styled from "styled-components"

const ChatWrapper = styled.div`
margin:20px 0;
padding:5px 0;
`


const ChatContainer = styled.div`
position: relative;
`

const ChatTextWrapper = styled.div`
position: fixed;
bottom:50px;
`

const ChatPage = () => {
  const history =useHistory()
  const avatar = useSelector(getUserAvatar)
  console.log(avatar)
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    db.collection("chat").orderBy("date","desc").onSnapshot((snapshot) => {
      const list:any = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        list.push(data)
      })
      setChats(list)
   })
  }, [])
  return (
    <SectionContainer>
      <ChatContainer>
      {chats.map((item) => (
        <>

          {item.type === "add" ?
            <ChatWrapper onClick={()=>history.push(`/box/${item.id}`)}>

            <ChatItem
        id=""
    avatar={item.avatar}
    alt={'Reactjs'}
    title={item.title}
            subtitle={item.subtitle}
// @ts-ignore]
    date={moment(new Date(item.date?.toDate()))}
            unread={0} />
          </ChatWrapper>
            :
    <ChatWrapper>

            <ChatItem
        id=""
    avatar={item.avatar}
    alt={'Reactjs'}
    title={item.title}
            subtitle={item.subtitle}
// @ts-ignore]

    date={moment(new Date(item.date?.toDate()))}
            unread={0} />
          </ChatWrapper>
      }

          </>
      ))}

      <ChatTextWrapper>
      <ChatText/>
      </ChatTextWrapper>
      </ChatContainer>

    </SectionContainer>

  )
}

export default ChatPage
