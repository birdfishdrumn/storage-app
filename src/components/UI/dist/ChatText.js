"use strict";
exports.__esModule = true;
var react_1 = require("react");
var TextInput_1 = require("./TextInput");
var styles_1 = require("@material-ui/core/styles");
var Send_1 = require("@material-ui/icons/Send");
var IconButton_1 = require("@material-ui/core/IconButton");
var react_redux_1 = require("react-redux");
var userSlice_1 = require("reducks/users/userSlice");
var index_1 = require("firebase/index");
var useStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        wrapForm: {
            display: "flex",
            justifyContent: "center",
            width: "95%",
            margin: theme.spacing(0) + " auto"
        },
        wrapText: {
            width: "100%"
        },
        button: {
        //margin: theme.spacing(1),
        }
    });
});
var ChatText = function () {
    var avatar = react_redux_1.useSelector(userSlice_1.getUserAvatar);
    var _a = react_1.useState(""), text = _a[0], setText = _a[1];
    var inputText = function (e) {
        setText(e.target.value);
    };
    var submitHandler = function (e) {
        e.preventDefault();
        var id = index_1.db.collection("chat").doc().id;
        index_1.db.collection("chat").doc(id).set({
            title: "メッセージ",
            subtitle: text,
            avatar: avatar,
            date: index_1.FirebaseTimestamp.now(),
            id: id,
            type: "chat"
        });
    };
    var classes = useStyles();
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("form", { onSubmit: submitHandler, className: classes.wrapForm, noValidate: true, autoComplete: "off" },
            react_1["default"].createElement(TextInput_1["default"]
            // id="standard-text"
            , { 
                // id="standard-text"
                variant: "outlined", value: text, type: "text", onChange: inputText, multiline: false, rows: 1, required: true, label: "\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u5165\u529B", 
                // className={classes.wrapText}
                fullWidth: true }),
            react_1["default"].createElement(IconButton_1["default"], { type: "submit", className: classes.button },
                react_1["default"].createElement(Send_1["default"], null)))));
};
exports["default"] = ChatText;
