/**
 * Created by liaili on 16/8/31.
 */


/*
 * 中间调用
 */
(function(){
    var Christmas = function(){
        //页面容器元素
        var $pageA = $('.page-a');
        var $pageB = $('.page-b');
        var $pageC = $('.page-c');
        //构建第一个场景页面对象
        // new pageA($pageA);
        // new pageB($pageB);
        new pageC($pageC);
    };
    $('.chs-start').click(function(){
        //圣诞主题效果,开始
        Christmas();
    });
    $('.christmas-boy-run').click(function(){
        Christmas();
    });
    $('.christmas-girl-run').click(function(){
        Christmas();
    });
    $('.close-window').click(function(){
        Christmas();
    });

    // Christmas();
})();

/*
 *背景音乐
 */

function HTML5Audio(url, loop) {
    var audio = new Audio(url);
    audio.autoplay = true;
    audio.loop = loop || false;
    audio.play();
    return {
        end: function (callback) {
            audio.addEventListener('ended', function () {
                callback();
            });
        }
    }
}
(function(){
    $('.music-start').click(function(){
        HTML5Audio('http://www.imooc.com/upload/media/one.mp3').end     (function(){
            alert('音乐结束')
        })
    });
    $('music-loop').click(function(){
        HTML5Audio('http://www.imooc.com/upload/media/two.mp3')
    });
})();



/*
 * 切换页面
 * 模拟镜头效果
 */
function changePage(element, effect, callback) {
    element.addClass(effect)
        .one('animationend webkitAnimationEnd', function () {
            callback && callback();
        })
}

/*
 * 中间调用
 */
let Christmas = function () {
    let $pageA = $('.page-a');
    let $pageB = $('.page-b');
    let $pageC = $('.page-c');

    //观察者
    const observer = new Observer();

    //A场景页面
    new pageA(function () {
        observer.publish('completeA');
    });
    //进入B场景
    observer.subscribe('pageB', function () {
        new pageB(function () {
            observer.publish('completeB');
        })
    });
    //进入C场景
    observer.subscribe('pageC', function () {
        new pageC()
    });

    //页面A-B场景切换
    observer.subscribe('completeA', function () {
        changePage($pageA, 'effect-out', function () {
            observer.publish('pageB');
        })
    });

    //页面B-C场景切换
    observer.subscribe('completeB', function () {
        changePage($pageB, 'effect-in', function () {
            observer.publish('pageC');
        })
    });

};

(function () {
    Christmas();
})();