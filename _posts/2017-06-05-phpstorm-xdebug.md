---
layout: post
title: 在 PHPStorm 使用 xdebug
description: 告别频繁的 var_dump + die
date: 2017-06-05 12:00:00 +0800
category:
tags:
---

## 前言

由于作者太菜，只会 windows，所以本文针对的是 windows 环境。

由于作者语文水平不好，文字表达的不一定清楚，所以你可以去看看[这个视频](https://laracasts.com/series/how-to-be-awesome-in-phpstorm/episodes/19)，就算你听不懂应该也能看得懂。

## php.ini 设置

```
zend_extension = "path/to/php_xdebug.dll"
xdebug.remote_autostart = on
xdebug.remote_enable = on
xdebug.remote_host = 127.0.0.1
xdebug.remote_port = 9000
```

## PHPStorm 设置

来到 `File -> Settings -> Languages & Frameworks -> PHP`，在右边 `PHP language level` 处指定你的 php 版本，然后去 `CLI Interpreter` 右边的"..."按钮里新建一个，指向你的 php.exe ，再返回来选中它。

来到 `File -> Settings -> Languages & Frameworks -> PHP -> Debug`，在右边 `Xdebug` 这一栏检查端口号是否是9000，是的话设置已经完毕。

> 一般 php-fpm 的端口是9000，所以用 nginx 的可能需要改成别的端口例如9001。

## 开始使用

在菜单的  `Run` 里找到 `Start Listening for PHP Debug Connections`，点击后发现图标变绿了说明开始监听了，在你方便执行的代码**行号右边**点击一下，发现多了一个红点。然后你可以去浏览器正常操作让程序执行到这一行代码，看看有没有被抓到，如果抓到就成功了。

抓到断点后，代码会变成蓝色背景，但是不代表这行代码已经执行。

如果当前代码里有 function，F7可以进入这个 function 的代码里继续调试，F8则是往下执行一行，F9是直接执行到下一个断点或者结束。

如果你的机子上挂着几个站点，建议在访问别的站点之前先把监听关掉再访问。

如果你发现 PHPStorm 弹出一个警告，带有 `Break at first line in PHP script` 的选项，你可以选择不再提示。

## 性能问题

你会发现，在没开监听的时候，网站运行会变慢，这应该是 php.ini 里的 `xdebug.remote_autostart = on` 导致的，如果设置为 off，你会发现网站的速度又正常了，但是 PHPStorm 没法用 Xdebug 调试了。

解决方法很简单，把 `xdebug.remote_autostart` 设置为 off 或者干脆不要配置它，在 Chrome 商店下载一个叫做 Xdebug helper 的插件，然后在 Chrome 右上角会发现多了一个虫子的图标，默认是 Disable 状态，改成 Debug，你发现 PHPStorm 又可以抓到断点了，速度不仅快了而且几个站点同时一起打断点也不冲突了。
