# 纯css实现轮播图

> 查看最终效果点击这里[演示demo]( http://linzowo.ml/demo/css-slider.html )
>
> 查看源码点击这里[GitHub仓库链接]( [https://github.com/linzowo/JavaScript_practive/blob/master/32%20%E7%BA%AFcss%E8%BD%AE%E6%92%AD%E5%9B%BE/32%20%E7%BA%AFcss%E8%BD%AE%E6%92%AD%E5%9B%BE.html](https://github.com/linzowo/JavaScript_practive/blob/master/32 纯css轮播图/32 纯css轮播图.html) )

## 项目背景

传说使用纯css实现轮播图在面试中会有所加分，所以今天我们就来实现一下。

## 核心科技
css3中的`animation`方法,可以帮助我们快速实现动画效果.具体使用方法如下.

### CSS3 动画属性

下面的表格列出了 @keyframes 规则和所有动画属性：

| 属性                                                         | 描述                                                     | CSS  |
| :----------------------------------------------------------- | :------------------------------------------------------- | :--- |
| [@keyframes](https://www.w3school.com.cn/cssref/pr_keyframes.asp) | 规定动画。                                               | 3    |
| [animation](https://www.w3school.com.cn/cssref/pr_animation.asp) | 所有动画属性的简写属性，除了 animation-play-state 属性。 | 3    |
| [animation-name](https://www.w3school.com.cn/cssref/pr_animation-name.asp) | 规定 @keyframes 动画的名称。                             | 3    |
| [animation-duration](https://www.w3school.com.cn/cssref/pr_animation-duration.asp) | 规定动画完成一个周期所花费的秒或毫秒。默认是 0。         | 3    |
| [animation-timing-function](https://www.w3school.com.cn/cssref/pr_animation-timing-function.asp) | 规定动画的速度曲线。默认是 "ease"。                      | 3    |
| [animation-delay](https://www.w3school.com.cn/cssref/pr_animation-delay.asp) | 规定动画何时开始。默认是 0。                             | 3    |
| [animation-iteration-count](https://www.w3school.com.cn/cssref/pr_animation-iteration-count.asp) | 规定动画被播放的次数。默认是 1。                         | 3    |
| [animation-direction](https://www.w3school.com.cn/cssref/pr_animation-direction.asp) | 规定动画是否在下一周期逆向地播放。默认是 "normal"。      | 3    |
| [animation-play-state](https://www.w3school.com.cn/cssref/pr_animation-play-state.asp) | 规定动画是否正在运行或暂停。默认是 "running"。           | 3    |
| [animation-fill-mode](https://www.w3school.com.cn/cssref/pr_animation-fill-mode.asp) | 规定对象动画时间之外的状态。                             | 3    |

### 语法

```
animation: name duration timing-function delay iteration-count direction;
```

> 具体详情请见w3c网站[css3动画属性]( https://www.w3school.com.cn/css3/css3_animation.asp )



## 实现思路

常见的两种轮播图分别是`左右滑动式`和`渐变式`,下面就简单的说明一下两种实现的思路.

另外还有一种改变背景的操作,这种实现出来的效果与`渐变式`类似,因为它只是改变背景所以只需要一个元素就可以了,但是轮播图除了展示内容之外还肩负着导航的作用,所以只有一个标签的话且没有js配合的情况下无法插入导航链接,所以这种我觉得不能算一个合格的轮播图.

### 总体结构

两种方式实现对轮播图的框架结构并不会产生影响,所以两个都采用轮播图的标准结构.

```html

<div class="container">
    <!-- 轮播图结构 -->
    <ul>
        <li><img src="images/1.webp" alt="" /></li>
        <li><img src="./images/2.webp" alt="" /></li>
        <li><img src="./images/3.webp" alt="" /></li>
        <li><img src="./images/4.webp" alt="" /></li>
        <li><img src="images/1.webp" alt="" /></li> <!-- 左右滑动为了实现一种无缝衔接需要在末尾复制一份第一张图片,渐变式不需要这张图可以去掉 -->
    </ul>
    <!-- 轮播焦点结构 -->
    <ol>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ol>
</div>
```



基本的css样式也是一样的

```css

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      /* 图片基础样式 */
      li {
        list-style: none;
        float: left;
      }
      ul img {
        width: 1226px; /* 保证图片尺寸统一 */
        height: auto;
      }

      /* 容器基础样式 */
      .container {
        width: 1226px;
        height: 460px;
        margin: 50px auto 0;
        overflow: hidden;
        position: relative;
      }

      /* 轮播焦点基础样式 */
      ol {
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -60px; /* 保证焦点框居中 */
        padding: 10px;
        z-index: 999;
      }
      ol li {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #ccc;
        margin: 0 5px;
        background-color: #fff;
      }
```



### 左右滑动式

**需要解决的问题:**

1. 如何实现左移效果动画

   因为我是采用的为`ul`添加动画的方式,所以这里我采用`transform: translateX();`来实现,如下

   ```css
   
         .container1 ul {
           /* animation: imgMove 40s cubic-bezier(0,1.04,0,.99) 10s infinite; */
           animation-name: imgMove;
           animation-duration: 20s;
           animation-timing-function: cubic-bezier(0, 1.04, 0, 0.99);
           animation-delay: 5s;
           animation-iteration-count: infinite;
         }
   
         @keyframes imgMove {
           0% {
             transform: translateX(0px);
           }
           25% {
             transform: translateX(-1226px);
           }
           50% {
             transform: translateX(-2452px);
           }
           75% {
             transform: translateX(-3678px);
           }
           100% {
             transform: translateX(-4904px);
           }
         }
   ```

   这样动画的每个阶段就会过度一张图片.

> 每次动画执行20s,
>
> 每次动画分为4个阶段(因为我的是4张图片,所以是4个阶段)
>
> 每个阶段过渡一张图片
>
> 每次过渡5s 通过@keyframes控制百分比达到控制时间的效果

这样就实现了轮播图的基本功能,但是还有一个小问题



2. 过渡完成后新的图片停留并展示一段时间

   这个问题有两种解决思路

   第一种就是通过`animation-timing-function`控制动画执行曲线,(我现在采用的方式),通过这种方式,就是上面代码中的这个

   ```
   animation-timing-function: cubic-bezier(0, 1.04, 0, 0.99);
   ```

   每个阶段的前面快速过渡大面积的动画,然后后面较长的时间内过渡小部分的剩余画面,从而实现一种假的静止状态.

   第二种方案在渐变式中会用到就不在这里赘述了.



### 渐变式

**需要解决的问题:**

1. 如何实现渐变效果动画: 主要就是改变图片的透明度来实现.代码如下

   ```css
   
         .container ul li {
           position: absolute;
           opacity: 0; /* 如果不改变默认透明度,那么后续的执行动画需要从最后一张开始,采用倒序 */
   
           /* 动画设置 */
           animation-name: fade;
           animation-duration: 20s;
           animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
           animation-iteration-count: infinite;
         }
         
         @keyframes fade {
           0% {
             opacity: 0;
             z-index: 0;
           }
           25% {
             opacity: 1;
             z-index: 1;
           }
           50% {
             opacity: 0;
             z-index: 0;
           }
         }
   
   	.container ul li:nth-child(1) {
           animation-delay: 0s;
         }
         .container ul li:nth-child(2) {
           animation-delay: 5s;
         }
         .container ul li:nth-child(3) {
           animation-delay: 10s;
         }
         .container ul li:nth-child(4) {
           animation-delay: 15s;
         }
   ```

   

2. 因为是每张图片渐变所以无法为包裹图片的父盒子添加动画,这里需要为每个`li`添加动画

3. 如何保证每张图片按次序显示呢

   这里就用到了上面提到的第二种方案: 通过设置`animation-delay`也就是开始前停顿时间,通过对每个`li`添加不同的停顿时间,然后合理安排图片在动画的哪个阶段实现就能达到渐变的效果了,我在这里是采用动画开始时将图片隐藏然后在0-25%这个阶段使图片显示,然后再使他在后面的执行中消失,实现的,具体可以详细研究一下上面的代码.



## 轮播图焦点的实现

轮播图中的标配`展示图片`/`轮播焦点`/`左右按钮`全部齐活才能算一个完整的轮播图,但是左右按钮牵涉的功能我暂时还没想到css怎么实现,如果你有方法可以告诉我.

这里我实现轮播图焦点的策略是再建立一个与图片同步的切换动画效果从而达到,代码如下

```css
/* 轮播焦点动画效果 */
      ol li {
        animation-name: focus;
        animation-duration: 20s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      ol li:nth-child(1) {
        animation-delay: 0s;
      }
      ol li:nth-child(2) {
        animation-delay: 5s;
      }
      ol li:nth-child(3) {
        animation-delay: 10s;
      }
      ol li:nth-child(4) {
        animation-delay: 15s;
      }
      @keyframes focus {
        5% { /* 为了使过渡效果更加快速 */
          background-color: #000;
        }
        15% { /* 为了让这种状态多保持一段时间 */
          background-color: #000;
        }
        50% {
          background-color: #fff;
        }
      }
```

我采用的是改变背景色的策略,同样的为每个焦点添加动画,但是错开他们的执行时间,并且将他们的时间控制到与轮播图频率一致.



## 改变背景式

### 页面结构

```html

    <div class="container">
      <h2>背景改变式</h2>
      <!-- 轮播图结构 -->
      <div class="img-box"></div>
      <!-- 轮播焦点结构 -->
      <ol>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ol>
    </div>
```



### css样式

```css

      /* 背景改变轮播图 */
      .container {
        width: 1226px;
        height: 460px;
        margin: 50px auto 0;
        overflow: hidden;
        position: relative;
      }
      .container .img-box {
        width: 100%;
        height: 100%;
        background-size: 100%;
        background-image: url("https://m.qpic.cn/psb?/V11CA95048EY0H/.ubxWcpYNfZ8bxP.aX9Ft0Xw27Wt0TSqHy1nGwH8Sy4!/b/dMMAAAAAAAAA&bo=ygTMAQAAAAARBzM!&rf=viewer_4");
      }

      /* 动画设置 */
      .container .img-box {
        animation-name: changeBG;
        animation-duration: 20s;
        animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
        animation-iteration-count: infinite;
        animation-delay: 5s;
      }

      @keyframes changeBG {
        0% {
          background-image: url("https://m.qpic.cn/psb?/V11CA95048EY0H/.ubxWcpYNfZ8bxP.aX9Ft0Xw27Wt0TSqHy1nGwH8Sy4!/b/dMMAAAAAAAAA&bo=ygTMAQAAAAARBzM!&rf=viewer_4");
        }
        25% {
          background-image: url("http://m.qpic.cn/psb?/V11CA95048EY0H/A9GmTVHrY.6XNIzYWf2W3PlDayCm06kmNFpQ8uAZtgo!/b/dDYBAAAAAAAA&bo=ygTMAQAAAAARFyM!&rf=viewer_4");
        }
        50% {
          background-image: url("http://m.qpic.cn/psb?/V11CA95048EY0H/qYq0ZCGjDUuwqpIKTuo57hr5wZ6kLls8NKgM*EX8nvw!/b/dFMBAAAAAAAA&bo=ygTMAQAAAAARFyM!&rf=viewer_4");
        }
        75% {
          background-image: url("http://m.qpic.cn/psb?/V11CA95048EY0H/NsSF8XIJnFPPqWkqAQRjLQgtgTAlFvSkU7VulnfePkA!/b/dL8AAAAAAAAA&bo=ygTMAQAAAAARFyM!&rf=viewer_4");
        }
        100% {
          background-image: url("https://m.qpic.cn/psb?/V11CA95048EY0H/.ubxWcpYNfZ8bxP.aX9Ft0Xw27Wt0TSqHy1nGwH8Sy4!/b/dMMAAAAAAAAA&bo=ygTMAQAAAAARBzM!&rf=viewer_4");
        }
      }
```



可以看到这种方式的页面结构和动画设置都很简单,但是就是因为太简单了,所以一些特殊的内容无法实现,比如为每张图片插入跳转链接.但是这种方式用来做博客或者网站的背景应该不错,会给人眼前一亮的感觉.



> 以上就是全部内容,如果你有什么想法想告诉我,欢迎提出issue