import Hammer from "./CocosHammer";

const PREVSET_EVENTS = [
  "panstart panmove panend pancancel", //panleft panright panup pandown
  "tap doubletap quadrupletap",
  "swipeleft swiperight swipeup swipedown",
  "press pressup",
  "rotatestart rotatemove rotateend"
];
const HANDLE_MAP = ["onPan", "onTap", "onSwipe", "onPress", "onRotate"];
const LABEL_TEXT_MAP = [
  "pan test",
  "tap test",
  "swipe test",
  "press test",
  "rotate test"
];

cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {
    this.initPosition = this.node.getPosition();
    this.hammer = new Hammer(this.node);
    this.refreshRecognizer(0);
  },

  /**
   * on button click, convert corresponding recognizer.
   * @param {cc.Event} e
   * @param {customData} data
   */
  convertRecognizer(e, data) {
    this.resetNode();
    this.updateLabel(LABEL_TEXT_MAP[data]);
    this.refreshRecognizer(parseInt(data));
  },

  /**
   * remove prevent event handlers, add required event listener.
   * @param {number} value
   */
  refreshRecognizer(value) {
    if (this.prevEventSet) {
      this.hammer.off(this.prevEventSet, this.bindHandler);
    }
    this.prevEventSet = PREVSET_EVENTS[parseInt(value)];
    this.bindHandler = this.hammer.on(
      this.prevEventSet,
      this.eventDelegate,
      this,
      value
    );
  },

  /**
   * delegate different events, invoke corresponding handler.
   * @param {wrapped event target} e
   */
  eventDelegate() {
    console.log("listened: ", arguments[1].type);
    this.updateLabel(arguments[1].type + " gesture detected.");
    this[HANDLE_MAP[arguments[0]]](arguments[1]);
  },

  /**
   * update label's text
   * @param {String || undefined} str
   */
  updateLabel(str) {
    this.node.parent
      .getChildByName("manager")
      .getChildByName("label")
      .getComponent(cc.Label).string = str || "";
  },

  resetNode() {
    this.node.stopAllActions();
    this.node.setPosition(this.initPosition);
    this.node.setScale(1, 1);
    this.node.rotation = 0;
  },

  /**
   * handle selfType event.
   * @param {wrapped event target} e
   */
  onPan(e) {
    let eventType = e.type;
    if (eventType === "panstart") {
      this.startPoint = this.node.getPosition();
    }
    this.node.setPosition(
      this.startPoint.x + e.deltaX,
      this.startPoint.y + e.deltaY
    );
    if (eventType === "panend" || eventType === "pancancel") {
      this.resetNode();
    }
  },

  onTap() {
    let s = 0.9;
    this.node.runAction(
      cc.sequence(
        cc.scaleTo(0.1, s, s),
        cc.callFunc(() => {
          this.node.setScale(1, 1);
        })
      )
    );
  },

  onSwipe(e) {
    this.node.runAction(cc.moveBy(0.2, e.deltaX, e.deltaY));
  },

  onPress(e) {
    let eventType = e.type;
    if (eventType === "press") {
      this.node.setScale(0.8, 0.8);
    }
    if (eventType === "pressup") {
      this.node.setScale(1, 1);
    }
  },

  onRotate(e) {
    let eventType = e.type;
    if (eventType === "rotatestart") {
      this.initRotation = this.node.rotation;
    }
    this.node.rotation = this.initRotation + e.rotation;
  }
});
