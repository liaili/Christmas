/**
 * Created by liaili on 16/9/18.
 */
(()=> {
    const $container = $('#content');
    const swipe = new Swipe($container);

    // 用来临时调整页面
    swipe.scrollTo($container.width()*2, 0);

    const boyWalk = new BoyWalk();


    //页面滚动到指定的位置
    function scrollTo(time, proportionX) {
        let disX = $container.width() * proportionX;
        swipe.scrollTo(disX, time)
    }

    /************ 动画处理 ***************/

    function doorAction(left, right, time) {
        const $door = $('.door');
        const $doorLeft = $('.door-left');
        const $doorRight = $('.door-right');
        const defer = $.Deferred();
        let count = 2;
        //等待开门完成
        let complete = ()=> {
            if (count == 1) {
                defer.resolve();
                return;
            }
            count--;
        };
        $doorLeft.transition({
            'left':left
        },time,complete);
        $doorRight.transition({
            'left':right
        },time,complete);
        return defer;
    }

    /**
     * 灯动画
     * @return {*}
     */
    let lamp = {
        element:$('.b-background'),
        bright:function(){
            this.element.addClass('lamp-bright');
        },
        dark:function(){
            this.element.removeClass('lamp-bright');
        }
    };

    //开门
    function openDoor(){
        return doorAction('-50%','100%',2000)
    }
    //关门
    function closeDoor(){
        return doorAction('0','50%',2000)
    }


    $('.start').click(()=> {
        $('#sun').addClass('rotation');
        $('.cloud1').addClass('cloud1Anim');
        $('.cloud2').addClass('cloud2Anim');
        $('.bird').addClass('birdFly');
        boyWalk.walkTo(2000, 0.2)
            .then(()=> {
                //第一段
                //页面开始滚动
                scrollTo(5000, 1)
            })
            .then(()=> {
                //第二段
                return boyWalk.walkTo(5000, 0.5)
            })
            .then(()=>{
                //开门
                openDoor();
            })
            .then(()=>{
                //开灯
                lamp.bright();
            })
            .then(()=>{
                //进商店
                return boyWalk.toShop(2000);
            })
            .then(()=>{
                //取花
                return boyWalk.getFlower();
            })
            .then(()=>{
                //出商店
                return boyWalk.outShop(2000);
            })
            .then(()=>{
                //关门
                closeDoor();
            })
            .then(()=>{
                //关灯
                lamp.dark();
            })
    })
})();