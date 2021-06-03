"use strict";
exports.__esModule = true;
var react_1 = require("react");
var GlobalStyle_1 = require("style/GlobalStyle");
var react_redux_1 = require("react-redux");
var index_1 = require("components/UI/index");
var index_2 = require("firebase/index");
var index_3 = require("components/Product/index");
var data_1 = require("components/Product/data");
var Delete_1 = require("@material-ui/icons/Delete");
var LocalShipping_1 = require("@material-ui/icons/LocalShipping");
var IconButton_1 = require("@material-ui/core/IconButton");
var GridOn_1 = require("@material-ui/icons/GridOn");
var ViewList_1 = require("@material-ui/icons/ViewList");
var getPlace_1 = require("fooks/getPlace");
var index_4 = require("components/Product/index");
var snackbarSlice_1 = require("reducks/snackbarSlice");
var BoxesList = function (_a) {
    // let id = window.location.pathname.split('/place')[1];
    var id = _a.id;
    // if (id) {
    //   id = id.split('/')[1];
    // }
    // console.log(id);
    var dispatch = react_redux_1.useDispatch();
    var _b = react_1.useState([]), boxes = _b[0], setBoxes = _b[1];
    var _c = react_1["default"].useState(''), selectedValue = _c[0], setSelectedValue = _c[1];
    var _d = react_1.useState([]), boxArray = _d[0], setBoxArray = _d[1];
    var _e = react_1.useState(false), move = _e[0], setMove = _e[1];
    var _f = react_1.useState(false), deleteBox = _f[0], setDeleteBox = _f[1];
    var _g = react_1.useState(''), place = _g[0], setPlace = _g[1];
    var _h = react_1.useState(false), list = _h[0], setList = _h[1];
    var places = getPlace_1.usePlaceList().places;
    var query = selectedValue
        ? index_2.db.collection('boxes').where('placeId', '==', id).where('boxType', '==', selectedValue)
        : index_2.db.collection('boxes').where('placeId', '==', id);
    react_1.useEffect(function () {
        var unSub = query.onSnapshot(function (snapshot) {
            var list = [];
            snapshot.forEach(function (doc) {
                var data = doc.data();
                list.push(data);
            });
            setBoxes(list);
        });
        return function () {
            unSub();
        };
    }, [selectedValue]);
    var handleChange = react_1.useCallback(function (event) {
        setSelectedValue(event.target.value);
    }, [setSelectedValue]);
    console.log(boxArray);
    // const idArray = ["cbZpQ5thnxkE2VI7SFFp","5OGwJrZfUPCpkKiycQWN"]
    var deleteBoxAction = function () {
        boxArray.forEach(function (i) {
            index_2.db.collection("boxes").doc(i)["delete"]().then(function () {
                dispatch(snackbarSlice_1.snackbarOpenAction({ text: "\u7BB1\u3092\u524A\u9664\u3057\u307E\u3057\u305F!", type: true }));
            });
        });
    };
    var moveBoxAction = function (place) {
        boxArray.forEach(function (i) {
            index_2.db.collection("boxes").doc(i).update({
                placeId: place
            }).then(function () {
                dispatch(snackbarSlice_1.snackbarOpenAction({ text: "\u7BB1\u3092\u79FB\u52D5\u3057\u307E\u3057\u305F", type: true }));
            });
        });
    };
    return (react_1["default"].createElement(GlobalStyle_1.SectionWrapper, null,
        react_1["default"].createElement(GlobalStyle_1.Title, null,
            id,
            "\u306E\u7BB1"),
        react_1["default"].createElement(GlobalStyle_1.IconFlex, null,
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(GlobalStyle_1.MinText, { onClick: function () { return setMove(!move); } }, "\u7BB1\u3092\u79FB\u52D5"),
                move &&
                    react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(index_1.SelectBox, { label: '保管場所', required: true, options: places, select: setPlace, value: place, move: true }),
                        place &&
                            react_1["default"].createElement(IconButton_1["default"], { onClick: function () { return moveBoxAction(place); } },
                                react_1["default"].createElement(LocalShipping_1["default"], { style: { fontSize: "30px" } })))),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(GlobalStyle_1.MinText, { onClick: function () { return setDeleteBox(!deleteBox); } }, "\u7BB1\u3092\u524A\u9664"),
                deleteBox &&
                    react_1["default"].createElement(IconButton_1["default"], { onClick: function () { return deleteBoxAction(); } },
                        react_1["default"].createElement(Delete_1["default"], { style: { fontSize: "30px" } }))),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(IconButton_1["default"], { onClick: function () { return setList(false); } },
                    react_1["default"].createElement(GridOn_1["default"], null)),
                react_1["default"].createElement(IconButton_1["default"], { onClick: function () { return setList(true); } },
                    react_1["default"].createElement(ViewList_1["default"], null)))),
        react_1["default"].createElement(index_1.RadioGroupe, { data: data_1.boxData, selectedValue: selectedValue, setSelectedValue: setSelectedValue, handleChange: handleChange }),
        react_1["default"].createElement("div", { className: "module-spacer--medium" }),
        list ? (boxes.length && boxes.map(function (box) { return (react_1["default"].createElement(index_4.BoxListItem, { boxes: box, boxArray: boxArray, setBoxArray: setBoxArray, move: move, deleteBox: deleteBox })); })) : (react_1["default"].createElement(GlobalStyle_1.GridList, null, boxes.length ? (boxes.map(function (box) { return (react_1["default"].createElement(index_3.BoxCard, { key: box.id, boxes: box, name: box.name, id: box.id, images: box.images, placeId: id, boxArray: boxArray, setBoxArray: setBoxArray, move: move, deleteBox: deleteBox })); })) : (react_1["default"].createElement(react_1["default"].Fragment, null)))),
        !boxes.length && react_1["default"].createElement(GlobalStyle_1.BoldText, null, "\u767B\u9332\u3055\u308C\u305F\u4F5C\u54C1\u306F\u307E\u3060\u3042\u308A\u307E\u305B\u3093\u3002"),
        react_1["default"].createElement(index_1.FloatingActionButton, { type: "\u7BB1", name: "\u7BB1\u767B\u9332", placeId: id })));
};
exports["default"] = BoxesList;
