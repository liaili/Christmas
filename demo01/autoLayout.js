/**
 * Created by liaili on 16/9/13.
 */
//当设备的方向变化（设备横向持或纵向持）此事件被触发。绑定此事件时，
//注意现在当浏览器不支持orientationChange事件的时候我们绑定了resize 事件。
//总来的来就是监听当然窗口的变化，一旦有变化就需要重新设置根字体的

// var config = {
//     clientHeight: 0,
//     clientWidth: 0
// };

(function (doc, win) {
    var docEl = document.documentElement;
    var snowflake = document.getElementById('snowflake');

    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        //设置根字体大小
        docEl.style.fontSize = 20 * (docEl.clientWidth / 320) + 'px';
        //宽与高度
        document.body.style.height = clientWidth * (900 / 1440) + "px";
        // config.clientWidth = clientWidth;
        // config.clientHeight = clientWidth * (900 / 1440)

        snowflake.width = docEl.clientWidth;
        snowflake.height = docEl.clientWidth * (900 / 1440);
    };


    //绑定浏览器缩放与加载时间
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);