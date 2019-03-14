(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Test.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd2a8fWNuV5KtKsS42SoChwD', 'Test', __filename);
// Script/Test.js

"use strict";

var _CocosHammer = require("./CocosHammer");

var _CocosHammer2 = _interopRequireDefault(_CocosHammer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad: function onLoad() {
    this.updateLabelTextBind = this.updateLabelText.bind(this);
    this.initHammer();
    this.labelComp = this.node.children[0].getComponent(cc.Label);
  },
  initHammer: function initHammer() {
    console.log(_CocosHammer2.default);
    var mc = new _CocosHammer2.default.Manager(this.node);

    mc.add(new _CocosHammer2.default.Pan({ direction: _CocosHammer2.default.DIRECTION_ALL, threshold: 0 }));
    mc.add(new _CocosHammer2.default.Tap({ event: "singleTap" }));
    mc.add(new _CocosHammer2.default.Tap({ event: "doubleTap", taps: 2 }));
    mc.add(new _CocosHammer2.default.Tap({ event: "quadrupletap", taps: 4 }));
    mc.add(new _CocosHammer2.default.Swipe({ direction: _CocosHammer2.default.DIRECTION_ALL }));
    //mc.add(new Hammer.Press());

    mc.get("pan").recognizeWith("swipe");
    mc.get("doubleTap").recognizeWith("singleTap");
    mc.get("quadrupletap").recognizeWith("singleTap");
    //mc.get('singleTap').requireFailure('doubleTap');

    mc.on("panleft panright panup pandown singleTap doubleTap quadrupletap swipeleft swiperight swipeup swipedown press", this.updateLabelText.bind(this));
  },
  updateLabelText: function updateLabelText(e) {
    var text = e.type + " gesture detected.";
    this.labelComp.string = text;
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
        