var content = document.getElementById("content")

//获取开始游戏页面元素
var start = document.getElementById("start")
// var start = document.querySelector("#start")

//获取游戏页面元素
var game = document.getElementById("game")

//获取暂停页面元素
var stop = document.getElementById("stop")

//获取结束页面元素
var end = document.getElementById("end")

//获取[开始游戏]按钮元素
var startGame = document.getElementById("startGame")

//获取[开始游戏]按钮元素
var continueGame = document.getElementById("continueGame")

//获取分数元素
var mark = document.getElementById("mark")

//获取结束分数元素
var endMark = document.getElementById("endMark")

// 在控制台中打印
// console.log(mark,endMark)

// 定义背景在y轴上的位置
var bgY = 0
// 定义定时器
var timer
//定义分数变量
var score = 0
//获取最外层盒子的宽度
var boxWidth = content.offsetWidth
//获取最外层盒子的高度
var boxHeight = content.offsetHeight
//获取最外层盒子距离左边的位移
var boxLeft = content.offsetLeft
// console.log(boxHeight, boxWidth, boxLeft)

//数据
var propareOurPlane = {
    //键值对
    w: 66,
    h: 80,
    src: "./images/our-plane.gif",
    boom: "./images/our-plane-boom.gif",
}
var propareOurBullet = {
    //键值对
    w: 6,
    h: 14,
    src: "./images/our-bullet.png",
    num:-4,
}
var propareEnemyPlaneS = {
    //键值对
    w: 34,
    h: 24,
    src: "./images/enemy-plane-s.png",
    boom: "./images/enemy-plane-s-boom.gif",
    num:4,
    blood:1,
}
var propareEnemyPlaneM = {
    //键值对
    w: 46,
    h: 60,
    //图片路径
    src: "./images/enemy-plane-m.png",
    //爆炸图片路径
    boom: "./images/enemy-plane-m-boom.gif",
    //零件掉落图片路径
    hit:"./images/enemy-plane-m-hit.png",
    //移动速度，数值越大，速度越大
    num:3,
    //血量，控制几颗子弹进行爆炸
    blood:2,
}
var propareEnemyPlaneL = {
    //键值对
    w: 110,
    h: 164,
    src: "./images/enemy-plane-l.png",
    boom: "./images/enemy-plane-l-boom.gif",
    hit:"./images/enemy-plane-l-hit.png",
    num:2,
    blood:3,
}

//背景图片移动函数
// function bgMove(){}      第一种写法
// var bgMove = function(){}   第二种写法
function bgMove() {
    bgY++
    if (bgY % boxHeight == 0) {
        bgY = 0
    }
    game.style.backgroundPositionY = bgY + "px"
}

// [开始游戏]点击事件
startGame.onclick = function () {
    // 清除定时器
    clearInterval(timer)
    // console.log(123)
    //开始游戏页面隐藏
    start.style.display = "none"
    //游戏页面显示
    game.style.display = "block"
    //调用定时器函数
    isInterval()
}

//点击游戏页面暂停游戏
game.onclick = function () {
    // 清除定时器
    clearInterval(timer)
    // 显示暂停页面
    stop.style.display = "block"
    game.onmousemove =function(){} 
}

//[继续游戏]按钮点击事件
continueGame.onclick = function (e) {
    //清除定时器
    clearInterval(timer)
    //阻止事件冒泡
    e.stopPropagation()
    //暂停页面隐藏
    stop.style.display = "none"
    //调用定时器函数
    ourPlaneMove()
    isInterval()
}

//[重新开始]按钮封装函数
function restart() {
    //对页面进行刷新
    window.location.reload()
}

//创建构造函数
function Plane(element, x, y) {
    // console.log(element)
    this.w = element.w
    this.h = element.h
    this.src = element.src
    this.boom = element.boom
    this.x = x
    this.y = y
    this.num = element.num
    this.hit = element.hit
    this.blood = element.blood
}
//创建图片元素
Plane.prototype.create = function () {
    this.node = document.createElement("img")
    this.node.src = this.src
    this.node.style.left = this.x - this.w / 2 + "px"
    this.node.style.top = this.y - this.h / 2 + "px"
    game.appendChild(this.node)
    return this.node
}
// 创建移动方法
Plane.prototype.move = function(){
    this.y = this.y + this.num
    this.node.style.top = this.y +"px"
}

//调用构造函数
var ourPlane = new Plane(propareOurPlane, boxWidth / 2, boxHeight)
//调用创建飞机方法
ourPlane.create()
// console.log(ourPlane)

// //创建我方飞机
// function createOurplane(){
//     //创建图片标签
//     var node = document.createElement("img")
//     //引入图片路径
//     node.src = "./images/our-plane.gif"
//     // console.log(node)
//     //将图片标签添加到游戏页面上
//     game.appendChild(node)
//     return node
// }

// //调用我方飞机
// var ourPlane =  createOurplane()
// console.log(createOurplan())
function ourPlaneMove() {
    //我方飞机移动事件
    game.onmousemove = function (e) {
        // 获取鼠标在游戏页面的坐标
        var x = e.pageX - boxLeft
        var y = e.pageY
        // console.log(x,y)
        //飞机移动的限定范围
        //上
        if (y < 0) {
            y = 0
        }
        //下
        if (y > boxHeight) {
            y = boxHeight
        }
        //左
        if (x < 0) {
            x = 0
        }
        //右
        if (x > boxWidth) {
            x = boxWidth
        }
        //将飞机移动的坐标点赋值给飞机移动的坐标点
        ourPlane.x = x
        ourPlane.y = y
        // 将鼠标的坐标赋值给我方飞机
        ourPlane.node.style.left = x - 33 + "px"
        ourPlane.node.style.top = y - 40 + "px"
    }
}
ourPlaneMove()

//子弹创建的中间变量
var frame = 0
// 定义子弹数组
var bulletArray = []
//定义地方飞机数组
var enemyPlaneArray = []

//随机数
function randomNum(){
    // Math.random() 取值范围0—1
    return Math.random() * boxWidth
}

//检测碰撞的区域
function touch(a,b){
    //检测x轴上是否碰撞
    var touchX = Math.abs(a.x - b.x) < (a.w/2 + b.w/2)
    //检测y轴上是否碰撞
    var touchY = Math.abs(a.y - b.y) < (a.h/2 + b.h/2)
    //两个条件同时满足
    return touchX & touchY
}

// 循环定时器函数
function isInterval() {
    timer = setInterval(function () {
        //调用背景图片移动函数

        bgMove()
        // 自加
        frame++
        if (frame % 10 == 0) { 
            //创建子弹
            var ourBullet = new Plane(propareOurBullet, ourPlane.x, ourPlane.y)
            ourBullet.create()
            // 将创建的子弹压入数组中
            bulletArray.push(ourBullet)
        }
        // console.log(bulletArray)
        //遍历所有的子弹
        bulletArray.forEach(function(bullet,index){
            // console.log(bullet)
            // console.log(index)
            //子弹移动
            bullet.move()
            //判断子弹是否超出屏幕
            if(bullet.y < 0){
                //在游戏页面中删除子弹 
                game.removeChild(bullet.node)
                //子弹数组删除
                bulletArray.splice(index,1)
            }
        })
        // console.log(bulletArray)

        // 创建敌方飞机
        if(frame % 100 == 0){
            //调用构造函数
            var enemyPlaneS = new Plane(propareEnemyPlaneS,randomNum(),-12)
            enemyPlaneS.create()
            enemyPlaneArray.push(enemyPlaneS)
        }
        if(frame % 300 == 0){
            //调用构造函数
            var enemyPlaneM = new Plane(propareEnemyPlaneM,randomNum(),-30)
            enemyPlaneM.create()
            enemyPlaneArray.push(enemyPlaneM)
        }
        if(frame % 500 == 0){
            //调用构造函数
            var enemyPlaneL = new Plane(propareEnemyPlaneL,randomNum(),-82)
            enemyPlaneL.create()
            enemyPlaneArray.push(enemyPlaneL)
        }
        // console.log(enemyPlaneArray)

        // 遍历所有的敌方飞机
        enemyPlaneArray.forEach(function(enemy,index){
            enemy.move()
            if(enemy.y >boxHeight){
                game.removeChild(enemy.node)
                enemyPlaneArray.splice(index,1)
            }
        })
        // console.log(enemyPlaneArray)

        // 检测碰撞
        enemyPlaneArray.forEach(function(enemy,enemyIndex){
            //1.和子弹碰撞
            bulletArray.forEach(function(bullet,bulletIndex){
                //检测是否碰撞
                if(touch(enemy,bullet)){
                    //分数自增
                    score++
                    //将分数显示在页面上
                    mark.innerHTML = score

                    //敌方飞机血量自减
                    enemy.blood --
                    //检测是否有零件掉落的图片，如果是则执行里面的代码
                    if(enemy.hit){
                        //将图片路径换成零件掉落的图片路径
                        enemy.node.src = enemy.hit
                    }

                    //检测敌方飞机的血量是否为0
                    if(enemy.blood == 0){
                        //将图片路径换成爆炸图片
                        enemy.node.src = enemy.boom
                        //在数组中删除碰撞的敌机
                        enemyPlaneArray.splice(enemyIndex,1)
                        //在页面中删除敌方飞机的图片
                        // game.removeChild(enemy.node)
                        //延迟删除爆炸图片
                        setTimeout(function(){
                            if(enemy){
                            game.removeChild(enemy.node)
                            }
                        },500)
                    }

                    //在数组中删除碰撞的子弹
                    bulletArray.splice(bulletIndex,1)
                    //在页面中删除子弹的图片
                    game.removeChild(bullet.node)
                }
            })
            //2.和我方飞机相撞
            if(touch(enemy,ourPlane)){
                //显示敌方飞机爆炸图片
                enemy.node.src = enemy.boom
                //显示我方飞机爆炸图片
                ourPlane.node.src = ourPlane.boom
                //清除定时器
                clearInterval(timer)
                //显示结束页面
                end.style.display = "block"
                //显示结束分数
                endMark.innerHTML = score
                //点击暂停页面失效
                game.onclick = function(){
                    //暂停页面隐藏
                    stop.style.display = "none"
                }
                //我方飞机暂停移动
                game.onmousemove = function(){}
            }
        })
    }, 10)
}