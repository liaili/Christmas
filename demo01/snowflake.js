/**
 * Created by liaili on 16/9/13.
 */

/**
 * 雪花
 * canvas版
 */
(function () {
    /**
     * 雪球
     * @param {[type]} element [description]
     */
    function Snowflake(element) {
        var docEl = document.documentElement;
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        var width = clientWidth;
        var height = clientWidth * (900 / 1400);

        var snowElement = document.getElementById(element);
        var canvasContext = snowflake.getContext('2d');
        snowElement.width = width;
        snowElement.height = height;

        //构建雪球的数量
        var snowNumber = 50;

        //构建雪球对象
        var snowArrObjs = initSnow(snowNumber, width, height);
        var snowArrNum = snowArrObjs.length;

        /**
         * 绘制页面
         * @return {[type]} [description]
         */
        var render = function () {
            canvasContext.clearRect(0, 0, width, height);
            for (var i = 0; i < snowArrNum; ++i) {
                snowArrObjs[i].render(canvasContext);
            }
        };

        /**
         * 更新雪花
         * @return {[type]} [description]
         */
        var update = function () {
            for (var i = 0; i < snowArrNum; ++i) {
                snowArrObjs[i].update();
            }
        };

        /**
         * 绘制与更新
         * @return {[type]} [description]
         */
        var renderAndUpdate = function () {
            render();
            update();
            requestAnimationFrame(renderAndUpdate);
        };
        renderAndUpdate();
    }

    function initSnow(snowNumber, width, height) {
        //雪球参数
        var options = {
            //雪球半径
            minRadius: 3,
            maxRadius: 10,
            //运动的范围区域
            maxY: height,
            maxX: width,
            //速率
            minSpeedY: 0.05,
            maxSpeedY: 2,
            speedX: 0.05,
            //滤镜
            minAlpha: 0.5,
            maxAlpha: 1.0,
            minMoveX: 4,
            maxMoveX: 18
        };
        var snowArr = [];
        for (var i = 0; i < snowNumber; ++i) {
            snowArr[i] = new Snow(options);
        }
        return snowArr;
    }

    /**
     * 雪球类
     */
    function Snow(options) {
        this.options = options;
        this.radius = randomInRange(options.minRadius,options.maxRadius);
        //初始X位置
        this.initailX = Math.random() * options.maxX;
        this.y = -(Math.random() * 500);
        //运行的速率
        this.speedY = randomInRange(options.minSpeedY,options.maxSpeedY);
        this.speedX = options.speedX;
        //滤镜
        this.alpha = randomInRange(options.minAlpha,options.maxAlpha);
        //角度,默认360
        this.angle = Math.random(Math.PI * 2);
        //运行的距离
        this.x = this.initailX + Math.sin(this.angle);
        //x移动距离
        this.moveX = randomInRange(options.minMoveX,options.maxMoveX);

        /**
         * 绘制雪球
         * @param {[type]} canvasContext [description]
         * @return {[type]}              [description]
         */
        Snow.prototype.render = function(canvasContext){
            canvasContext.beginPath();
            //用来填充路径的当前颜色,白色雪球
            canvasContext.fillStyle = 'rgba(255,255,255,'+ this.alpha +')';
            canvasContext.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
            canvasContext.closePath();
            canvasContext.fill();
        };
        Snow.prototype.update = function(){
            this.y += this.speedY;
            if(this.y > this.options.maxY){
                this.y -= this.options.maxY;
            }
            this.angle +=this.speedX;
            if(this.angle>Math.PI*2){
                this.angle -= Math.PI*2;
            }
            this.x = this.initailX + Math.sin(this.angle);
        }
    }

    /**
     * 随机处理
     * @param {[type]} min [description]
     * @param {[type]} max [description]
     * @param {[type]}     [description]
     */
    function randomInRange(min, max) {
        var random = Math.random() * (max - min) + min;
        return random;
    }
    Snowflake('snowflake');

})();
