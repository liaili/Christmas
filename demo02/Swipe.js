/**
 * Created by liaili on 16/9/17.
 */

function Swipe($container) {
    // 获取第一个子节点
    const $element = $container.find('.content-wrap');
    // li页面数量
    const $slides = $element.find(">");
    // 获取容器尺寸
    const width = $container.width();
    const height = $container.height();
    // 设置li页面总宽度
    $element.css({
        width: ($slides.length * width) + 'px',
        height: height + 'px'
    });
    // 设置每一个页面li的宽度
    $.each($slides, function (index) {
        let slide = $slides.eq(index); //获取到每一个li元素
        slide.css({
            width: width + 'px',
            height: height + 'px'
        });
    });

    //滑动对象
    var swipe = {};

    swipe.scrollTo = (x, speed)=> {
        element.css({
            'transition-timing-function': 'linear',
            'transition-duration': speed + 'ms',
            'transform': 'translate(-' + x + 'px)'
        });
        return this;
    };
    return swipe;
}


