/**
 * Created by liaili on 16/8/31.
 */

function pageA(element) {
    //根元素
    this.$root = element;
    //小男孩
    this.$boy = $('.chs-boy');
    //窗户
    this.$window = $('.page-a .window');
    this.$leftWin = $('.page-a .window-left');
    this.$rightWin = $('.page-a .window-right');
    //运行动画
    this.run();
}

/*
 * 开窗
 */
pageA.prototype.openWindow = function (callback) {
    var count = 1;
    var complete = function () {
        ++count;
        if(count ===2 ){
            callback && callback();
        }
    };
    var bind = function(data){
        data.one('transition webkitTransitionEnd',function(){
            data.removeClass('window-transition');
            complete();
        })
    };
    bind(this.$leftWin.addClass('window-transition')
        .addClass('hover'));
    bind(this.$rightWin.addClass('window-transition')
        .addClass('hover'));
};

/*
 * 运行下一个动画
 */
pageA.prototype.next = function (options) {
    var dfd = $.Deferred();
    this.$boy.transition(options.style, options.time, 'linear', function () {
        dfd.resolve();
    });
    return dfd;
};

/*
 * 停止走路
 * @return {[type]} [description]
 */

pageA.prototype.stopWalk = function () {
    this.$boy.removeClass('chs-boy-deer');
};

/*
 * 路径
 * @return {[type]} [description]
 */

pageA.prototype.run = function (callback) {
    var me = this;
    var next = function () {
        return this.next.apply(this, arguments)
    }.bind(this);
    next({
        'time': 10000,
        'style': {
            'top': '8rem',
            'right': '48rem',
            'scale': '4'
        }
    })
        .then(function () {
            return next({
                'time': 500,
                'style': {
                    'rotateY': '-180',
                    'scale': '4'
                }
            })
        })
        .then(function () {
            return next({
                'time': 7000,
                'style': {
                    'top': '26.8rem',
                    'right': '4.2rem'
                }
            })
        })
        .then(function () {
            me.stopWalk();
        })
        .then(function(){
            me.openWindow(function(){
                // alert('窗户打开');
            })
        })
};