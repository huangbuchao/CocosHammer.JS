"use strict";
cc._RF.push(module, 'd2a8fWNuV5KtKsS42SoChwD', 'Test');
// Script/Test.js

"use strict";

var _cocosHammer = require("./cocosHammer");

var _cocosHammer2 = _interopRequireDefault(_cocosHammer);

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
    console.log(_cocosHammer2.default);
    var mc = new _cocosHammer2.default.Manager(this.node);

    // mc.add(
    //     new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 })
    // );
    // mc.add(new Hammer.Tap({ event: 'singleTap' }));
    // mc.add(new Hammer.Tap({ event: 'doubleTap', taps: 2 }));
    // mc.add(new Hammer.Tap({ event: 'quadrupletap', taps: 4 }));
    mc.add(new _cocosHammer2.default.Swipe({ direction: _cocosHammer2.default.DIRECTION_ALL }));
    //mc.add(new Hammer.Press());

    //mc.get('pan').recognizeWith('swipe');
    // mc.get('doubleTap').recognizeWith('singleTap');
    // mc.get('quadrupletap').recognizeWith('singleTap');
    //mc.get('singleTap').requireFailure('doubleTap');

    mc.on("panleft panright panup pandown singleTap doubleTap quadrupletap swipeleft swiperight swipeup swipedown press", this.updateLabelText.bind(this));
  },
  updateLabelText: function updateLabelText(e) {
    var text = e.type + " gesture detected.";
    this.labelComp.string = text;
  }
});

cc._RF.pop();