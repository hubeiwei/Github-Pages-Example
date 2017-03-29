---
layout: post
title: 简单认识 composer 的类加载
description: 告别繁琐的文件引入
date: 2017-03-06 22:07:00 +0800
category:
tags:
---

## 前言

传统的 PHP，拿别人写好的代码来用，一般是要把别人的文件放到某个位置，然后在自己的代码里引入这个文件，再调试，直到成功，花了挺多功夫。有了面向对象后，最好的习惯是一个类一个文件，引入第三方代码越来越繁琐。

自从有了 composer 后，这种问题就没那么麻烦了。

## 正文

在这之前你可以去了解一下 PHP 的 psr-0 和 psr-4，一般我习惯用 psr-4，听说官方已经废弃了 psr-0。

废话不多说，以 [2amigos/yii2-qrcode-helper](https://github.com/2amigos/yii2-qrcode-helper) 的 composer.json 为例，看看他们的类加载：

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

再看看 src 目录里 `QrCode` 类的命名空间为 `dosamigos\qrcode`。

意思就是，这个包注册了 `dosamigos\qrcode` 这个命名空间，对应的路径是它的 src 目录，这个路径可以理解成是 composer.json 的相对路径（如果是相同目录就留空），当你调用了这个命名空间的类，composer 就会去这个目录找它。

例如 `dosamigos\qrcode\a\b\Test` 类对应的路径就是 `vendor/2amigos/yii2-qrcode-helper/src/a/b/Test.php`

如果你想知道 composer 具体是怎么把这个相对路径转化成绝对路径的，你去 `vendor/composer/autoload_psr4.php` 文件看一下就知道了。

同理，你也可以在项目里建立一个 composer.json 文件，配好 autoload 之后，执行 `composer dump-autoload` 命令，然后把 `vendor/autoload.php` 文件 require 到你的代码里，以后自己的类就不需要一个一个 require 进来了。例如 Laravel 框架就是以 `App` 命名空间来加载 app 目录下的类的。

假如我有两个类，一个是 `\asdf\qwer\Test`，一个是 `\asdf\qwer\zxcv\Test`，你可以把第一个类丢到和 composer.json **同目录**的 `test` 目录下，第二个类丢到 `test\zxcv` 目录，然后你可以在 composer.json 里这么配：

```
{
    "autoload": {
        "psr-4": {
            "asdf\\qwer\\": "test"
        }
    }
}
```

然后执行 `composer dump-autoload`，以后只要你引用了命名空间开头是 `\asdf\qwer` 的类，都会到 `test` 目录里找它。

## yii2 框架的类加载

yii2 本身也有类加载，不依赖 composer，所以 composer.json 可以说是通用的，你可以让多个 yii2 项目共享一个 vendor 目录节约空间，我在第二家公司的时候就是这么干的。

其实[官方的文档](https://github.com/yiisoft/yii2/blob/master/docs/guide-zh-CN/concept-autoloading.md)已经说的很明白了，你可以去看。

你要是看懂上面 composer 的方法，其实 yii2 的类加载也挺好理解的，比如我注册了一个[别名](https://github.com/yiisoft/yii2/blob/master/docs/guide-zh-CN/concept-aliases.md) test，这个别名的值是我某目录的路径：

```
Yii::setAlias('@test', '/path/to/test');
```

当我调用 `\test\a\b\Test` 类时，命名空间的开头是 `test`，框架就会根据别名 `@test/a/b/Test.php` 来寻找这个类，把别名转换成对应的值就是路径 `/path/to/test/a/b/Test.php` 了。

框架自带了一个别名叫 `@app`，它的值和 `yii\base\Application::$basePath` 一致，默认情况下的值就是应用的根目录，比如 basic 模板里的类基本都是 `app` 命名空间下的，advanced 模板则会把应用分为 `@frontend`、`@backend`、`@console`，以及公共目录 `@common`，你看一下这些目录里类的命名空间和路径就明白了。

## 说在最后

了解了 composer 和 yii2 的类加载的方式后，如果你嫌命名空间太长，不妨自己注册一个，不过目前我还没有这样干，我用 PHPStorm 会帮我自动补上 use，还能一键清理+排序（这个功能叫 Optimize Imports，快捷键自己去看吧），就懒得管了。

即使你觉得 composer 类加载对你没有帮助，你也应该了解一下包管理，不同框架对第三方代码加载的方式不一样，引入之后还要调试，而且 GitHub 等网站加快了第三方代码的更新速度，更新代码的时候你还要手工去替换文件，然后又是各种调试……但用了 composer 后，简单的一句命令就能把别人的代码下载或更新到你 composer.json 同目录下的 vendor 目录里，你不必在意别人代码的加载问题，在自己的代码内直接调用，整个世界都美好了。composer 可以说是面向世界、面向未来的，现代的 PHPer 都应该用的东西。
