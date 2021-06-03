"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var userSlice_1 = require("reducks/users/userSlice");
var GlobalStyle_1 = require("style/GlobalStyle");
var index_1 = require("components/UI/index");
require("react-chat-elements/dist/main.css");
var react_chat_elements_typescript_1 = require("react-chat-elements-typescript");
var index_2 = require("firebase/index");
var react_router_dom_1 = require("react-router-dom");
var moment_1 = require("moment"); // #1
require("moment/locale/ja");
var styled_components_1 = require("styled-components");
var ChatWrapper = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nmargin:20px 0;\npadding:5px 0;\n"], ["\nmargin:20px 0;\npadding:5px 0;\n"])));
var ChatContainer = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nposition: relative;\n"], ["\nposition: relative;\n"])));
var ChatTextWrapper = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nposition: fixed;\nbottom:50px;\n"], ["\nposition: fixed;\nbottom:50px;\n"])));
var ChatPage = function () {
    var history = react_router_dom_1.useHistory();
    var avatar = react_redux_1.useSelector(userSlice_1.getUserAvatar);
    console.log(avatar);
    var _a = react_1.useState([]), chats = _a[0], setChats = _a[1];
    react_1.useEffect(function () {
        index_2.db.collection("chat").orderBy("date", "desc").onSnapshot(function (snapshot) {
            var list = [];
            snapshot.forEach(function (doc) {
                var data = doc.data();
                list.push(data);
            });
            setChats(list);
        });
    }, []);
    return (react_1["default"].createElement(GlobalStyle_1.SectionContainer, null,
        react_1["default"].createElement(ChatContainer, null,
            chats.map(function (item) {
                var _a, _b;
                return (react_1["default"].createElement(react_1["default"].Fragment, null, item.type === "add" ?
                    react_1["default"].createElement(ChatWrapper, { onClick: function () { return history.push("/box/" + item.id); } },
                        react_1["default"].createElement(react_chat_elements_typescript_1.ChatItem, { id: "", avatar: item.avatar, alt: 'Reactjs', title: item.title, subtitle: item.subtitle, 
                            // @ts-ignore]
                            date: moment_1["default"](new Date((_a = item.date) === null || _a === void 0 ? void 0 : _a.toDate())), unread: 0 }))
                    :
                        react_1["default"].createElement(ChatWrapper, null,
                            react_1["default"].createElement(react_chat_elements_typescript_1.ChatItem, { id: "", avatar: item.avatar, alt: 'Reactjs', title: item.title, subtitle: item.subtitle, 
                                // @ts-ignore]
                                date: moment_1["default"](new Date((_b = item.date) === null || _b === void 0 ? void 0 : _b.toDate())), unread: 0 }))));
            }),
            react_1["default"].createElement(ChatTextWrapper, null,
                react_1["default"].createElement(index_1.ChatText, null)))));
};
exports["default"] = ChatPage;
var templateObject_1, templateObject_2, templateObject_3;
