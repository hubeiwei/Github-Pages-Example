---
layout: post
title: 个人 yii2 最佳实践
description: 分享一些人生的经验，持续更新中
date: 2017-01-01 02:59:00 +0800
category: yii2
tags: yii2
---

## 前言

也不知道是什么时候开始加技术群的，发现不会 yii2 的新手好多，能回答的问题我都抢着回答了，平时有空也自己去摸索和练习，渐渐对 yii2 越来越熟悉，我接触 yii2 框架也有一年了，就打算开这一个大坑，希望能让一些新人少踩坑。

本文内容纯属个人观点，仅供参考。

## yii2 的优点

1. 使用了 composer 管理第三方代码，包括框架本身的代码都是由 composer 管理的，项目的目录可自由设计

2. 源码注释相对其他框架来说较丰富，而且源码里大量的 PHPDoc 提高了 IDE 的编码效率和准确性

3. 纯面向对象，大部分类的内容可配置

4. 组件，提高了类的复用性和灵活性

5. gii 快速生成 model 和 crud 代码，有了自己的习惯后可以做自己的模板

6. 提供了 debug 面板，方便分析性能和错误

7. 前端布局和资源发布：统一了个人与第三方页面的结构和资源加载。widget：无需关注资源加载，简单调用即可获得前端插件

## yii2 的缺点

1. 学习坡度较高，知识点多，需要掌握很多知识点才能发挥框架更大的作用。

2. 和其他的框架截然不同的语法，使用组件时的代码通常会很长，对面向对象不熟而且还不懂用 IDE 的人不友好。

3. 如果你不下功夫，你会觉得有一些东西很难用，比如视图的布局和前端资源注册，或者是数组里的多层配置。

## 文档

官网：[http://www.yiiframework.com/doc-2.0/guide-index.html](http://www.yiiframework.com/doc-2.0/guide-index.html)

GitHub：[https://github.com/yiisoft/yii2/tree/master/docs/guide-zh-CN](https://github.com/yiisoft/yii2/tree/master/docs/guide-zh-CN)

为什么我会强调文档？因为有很多人安装框架的方法是在百度找来的，已经过时了，安装 `fxp/composer-asset-plugin` 的版本还是"1.0.0"，官方在2016年7月3日的时候就已经从"~1.1.1"改成"^1.2.0"了，你可以去 GitHub 文档找到[这个记录](https://github.com/yiisoft/yii2/commit/c66121d2b6322a368b6aff4774dcc3228f51b25c)。

## 框架结构

框架的代码在 vendor 目录内由 [composer](http://docs.phpcomposer.com/) 管理，另外还有 composer.json 和 composer.lock 两个 composer 的文件，别的目录和文件都是由自己设计，自由度很高，你甚至可以几个项目共用一个 composer，例如 yii2 的高级模板。

> 建议简单了解一下 composer 的 `require`、`update`、`install` 三个命令，以及composer.json 和 composer.lock 这两个文件起到什么作用，这是现代 php 程序员都应该要学的一项技能。

### 官方模板的选择

官方提供了基础和高级两个模板：基础模板是单个网站用的；高级模板是多个网站用的，在每个网站**有自己独立内容**的同时，还能共用一些公共的内容。

> 高级模板默认的两个网站 frontend 和 backend，就是前台和后台的意思，但你可以忽略这个命名。

由于一些新人喜欢用百度，挺容易搜到“实现前后台用高级模板”之类的建议，于是有些新人一开始就用了高级模板，可能会造成上手困难之类的问题。其实你只要看上面我说的，认为是高级模板多个网站就行。

所以，实际要做一个要求不高的前后台，我用基础模板结合框架的模块就足矣，比如你可以看一下[我的项目](https://github.com/hubeiwei/hello-yii2)。当然如果你要是想以后方便增加新项目又方便维护自己封装的代码，那么我推荐你使用高级模板来做一个网站（frontend 和 backend 只保留一个，改成其他名字），这些就是我给出的框架模板选择的建议，当然能自己设计那是坠吼的。

### 在官方模板里你应该要学到的东西

即使你不懂 git，也要去了解一下 .gitignore 文件的作用，这样你可以在官方的两个模板里了解哪些文件可以提交到版本控制，哪些文件不可以。

> PHPStorm 可以安装 .ignore 插件，在 .gitignore 里，匹配到的文件都会变成绿色，左侧文件管理匹配到的文件名都会显示成灰色，即使你不用 git 也最好安装一下。

高级模板的根目录有一个叫 init 的 **php** 文件，执行后你会看到它给你生成了一些文件，并给一些文件和目录设置了权限。frontend 和 backend 目录里的 .gitignore 文件已经忽略了 init 生成后的文件，但这些文件和配置都不是定死的，像你这么聪明的，根据 init 运行的结果，一看 environments 目录和该目录下的 index.php 就应该明白怎么用了，你甚至还能把 init 文件拿去别的框架用。

## 网站搭建的正确姿势

很多新人都喜欢在 windows 上用集成环境，把项目直接丢到 www 目录里运行，这种习惯是不对的，你会在各种需要写 url 的地方遇到问题，在开发时应该让环境尽可能的接近生产环境。

正确的姿势应该是搭建 vhost，有些用高级模板的新人用一个域名指向项目根目录也是不对的，应该**以每一个 web 目录为域名的根目录**。

具体配置 vhost 方法你可以 google，或者参考官方的[文档](https://github.com/yiisoft/yii2/blob/master/docs/guide-zh-CN/start-installation.md#配置-web-服务器-)，nginx 也可以看[这篇文章](http://www.getyii.com/topic/31)。

最好是能够开启 url 美化以及隐藏脚本文件名，这样的 url 看起来非常简洁。

另外，url 不应该根据路由配置写死，而是用 `yii\helpers\Url::to()` 来生成。前端资源除了可以用这个方法外，也可以去看一下 `yii\web\View` 和 `yii\helpers\Html` 类注册资源文件的方法，甚至你还可以使用资源包来发布任意非 web 目录下资源。

## PHPStorm

1. [laracasts 的视频](https://laracasts.com/series/how-to-be-awesome-in-phpstorm)

2. [PhpStorm Tips](phpstorm.tips)

3. [让 yii2 自定义组件支持 PHPStorm 代码提示]({% post_url 2016-08-20-yii2-ide-helper %})

> 更多内容正在建设中......

## 框架基本套路

yii2 的基本套路，就是配置，你可以在配置里随意指定你要用的类，具体在[这篇文章]({% post_url 2016-07-05-yii2-configuration %})内。

上面介绍了 PHPStorm 这个 IDE，就是为了能让你认识 yii2 的基本套路后，可以更快速的找代码。

## gii

动手写代码前，应该先参考一下 gii 生成的 model 和 crud 的代码，这样你才会少走弯路，用法挺简单的，我觉得这里就不需要多说明了，如果实在觉得自己看不懂，推荐去慕课网找找gii相关的教学视频。

> 印象最深的：有些新人在做修改时居然把 model 给 new 出来，对主键赋值后又执行 `save()`，甚至有的人还用上了场景，搞了一天都不成功，还有的人最后选择了手动写 sql，告别了框架的各种事件。

## grid

yii2 的 `GridView` 应该算是挺好用的了，传统的表格你经常需要用 php 和 html 大量拼接，甚至要写js，才能实现各种字段的排序、搜索等功能，而这些基本的功能 yii2 给你封装好了，使用 gii 生成 crud 的列表页就有 grid，生成后为了个性化要改的代码说多也不多，总之我觉得习惯之后封装起来是挺方便的，以下给出两篇比较基础的文章，以后还会再加更多的进阶技巧，请多关注。

1. [grid 基础]({% post_url 2016-11-02-yii2-grid %})

2. [grid 导出]({% post_url 2016-11-10-yii2-grid-export %})

> 更多内容正在建设中......

## 打赏

如果觉得我写的内容对你有帮助的话，求打赏一杯 coffee，这样我会有更多动力去分享更多 yii2 的内容。

<div align="center">
    <img src="https://raw.githubusercontent.com/hubeiwei/hubeiwei.github.io/master/images/pay/ali_pay.jpg" width="500px" alt="支付宝">
</div>

<div align="center">
    <img src="https://raw.githubusercontent.com/hubeiwei/hubeiwei.github.io/master/images/pay/wechat_pay.png" width="500px" alt="微信">
</div>
