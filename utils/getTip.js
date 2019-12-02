export default (tipMsg, tipType, showTipTime) => {
    return {
        tipMsg: tipMsg,
        tipType: tipType,
        showTipTime: Math.random() * (3 - 1) + 1,
        tipKey: true
    }
};