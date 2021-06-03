"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Divider_1 = require("@material-ui/core/Divider");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var styles_1 = require("@material-ui/core/styles");
var Delete_1 = require("@material-ui/icons/Delete");
var Edit_1 = require("@material-ui/icons/Edit");
var react_redux_1 = require("react-redux");
var userSlice_1 = require("reducks/users/userSlice");
var GlobalStyle_1 = require("style/GlobalStyle");
var connected_react_router_1 = require("connected-react-router");
var useStyles = styles_1.makeStyles(function (theme) {
    var _a;
    return ({
        list: {
            height: 128
        },
        image: {
            objectFit: 'cover',
            marginRight: 20,
            height: 106,
            width: 106,
            cursor: 'pointer'
        },
        s: s,
        media: {
            position: 'relative'
        },
        favorite: (_a = {
                position: 'absolute',
                bottom: -5,
                right: 30
            },
            _a[theme.breakpoints.down('sm')] = {
                position: 'absolute',
                bottom: -5,
                right: -35
            },
            _a),
        text: {
            width: '100%'
        },
        icon: {
            display: 'flex',
            flexDirection: 'column'
        }
    });
});
var UserPostItem = function (_a) {
    var product = _a.product;
    var classes = useStyles();
    var dispatch = react_redux_1.useDispatch();
    var _b = react_1.useState(false), openModal = _b[0], setOpenModal = _b[1];
    var name = post.name;
    var uid = react_redux_1.useSelector(userSlice_1.getUserId);
    var image = post.images[0].path;
    var id = post.id;
    var likesPostsArray = postInFavorite.map(function (post) { return post.postId; });
    var handleClose = react_1.useCallback(function () {
        setOpenModal(false);
    }, [setOpenModal]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(ListItem_1["default"], { className: classes.list },
            react_1["default"].createElement(ListItem_1["default"], { className: classes.media },
                react_1["default"].createElement("img", { className: classes.image, src: image, alt: "\u4F5C\u54C1\u753B\u50CF", onClick: function () { return dispatch(connected_react_router_1.push("/post/" + id)); } })),
            react_1["default"].createElement("div", { className: classes.text },
                react_1["default"].createElement(ListItemText_1["default"], { primary: name })),
            react_1["default"].createElement("div", { className: classes.icon },
                react_1["default"].createElement(GlobalStyle_1.WhiteIcon, { noMargin: true, onClick: function () { return dispatch(connected_react_router_1.push("/posts/edit/" + id)); } },
                    react_1["default"].createElement(Edit_1["default"], null)),
                react_1["default"].createElement(GlobalStyle_1.WhiteIcon, { noMargin: true, onClick: function () {
                        return dispatch(dialogOpenAction({ type: 'delete', title: '作品の削除', id: id }));
                    } },
                    react_1["default"].createElement(Delete_1["default"], null)))),
        react_1["default"].createElement(Divider_1["default"], null)));
};
exports["default"] = UserPostItem;
