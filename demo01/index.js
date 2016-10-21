/**
 * Created by liaili on 16/8/31.
 */


/*
 * 针对content中的html文本框
 * 增加rem的修改
 * @param  {[type]} doc [description]
 * @param  {[type]} win [description]
 * @return {[type]}     [description]
 */
(
    function(){
        const docEl = document.documentElement;
        let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        let recalc = function () {
            //自适应设置容器的宽度
            var container = document.querySelector('.container');
            var proportion = 900 / 1440;
            container.style.height = container.clientHeight * proportion + 'px';
        };

        window.addEventListener(resizeEvt, recalc, false);
        document.addEventListener('DOMContentLoaded', recalc, false);
    }
)();




