/**
 * Created by liaili on 16/9/18.
 */

/**
 * 小孩走路
 * @param {[type]} container [description]
 */
function BoyWalk() {

    const $container = $('#content');
    const $boy = $('#boy');
    const boyHeight = $boy.height();
    const boyWidth = $boy.width();
    let instanceX = 0;

    //获取可视区宽高
    let visualWidth = $container.width();
    let visualHeight = $container.height();

    //获取数据
    let getValue = (className)=> {
        let $ele = $(className);
        return {
            height: $ele.height(),
            top: $ele.position().top
        }
    };
    //路的Y轴
    let pathY = ()=> {
        const data = getValue('.a-background-middle');
        return data.top + data.height / 2;
    };

    //修正小男孩的正确位置
    $boy.css({
        top: pathY() - boyHeight + 25
    });

    //暂停走路
    function pauseWalk() {
        $boy.addClass('pauseWalk');
    }

    //恢复走路
    function restoreWalk() {
        $boy.removeClass('pauseWalk')
    }

    //走路动画
    function slowWalk() {
        $boy.addClass('slowWalk');
    }

    //计算移动的距离
    function calculateDist(direction, proportion) {
        return (direction == 'x' ? visualWidth : visualHeight) * proportion;
    }

    //用transition做动画
    function startRun(options, runTime) {
        var dfd = $.Deferred();
        //恢复走路
        restoreWalk();
        $boy.transition(options, runTime, 'linear', function () {
            dfd.resolve(); //动画完成
        });
        return dfd;
    }

    //开始走路
    function walkRun(time, dist, distY) {
        time = time || 3000;
        slowWalk();
        var d1 = startRun({
            'left': dist + 'px',
            'top': distY ? distY : undefined
        });
        return d1;
    }

    //走进商店
    function walkToShop() {
        const defer = $.Deferred();
        const $doorObj = $('.door');
        //门的坐标
        let offsetDoor = $doorObj.offset();
        let doorOffsetLeft = offsetDoor.left;
        let doorOffsetTop = offsetDoor.top;

        //小孩当前的坐标
        let boyOffset = $boy.offset();
        let boyOffsetLeft = boyOffset.left;
        let boyOffsetTop = boyOffset.top;

        //当前需要移动的坐标
        instanceX = (doorOffsetLeft + $doorObj.width() / 2) - (boyOffsetLeft + $boy.width() / 2);
        //开始走路
        let walkPlay = startRun({
            transform: 'translateX(' + instanceX + 'px),scale(0.3,0.3)',
            opacity: 0.1,
        }, 2000);
        //走路完毕
        walkPlay.done(()=> {
            $boy.css('opacity', 0);
            defer.resolve();
        });
        return defer;
    }

    //取花
    function getFlower(){
        //增加延时等待效果
        const defer = $.Deferred();
        setTimeout(()=>{
            $boy.addClass('slowFlowerWalk');
            defer.resolve();
        },1000);
        return defer;
    }

    //走出店
    function walkOutShop() {
        const defer = $.Deferred();
        restoreWalk();
        //开始走路
        let walkPlay = startRun({
            transform: 'translateX(' + instanceX + 'px),scale(1,1)',
            opacity: 1
        }, 2000);
        //走路完毕
        walkPlay.done(()=> {
            defer.resolve();
        });
        return defer;
    }

    return {
        //开始走路
        walkTo: (time, proportionX, proportionY)=> {
            let distX = calculateDist('x', proportionX);
            let distY = calculateDist('y', proportionY);
            return walkRun(time, distX, distY);
        },
        //停止走路
        stopWalk: ()=> {
            pauseWalk();
        },
        setColoer: (value)=> {
            $boy.css('background-color', value)
        },
        //走进商店
        toShop: ()=> {
            return walkToShop.apply(null, arguments);
        },
        //走出商店
        outShop: ()=> {
            return walkOutShop.apply(null, arguments);
        },
        //停止走路
        stopWalk: ()=> {
            pauseWalk();
        },
        //取花
        getFlower:()=>{
            return getFlower();
        }
    }

}



