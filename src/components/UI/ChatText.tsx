import React, { useState } from 'react'
import TextInput from "./TextInput";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import { useSelector } from "react-redux";
import { getUserAvatar } from "reducks/users/userSlice";
import { db,FirebaseTimestamp } from "firebase/index";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: `${theme.spacing(0)} auto`,

    },
    wrapText  : {
        width: "100%"
    },
    button: {
        //margin: theme.spacing(1),
    },
  })
);



const ChatText = () => {

    const avatar = useSelector(getUserAvatar)

  const [text,setText] = useState<string>("")

   const inputText = (e: React.ChangeEvent<HTMLInputElement>) => {
  setText(e.target.value)

   }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const id =  db.collection("chat").doc().id

    db.collection("chat").doc(id).set({
      title:"メッセージ",
      subtitle: text,
      avatar: avatar,
      date: FirebaseTimestamp.now(),
      id: id,
      type:"chat"
    })
  }
    const classes = useStyles();
    return (
        <>
        <form onSubmit={submitHandler} className={classes.wrapForm}  noValidate autoComplete="off">
            <TextInput
                // id="standard-text"
            variant="outlined"
            value={text}
            type="text"
            onChange={inputText}
            multiline={false}
            rows={1}
            required={true}
                label="メッセージを入力"
            // className={classes.wrapText}
            fullWidth={true}
                //margin="normal"
            />
            <IconButton type="submit" className={classes.button}>
                <SendIcon />
            </IconButton>
            </form>
        </>
    )
}

export default ChatText
