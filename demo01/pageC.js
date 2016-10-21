/**
 * Created by liaili on 16/8/31.
 */
/**
 * 第三个场景页面
 */
function pageC(){
    this.$window = $('.page-c .window');
    this.$leftWin = $('.window-left');
    this.$rightWin = $('.window-right');
    this.$sceneBg = $('.window-scene-bg');
    this.$closeBg = $('.window-close-bg');

    //背景切换
    this.$sceneBg.transition({
        opacity:0
    },3000);
    this.$closeBg.css('transform','translateZ(0)');
    this.$closeBg.transition({
        opacity:1
    },5000);

    /**
     * 关闭窗
     */
    pageC.prototype.closeWindow = function(){
        var count =1;
        var complete = function(){
            ++count;
            if(count === 2){
                alert('窗户关闭')
            }
        };
        var bind = function(element){
            element.addClass('close')
                .one('animationend webkitAnimationEnd',function(e){
                    complete();
                })
        };
        bind(this.$leftWin);
        bind(this.$rightWin);
    };

    //关门动作
    this.closeWindow();
}

