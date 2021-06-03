"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.CircleImage = exports.StyledImage = exports.ListDesign = exports.ImageWrapper = exports.ScrollFlex = exports.ImageFlex = exports.ScrollItem = exports.Scroll = exports.ScrollMixin = exports.IconFlex = exports.TwoColumn = exports.SectionContainer = exports.GridLow = exports.GridList = exports.SectionWrapping = exports.SectionWrapper = exports.Main = exports.StyledBoldText = exports.BoldText = exports.RequiredText = exports.MinText = exports.Text = exports.BorderTitle = exports.Title = exports.UnderLineText = exports.WhiteIcon = exports.Flex = exports.StyledLink = exports.Border = void 0;
var styled_components_1 = require("styled-components");
var react_router_dom_1 = require("react-router-dom");
var IconButton_1 = require("@material-ui/core/IconButton");
// ----------UI-------------
exports.Border = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 30px;\n  position: relative;\n  :before {\n    content: '';\n    background-image: linear-gradient(to right, red, red 15px, white 15px, white 8px);\n    background-size: 30px 30px;\n    background-repeat: repeat-x;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n  }\n"], ["\n  height: 30px;\n  position: relative;\n  :before {\n    content: '';\n    background-image: linear-gradient(to right, red, red 15px, white 15px, white 8px);\n    background-size: 30px 30px;\n    background-repeat: repeat-x;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n  }\n"])));
exports.StyledLink = styled_components_1["default"](react_router_dom_1.Link)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-decoration: none;\n"], ["\n  text-decoration: none;\n"])));
exports.Flex = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  justify-content: ", ";\n  ", "\n"], ["\n  display: flex;\n  justify-content: ", ";\n  ",
    "\n"])), function (props) { return (props.between ? 'space-between' : 'center'); }, function (props) {
    return props.cursor &&
        "\n cursor:pointer;\n";
});
exports.WhiteIcon = styled_components_1["default"](IconButton_1["default"])(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background: white;\n  box-shadow: 2px 2px 4px gray;\n  margin: ", ";\n  @media (max-width: 768px) {\n    margin: 10px;\n  }\n  &:hover {\n    background: #33cccc;\n    color: white;\n    > img {\n      color: white;\n    }\n  }\n"], ["\n  background: white;\n  box-shadow: 2px 2px 4px gray;\n  margin: ", ";\n  @media (max-width: 768px) {\n    margin: 10px;\n  }\n  &:hover {\n    background: #33cccc;\n    color: white;\n    > img {\n      color: white;\n    }\n  }\n"])), function (props) { return (props.noMargin ? '5px' : '15px'); });
// -------TEXT----------
exports.UnderLineText = styled_components_1["default"].span(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  background: linear-gradient(transparent 70%, #ff99cc 70%);\n"], ["\n  background: linear-gradient(transparent 70%, #ff99cc 70%);\n"])));
exports.Title = styled_components_1["default"].h2(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  color: ", ";\n  margin: 0 auto;\n  padding: ", ";\n  font-weight: 900;\n  font-size: ", ";\n  text-align: ", ";\n  ", "\n  ", "\n@media(max-width:768px) {\n    font-size: ", ";\n  }\n"], ["\n  color: ", ";\n  margin: 0 auto;\n  padding: ", ";\n  font-weight: 900;\n  font-size: ", ";\n  text-align: ", ";\n  ",
    "\n  ",
    "\n@media(max-width:768px) {\n    font-size: ", ";\n  }\n"])), function (props) { return (props.dimgray ? 'dimgray' : '#2F4F4F'); }, function (props) { return (props.min ? '10px 0' : '20px 25px 20px 25px'); }, function (props) { return (props.min ? '1.3rem' : '1.6rem'); }, function (props) { return (props.left ? 'left' : 'center'); }, function (props) {
    return props.firstLetter &&
        "\n  ::first-letter {\n  font-size: 180%;\n  font-style: italic;\n  margin-right:5px;\n  color:#00CED1;\n}\n";
}, function (props) {
    return props.pointer &&
        "\n cursor:pointer;\n";
}, function (props) { return (props.min ? '1.2rem' : '1.5rem'); });
exports.BorderTitle = styled_components_1["default"](exports.Title)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  color: black;\n  margin: 0 auto;\n  border: 2px solid black;\n  padding: 5px 10px;\n  display: inline-block;\n  border-radius: 10px;\n"], ["\n  color: black;\n  margin: 0 auto;\n  border: 2px solid black;\n  padding: 5px 10px;\n  display: inline-block;\n  border-radius: 10px;\n"])));
exports.Text = styled_components_1["default"].p(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  text-align: ", ";\n  margin: 0 15px;\n  font-weight: ", ";\n  color: ", ";\n  color: ", ";\n  font-size: ", ";\n  padding: 20px 0;\n  text-shadow: ", ";\n  text-shadow: ", ";\n  line-height: 1.8rem;\n  @media (max-width: 768px) {\n    font-size: 0.95rem;\n    line-height: 1.5rem;\n  }\n"], ["\n  text-align: ", ";\n  margin: 0 15px;\n  font-weight: ", ";\n  color: ", ";\n  color: ", ";\n  font-size: ", ";\n  padding: 20px 0;\n  text-shadow: ", ";\n  text-shadow: ", ";\n  line-height: 1.8rem;\n  @media (max-width: 768px) {\n    font-size: 0.95rem;\n    line-height: 1.5rem;\n  }\n"])), function (props) { return (props.left ? 'left' : 'center'); }, function (props) { return (props.large ? '900' : '400'); }, function (props) { return (props.white ? 'white' : 'dimgray'); }, function (props) { return props.black && 'black'; }, function (props) { return (props.large ? '1.3rem' : '1.1rem'); }, function (props) { return props.shadow && '1px 1px 2px black'; }, function (props) { return props.whiteShadow && '1px 1px 2px white'; });
exports.MinText = styled_components_1["default"].p(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  text-align: ", ";\n  margin: 0 5px;\n  font-weight: 500;\n  color: ", ";\n  font-size: 0.9rem;\n  padding: ", ";\n  @media (max-width: 768px) {\n    font-size: ", ";\n  }\n"], ["\n  text-align: ", ";\n  margin: 0 5px;\n  font-weight: 500;\n  color: ", ";\n  font-size: 0.9rem;\n  padding: ", ";\n  @media (max-width: 768px) {\n    font-size: ", ";\n  }\n"])), function (props) { return (props.left ? 'left' : 'center'); }, function (props) { return (props.red ? 'red' : 'dimgray'); }, function (props) { return (props.nonePadding ? '0' : '10px 0'); }, function (props) { return props.min && '0.8rem'; });
exports.RequiredText = styled_components_1["default"].span(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  /* display:inline-block; */\n  color: white;\n  background: ", ";\n  padding: 3px;\n  border-radius: 5px;\n  font-size: 0.8rem;\n  font-weight: bold;\n  float: left;\n  margin: 0 7px;\n  align-items: center;\n"], ["\n  /* display:inline-block; */\n  color: white;\n  background: ", ";\n  padding: 3px;\n  border-radius: 5px;\n  font-size: 0.8rem;\n  font-weight: bold;\n  float: left;\n  margin: 0 7px;\n  align-items: center;\n"])), function (props) { return (props.gray ? '#C0C0C0' : 'red'); });
exports.BoldText = styled_components_1["default"].p(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  font-weight: bolder;\n  font-size: ", ";\n  text-align: center;\n  color: ", ";\n  text-align: ", ";\n  text-align: ", ";\n  ", ";\n  ", "\n"], ["\n  font-weight: bolder;\n  font-size: ", ";\n  text-align: center;\n  color: ", ";\n  text-align: ", ";\n  text-align: ", ";\n  ",
    ";\n  ",
    "\n"])), function (props) { return (props.min ? '0.8rem' : '1rem'); }, function (props) { return props.color; }, function (props) { return props.left && 'left'; }, function (props) { return props.right && 'right'; }, function (props) {
    return props.image &&
        "\n  width:45%;\n  margin:10px auto;\n  @media(max-width:768px){\n    width:80%;\n  }\n";
}, function (props) {
    return props.pointer &&
        "\n  cursor:pointer;\n";
});
exports.StyledBoldText = styled_components_1["default"](exports.BoldText.withComponent('span'))(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  ", "\n"], ["\n  ",
    "\n"])), function (props) {
    return !props.center &&
        "\n    float:left;\n  ";
});
// ----------------Layout--------------------
exports.Main = styled_components_1["default"].div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  padding: 70px 0;\n"], ["\n  padding: 70px 0;\n"])));
exports.SectionWrapper = styled_components_1["default"].section(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  margin: 70px auto;\n  margin-top: 10px;\n  max-width: ", ";\n  position: relative;\n  padding: 0 auto;\n  text-align: center;\n  width: 100%;\n"], ["\n  margin: 70px auto;\n  margin-top: 10px;\n  max-width: ", ";\n  position: relative;\n  padding: 0 auto;\n  text-align: center;\n  width: 100%;\n"])), function (props) { return (props.top ? '1224px' : '1024px'); });
exports.SectionWrapping = styled_components_1["default"].section(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  margin: ", ";\n\n  max-width: 924px;\n  position: relative;\n  padding: 0 20px;\n  text-align: center;\n  /* width: calc(100% - 2rem); */\n\n  background-color: ", ";\n  @media (max-width: 768px) {\n    padding: 0;\n  }\n"], ["\n  margin: ", ";\n\n  max-width: 924px;\n  position: relative;\n  padding: 0 20px;\n  text-align: center;\n  /* width: calc(100% - 2rem); */\n\n  background-color: ", ";\n  @media (max-width: 768px) {\n    padding: 0;\n  }\n"])), function (props) { return (props.large ? '50px auto' : '50px auto'); }, function (props) { return props.white && 'white'; });
exports.GridList = styled_components_1["default"].div(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  list-style: none;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n  grid-gap: 20px;\n  max-width: 1124px;\n  text-align: center;\n  margin: 0 auto;\n\n  grid-gap: ", ";\n  grid-template-columns: ", ";\n  @media (max-width: 1024px) {\n    grid-template-columns: ", ";\n  }\n  @media (max-width: 767px) {\n    grid-template-columns: ", ";\n    margin: 0;\n    grid-gap: 0px;\n  }\n"], ["\n  list-style: none;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n  grid-gap: 20px;\n  max-width: 1124px;\n  text-align: center;\n  margin: 0 auto;\n\n  grid-gap: ", ";\n  grid-template-columns: ", ";\n  @media (max-width: 1024px) {\n    grid-template-columns: ", ";\n  }\n  @media (max-width: 767px) {\n    grid-template-columns: ", ";\n    margin: 0;\n    grid-gap: 0px;\n  }\n"])), function (props) { return props.gap && '20px'; }, function (props) { return props.contest && '1fr 1fr 1fr 1fr 1fr'; }, function (props) { return (props.contest ? '1fr 1fr 1fr 1fr ' : '1fr 1fr 1fr'); }, function (props) { return (props.single ? '1fr' : '1fr 1fr'); });
exports.GridLow = styled_components_1["default"].div(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  margin: 0 auto;\n  @media (min-width: 1024px) {\n    width: 1024px;\n    display: flex;\n\n    flex-flow: row wrap;\n    justify-content: center;\n  }\n"], ["\n  margin: 0 auto;\n  @media (min-width: 1024px) {\n    width: 1024px;\n    display: flex;\n\n    flex-flow: row wrap;\n    justify-content: center;\n  }\n"])));
exports.SectionContainer = styled_components_1["default"].div(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\nbackground:white;\n  position: relative;\n  margin: ", ";\n  text-align: center;\n  max-width: 450px;\n  padding: 5px;\n  height: auto;\n  width: calc(100% - 1rem);\n"], ["\nbackground:white;\n  position: relative;\n  margin: ", ";\n  text-align: center;\n  max-width: 450px;\n  padding: 5px;\n  height: auto;\n  width: calc(100% - 1rem);\n"])), function (props) { return (props.margin ? '70px auto' : '0 auto'); });
exports.TwoColumn = styled_components_1["default"].div(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n  display: flex;\n  @media (max-width: 768px) {\n    flex-direction: column;\n  }\n"], ["\n  display: flex;\n  @media (max-width: 768px) {\n    flex-direction: column;\n  }\n"])));
// --------------Flex----------------------
exports.IconFlex = styled_components_1["default"].div(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n  display: flex;\n  list-style: none;\n  justify-content: ", ";\n  ", ";\n  padding: ", ";\n  >div{\n    margin:10px;\n  }\n"], ["\n  display: flex;\n  list-style: none;\n  justify-content: ", ";\n  ",
    ";\n  padding: ", ";\n  >div{\n    margin:10px;\n  }\n"])), function (props) { return (props.between ? 'space-between' : 'center'); }, function (props) {
    return props.nav &&
        "\n justify-content:space-between;\n       overflow-x: scroll;\n      white-space: nowrap;\n      -webkit-overflow-scrolling: touch;\n      width:100%;\n ";
}, function (props) { return props.padding && '30px'; });
exports.ScrollMixin = styled_components_1.css(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n"], ["\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n"])));
exports.Scroll = styled_components_1["default"].div(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n  overflow-x: auto;\n  white-space: nowrap;\n  -webkit-overflow-scrolling: touch;\n"], ["\n  overflow-x: auto;\n  white-space: nowrap;\n  -webkit-overflow-scrolling: touch;\n"])));
exports.ScrollItem = styled_components_1["default"].li(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n  display: inline-block;\n  width: ", ";\n  margin: 10px;\n"], ["\n  display: inline-block;\n  width: ", ";\n  margin: 10px;\n"])), function (props) { return props.width && '250px'; });
exports.ImageFlex = styled_components_1["default"].div(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n  display: flex;\n  margin: 20px 0;\n  @media (max-width: 768px) {\n    flex-direction: column;\n  }\n"], ["\n  display: flex;\n  margin: 20px 0;\n  @media (max-width: 768px) {\n    flex-direction: column;\n  }\n"])));
exports.ScrollFlex = styled_components_1["default"].div(templateObject_25 || (templateObject_25 = __makeTemplateObject(["\n  ", ";\n  display: flex;\n  > img {\n    margin: 20px 40px;\n  }\n"], ["\n  ", ";\n  display: flex;\n  > img {\n    margin: 20px 40px;\n  }\n"])), exports.ScrollMixin);
// ーーーーーーーーーーナビゲーションーーーーーーーーーーー
// ------------背景ーーーーーーーーーーーーーーー
exports.ImageWrapper = styled_components_1["default"].div(templateObject_26 || (templateObject_26 = __makeTemplateObject(["\n  margin: 40px auto;\n"], ["\n  margin: 40px auto;\n"])));
// ーーーーーー装飾リストーーーーーーーーー
exports.ListDesign = styled_components_1["default"].ol(templateObject_27 || (templateObject_27 = __makeTemplateObject(["\n  counter-reset: list;\n  list-style-type: none;\n  font: 14px/1.6 'arial narrow', sans-serif;\n  padding: 0;\n\n  > li {\n    position: relative;\n    padding: 20px 0 10px 15px;\n    margin-left: 20px;\n    font-weight: bold;\n    font-size: 1.3rem;\n    line-height: 30px;\n    text-align: left;\n    color: #2f4f4f;\n    @media (max-width: 768px) {\n      font-size: 1.2rem;\n    }\n  }\n  li:before {\n    counter-increment: list;\n    content: '';\n    display: block;\n    position: absolute;\n    left: 0px;\n    height: 10px;\n    width: 10px;\n    border-radius: 50%;\n    background: #f6a38b;\n    top: 60%;\n    -moz-transform: translateY(-50%);\n    -webkit-transform: translateY(-50%);\n    -o-transform: translateY(-50%);\n    -ms-transform: translateY(-50%);\n    transform: translateY(-50%);\n  }\n"], ["\n  counter-reset: list;\n  list-style-type: none;\n  font: 14px/1.6 'arial narrow', sans-serif;\n  padding: 0;\n\n  > li {\n    position: relative;\n    padding: 20px 0 10px 15px;\n    margin-left: 20px;\n    font-weight: bold;\n    font-size: 1.3rem;\n    line-height: 30px;\n    text-align: left;\n    color: #2f4f4f;\n    @media (max-width: 768px) {\n      font-size: 1.2rem;\n    }\n  }\n  li:before {\n    counter-increment: list;\n    content: '';\n    display: block;\n    position: absolute;\n    left: 0px;\n    height: 10px;\n    width: 10px;\n    border-radius: 50%;\n    background: #f6a38b;\n    top: 60%;\n    -moz-transform: translateY(-50%);\n    -webkit-transform: translateY(-50%);\n    -o-transform: translateY(-50%);\n    -ms-transform: translateY(-50%);\n    transform: translateY(-50%);\n  }\n"])));
// -------写真のスタイリングーーーーーーーーー
exports.StyledImage = styled_components_1["default"].img(templateObject_28 || (templateObject_28 = __makeTemplateObject(["\n  width: ", "px;\n  height: ", "px;\n  object-fit: contain;\n  margin: 10px;\n  @media (max-width: 768px) {\n    width: ", ";\n    margin: 0 auto;\n  }\n"], ["\n  width: ", "px;\n  height: ", "px;\n  object-fit: contain;\n  margin: 10px;\n  @media (max-width: 768px) {\n    width: ", ";\n    margin: 0 auto;\n  }\n"])), function (props) { return props.width; }, function (props) { return props.height; }, function (props) { return (props.min ? '20%' : '95%'); });
exports.CircleImage = styled_components_1["default"].img(templateObject_29 || (templateObject_29 = __makeTemplateObject(["\n  border-radius: 50%;\n  width: 90%;\n"], ["\n  border-radius: 50%;\n  width: 90%;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29;
