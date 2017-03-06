---
layout: post
title: 简单认识 composer 的类加载
description:
date: 2017-03-06 22:07:00 +0800
category:
tags:
---

## 前言

传统的 PHP，拿别人写好的代码来用，一般是要把别人的文件放到某个位置，然后在自己的代码里引入这个文件，再调试，直到成功，花了挺多功夫。有了面向对象后，最好的习惯是一个类一个文件，引入第三方代码越来越繁琐。GitHub 等网站更是加快了代码的更新速度，更新代码的时候你还要手工去替换文件，然后又是各种调试……

自从有了 composer 后，简单的一句命令就能把别人的代码下载到你 `composer.json` 同目录下的 `vendor` 目录里，你不必在意别人代码的加载问题，在自己的代码内直接调用，整个世界都变得美好了。

## 正文

在这之前你可以去了解一下 PHP 的 psr-0 和 psr-4，一般我习惯用 psr-4，听说官方已经废弃了 psr-0。

废话不多说，以 `2amigos/yii2-qrcode-helper` 的 `composer.json` 为例，看看他们的类加载：

```
{
    "autoload": {
        "psr-4": {
            "dosamigos\\qrcode\\": "src"
        }
    }
}
```

你可能会一脸懵逼，那再看一下他们的目录结构吧：

```
2amigos
└ yii2-qrcode-helper
  ├ src
  │ └ QrCode.php
  └ composer.json
```

再看看 `src` 目录里，`QrCode` 类的命名空间为 `dosamigos\qrcode`。

意思就是，这个包注册了 `dosamigos\qrcode` 这个命名空间，对应的路径是它的 `src` 目录，这个路径可以理解成是 `composer.json` 的相对路径，如果是相同目录就留空，当你调用了这个命名空间的类，composer 就会去这个目录找它。

例如 `dosamigos\qrcode\a\b\Test` 类对应的路径就是 `.../vendor/2amigos/yii2-qrcode-helper/src/a/b/Test.php`

如果你想知道 `composer` 具体是怎么把这个相对路径转化成绝对路径的，你去 `vendor/composer/autoload_psr4.php` 文件看一下就知道了。

同理，你也可以在项目里建立一个 `composer.json` 文件，配好 autoload 之后，执行 `composer dump-autoload` 命令，然后把 `vendor/autoload.php` 文件 require 到你的代码里，以后自己的类就不需要一个一个 require 进来了。
