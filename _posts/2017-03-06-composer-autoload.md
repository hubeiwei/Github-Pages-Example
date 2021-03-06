---
layout: post
title: composer 的自动加载
description: 告别繁琐的文件引入
date: 2017-03-06 22:07:00 +0800
category:
tags:
---

传统的 PHP，拿别人写好的代码来用，一般是要把别人的文件放到某个位置，然后在自己的代码里引入这个文件，再调试，直到成功，花了挺多功夫。有了面向对象后，最好的习惯是一个类一个文件，然后你就需要一个文件引入一次，很麻烦。

自从有了 composer 后，这种问题就没那么麻烦了，下面将会介绍几种类加载方法。

## psr-4

以 [2amigos/yii2-qrcode-helper](https://github.com/2amigos/yii2-qrcode-helper) 的 composer.json 为例。

composer 安装下来后，目录为 `vendor/2amigos/yii2-qrcode-helper`，以下提到的路径都是该目录的相对路径

看看他们的类加载：

```
{
    "autoload": {
        "psr-4": {
            "dosamigos\\qrcode\\": "src"
        }
    }
}
```

再看一下他们的 `QrCode` 类，路径为 `src/QrCode.php`，命名空间是 `dosamigos\qrcode`。

爱动脑的你一定看出来了，这个包注册了 `dosamigos\qrcode` 这个命名空间，对应的路径是它的 `src` 目录，这个路径可以理解成是 composer.json 的相对路径（如果是相同目录就留空），当你调用了命名空间开头为 `dosamigos\qrcode` 的类，composer 就会去 `src` 这个目录寻找**文件名与类名相符的 php 文件**。

举个具体的例子：当你代码在调用 `dosamigos\qrcode\a\b\Test` 类时，composer 就会去 `vendor/2amigos/yii2-qrcode-helper/src/a/b` 目录来寻找 `Test.php` 文件。

同理，你也可以在项目里建立一个 composer.json 文件，根据你的需求配好 autoload 之后，执行 `composer dump-autoload` 命令，然后把 `vendor/autoload.php` 文件用 `require` 引入到你的代码里，以后只要自己的类放在特定的目录并使用特定的命名空间，就不需要一个一个引入进来了。例如 Laravel 框架就是以 `App` 命名空间来加载 `app` 目录下的类的。

最后，你还可以去 `vendor/composer/autoload_psr4.php` 文件看一下配置了多少个加载。

## classmap

这种加载方式应该会更简单，但是我觉得不如 psr-4 的方法规范，首先你在 composer.json 加上以下代码：

```
{
    "autoload": {
        "classmap": [
            "dir/dir/dir",
            "xx/xx/file.php"
        ]
    }
}
```

然后你可以在你配置的目录或者文件里创建各种类，命名空间随意，类数量不限，创建好类**之后**执行一下 `composer dump-autoload` 命令，把 `vendor/autoload.php` 文件 `require` 到你的代码里就能用了，如果以后新建或修改类后报错找不到类尝试重新执行一下这个命令。

最后，你还可以去 `vendor/composer/autoload_classmap.php` 文件看一下配置了多少个加载。

## files

这种加载方式一般用来加载全局函数，首先你可以在 composer.json 加上以下代码：

```
{
    "autoload": {
        "files": [
            "xx/xx/GlobalFunctions.php"
        ]
    }
}
```

执行一下 `composer dump-autoload` 命令并把 `vendor/autoload.php` 文件 `require` 到你的代码里就能用了，然后你可以在指定的文件里封装你喜欢的函数，但建议在函数外加一层 `if (!function_exists('functionName'))` 来判断该函数是否存在。

最后，你还可以去 `vendor/composer/autoload_files.php` 文件看一下配置了多少个加载。

## 附：yii2 框架的类加载

yii2 本身也有类加载，不依赖 composer（所以 yii2 项目的 composer.json 文件可以说是通用的，你可以让多个 yii2 项目共享一个 vendor 目录节约空间，我在第二家公司的时候就是这么干的）。

其实[官方的文档](https://github.com/yiisoft/yii2/blob/master/docs/guide-zh-CN/concept-autoloading.md)已经说的很明白了，你可以去看。

你要是看懂上面 composer 的 psr-4 的方法，那么 yii2 的类加载也挺好理解的，比如我注册了一个[别名](https://github.com/yiisoft/yii2/blob/master/docs/guide-zh-CN/concept-aliases.md) `@asdf`，这个别名的值是我某目录的路径：

```
Yii::setAlias('@asdf', 'path/to/asdf');
```

当我调用 `\asdf\a\b\Test` 类时，命名空间的开头是 `asdf`，框架就会根据别名 `@asdf/a/b/Test.php` 来寻找这个类，把别名转换成对应的值就是路径 `path/to/asdf/a/b/Test.php` 了。

框架自带了一个别名叫 `@app`，它的值和 `yii\base\Application::$basePath` 一致，一般情况下这个值就是应用的根目录，比如 basic 模板里的类基本都是在 `app` 命名空间下的，advanced 模板则会把应用分为 `@frontend`、`@backend`，以及公共目录 `@common`，你看一下这些目录里类的命名空间和路径就明白了。
