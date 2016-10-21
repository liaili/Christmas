/**
 * Created by liaili on 16/8/31.
 */
/**
 * 第二副场景页面
 *
 */
function pageB(element, pageComplete) {
    var animationEnd = "animationend webkitAnimationEnd";

    var $girl = $('.girl');
    var $boy = element.find(".christmas-boy");
    var $carousel = $('#carousel');

    /**
     * 旋转木马
     */
    var carousel = new Carousel($carousel, {
        imgUrls: [
            "http://img.mukewang.com/5662e29a0001905a14410901.png",
            "http://img.mukewang.com/5662e2960001f16314410901.png",
            "http://img.mukewang.com/5662e26f00010dea14410901.png"
        ],
        videoUrls: [
            "http://www.imooc.com/upload/media/qx-one.mp4",
            "http://www.imooc.com/upload/media/qx-two.mp4",
            "http://www.imooc.com/upload/media/qx-three.mp4"
        ]
    });
    var i = 0;
    $('.carousel-run').click(function(){
        carousel.run(i++);
    });

    $('.carousel-3d').click(function(){
        carousel.run(i++,function(){
            //播放视频
            carousel.playVideo();
        });
    });

    /**
     * 女孩动作
     * @return {[type]} [description]
     */
    var girlAction = {
        //女孩起立
        standUp: function () {
            var dfd = $.Deferred();
            //起立
            setTimeout(function () {
                $girl.addClass('girl-standUp');
            }, 200);
            //抛书
            setTimeout(function () {
                $girl.addClass('girl-throwBook');
                dfd.resolve();
            }, 500);
            return dfd;
        },
        //走路
        walk: function () {
            var dfd = $.Deferred();
            $girl.addClass('girl-walk')
                .transition({
                    'left': '13rem'
                }, 8000, 'linear', function () {
                    dfd.resolve();
                });
            return dfd;
        },
        //停止走路
        stopWalk: function () {
            $girl.addClass('walk-stop')
                .addClass('girl-stand')
                .removeClass('girl-walk')
                .removeClass('girl-throwBook')
                .removeClass('girl-standUp');

        },
        //旋转3d
        choose: function (callback) {
            $girl.addClass('girl-choose')
                .removeClass('walk-stop')
                .one(animationEnd, function () {
                    callback();
                })
        },
        //泪奔
        weepWalk: function (callback) {
            $girl.addClass('girl-weep')
                .transition({
                    'left': '24rem'
                }, 1000, 'linear', function () {
                    $girl.addClass('walk-stop').removeClass('girl-weep');
                    callback();
                })
        },
        //拥抱
        hug: function () {
            $girl.addClass('girl-hug').addClass('walk-run')
        }
    };

    girlAction
        .standUp()
        .then(function () {
            //女孩停止走路
            return girlAction.stopWalk();
        })
        .then(function () {
            //女孩走路
            return girlAction.walk();
        })
        .then(function () {
            //选择
            girlAction.choose(function () {
                //泪奔
                girlAction.weepWalk(function () {
                    //拥抱
                    girlAction.hug();
                });
            })
        });


    /**
     * 小男孩动作
     * @return {[type]} [description]
     */
    var boyAction = {
        //走路
        walk: function () {
            var dfd = $.Deferred();
            $boy.transition({
                "right": "16rem"
            }, 4000, "linear", function () {
                dfd.resolve()
            });
            return dfd;
        },
        //停止走路
        stopWalk: function () {
            $boy.removeClass("boy-walk");
            $boy.addClass("boy-stand");
        },
        //继续走路
        runWalk: function () {
            $boy.addClass("walk-run");
        },
        //解开包裹
        unwrapp: function () {
            var dfd = $.Deferred();
            $boy.addClass("boy-unwrapp")
                .removeClass("boy-stand")
                .one(animationEnd, function () {
                    dfd.resolve();
                })
            return dfd;
        },
        //脱衣动作
        //1-3
        strip: function (count) {
            $boy.addClass("boy-strip-" + count).removeClass("boy-unwrapp");
        },
        //人物用拥抱
        //重叠问题处理
        hug: function () {
            $boy.addClass("boy-hug").one(animationEnd, function () {
                $(".christmas-boy-head").show()
            })
        }
    }

    //开始走路
    boyAction.walk()
        .then(function () {
            //停止走路
            boyAction.stopWalk();
        })
        .then(function () {
            //解开包裹
            return boyAction.unwrapp();
        })
        .then(function () {
            //脱衣动作
            setTimeout(function () {
                boyAction.strip(1)
            }, 1000)
            setTimeout(function () {
                boyAction.strip(2)
            }, 2000)
            setTimeout(function () {
                boyAction.strip(3)
            }, 3000)
            //任务重叠问题
            setTimeout(function () {
                boyAction.hug();
            }, 4000)
        })


}