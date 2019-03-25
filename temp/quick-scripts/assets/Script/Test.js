(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Test.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd2a8fWNuV5KtKsS42SoChwD', 'Test', __filename);
// Script/Test.js

"use strict";

var _CocosHammer = require("./CocosHammer");

var _CocosHammer2 = _interopRequireDefault(_CocosHammer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PREVSET_EVENTS = ["panstart panmove panend pancancel", "tap", "swipeleft swiperight", "press pressup"];
var HANDLE_MAP = ["onPan", "onTap", "onSwipe", "onPress", "onRotate"];
var LABEL_TEXT_MAP = ["pan test", "tap test", "swipe test", "press test", "rotate test"];

cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad: function onLoad() {
    this.initPosition = this.node.getPosition();
    this.hammer = new _CocosHammer2.default(this.node);
    this.refreshRecognizer(0);
  },


  /**
   * on button click, convert corresponding recognizer.
   * @param {cc.Event} e
   * @param {customData} data
   */
  convertRecognizer: function convertRecognizer(e, data) {
    this.updateLabel(LABEL_TEXT_MAP[data]);
    this.refreshRecognizer(parseInt(data));
  },


  /**
   * remove prevent event handlers, add required event listener.
   * @param {number} value
   */
  refreshRecognizer: function refreshRecognizer(value) {
    if (this.prevEventSet) {
      this.hammer.off(this.prevEventSet);
    }
    this.prevEventSet = PREVSET_EVENTS[parseInt(value)];
    this.hammer.on(this.prevEventSet, this.eventDelegate, this, value);
  },


  /**
   * delegate different events, invoke corresponding handler.
   * @param {wrapped event target} e
   */
  eventDelegate: function eventDelegate() {
    console.log("listened: ", arguments[1].type);
    this.updateLabel(arguments[1].type + " gesture detected.");
    this[HANDLE_MAP[arguments[0]]](arguments[1]);
  },


  /**
   * update label's text
   * @param {String || undefined} str
   */
  updateLabel: function updateLabel(str) {
    this.node.parent.getChildByName("manager").getChildByName("label").getComponent(cc.Label).string = str || "";
  },
  resetNode: function resetNode() {
    this.node.setPosition(this.initPosition);
    this.node.setScale(1, 1);
  },


  /**
   * handle selfType event.
   * @param {wrapped event target} e
   */
  onPan: function onPan(e) {
    var eventType = e.type;
    // if (eventType === "panstart") {
    //   this.startPoint = this.node.getPosition();
    // }
    // this.node.setPosition(
    //   this.startPoint.x + e.deltaX,
    //   this.startPoint.y + e.deltaY
    // );
    // if (eventType === "panend" || eventType === "pancancel") {
    //   this.resetNode();
    // }
    console.log("rotation", e.rotation);
    this.node.rotation = e.rotation;
  },
  onTap: function onTap() {},
  onSwipe: function onSwipe(e) {
    var eventType = e.type;
    console.log(e);
  },
  onPress: function onPress(e) {
    var eventType = e.type;
    if (eventType === "press") {
      this.node.setScale(0.8, 0.8);
    }
    if (eventType === "pressup") {
      this.node.setScale(1, 1);
    }
  }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Test.js.map
        