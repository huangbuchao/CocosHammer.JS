import Hammer from "./cocosHammer";

cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {
    this.updateLabelTextBind = this.updateLabelText.bind(this);
    this.initHammer();
    this.labelComp = this.node.children[0].getComponent(cc.Label);
  },

  initHammer() {
    console.log(Hammer);
    var mc = new Hammer.Manager(this.node);

    // mc.add(
    //     new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 })
    // );
    // mc.add(new Hammer.Tap({ event: 'singleTap' }));
    // mc.add(new Hammer.Tap({ event: 'doubleTap', taps: 2 }));
    // mc.add(new Hammer.Tap({ event: 'quadrupletap', taps: 4 }));
    mc.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_ALL }));
    //mc.add(new Hammer.Press());

    //mc.get('pan').recognizeWith('swipe');
    // mc.get('doubleTap').recognizeWith('singleTap');
    // mc.get('quadrupletap').recognizeWith('singleTap');
    //mc.get('singleTap').requireFailure('doubleTap');

    mc.on(
      "panleft panright panup pandown singleTap doubleTap quadrupletap swipeleft swiperight swipeup swipedown press",
      this.updateLabelText.bind(this)
    );
  },

  updateLabelText(e) {
    let text = e.type + " gesture detected.";
    this.labelComp.string = text;
  }
});
