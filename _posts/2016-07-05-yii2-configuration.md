---
layout: post
title: 认识 yii2 配置
description: 认识 yii2 常见套路
date: 2016-07-05 15:49:00 +0800
category: yii2
tags: yii2
---

## 前言

写这篇文章，主要是想给初学者分享一下我所理解的 yii2 配置是什么意思。

yii2里很多功能都是针对某个**类**的**属性**配置出来的，例如入口文件里的 `(new yii\web\Application($config))->run()` 中的 `$config`，就是对 `yii\web\Application` 类的**属性**进行配置，有些配置里还会有配置，比如 `$config['component']` 和 `$config['module']`。

一句话：配置可以简单的认为是**指定你要用的类**，以及初始化这个类的**属性**。

**不论怎么说，初学不需要研究源码，但平时用到的类的父类最好都看一下，它提供了哪些可以给自己用的（public）属性、方法和注释还有常量，这才叫面向对象，要不继承有何用呢？这样你才能对你使用的东西更熟悉。yii2 的源码里有大量注释，甚至可以不看 api 文档了，建议学会用IDE提高看源码的效率。**

看完下面的一些示例后，结合上面这句话，学习的收获或许会更大。

想对配置有更深了解的话还是建议去看一下[官方文档](http://www.yiiframework.com/doc-2.0/guide-concept-configurations.html)，或者[这篇文章](http://www.digpage.com/configuration.html)，我觉得写的比我详细多了。

## 基本格式

首先，你要在数组里声明 `class`，最佳的写法就是把 `class` 写在数组的第一位，接下来的内容才是这个 `class` 的属性配置。

以配置文件的 `components` 为例：

```php
$config['components'] = [
    'user' => [
        'class' => 'yii\web\User',
        'identityClass' => 'app\models\User',
        'enableAutoLogin' => true,
        'loginUrl' => ['/user/default/login'],
    ],
    'db' => [
        'class' => 'yii\db\Connection',
        'dsn' => 'mysql:host=127.0.0.1;dbname=yii2',
        'username' => 'root',
        'password' => '123456',
        'charset' => 'utf8',
    ],
    'formatter' => [
        'class' => 'yii\i18n\Formatter',
        'dateFormat' => 'php:Y-m-d',
        'datetimeFormat' => 'php:Y-m-d H:i:s',
    ],
];
```

当然有些核心组件是不需要配置 `class` 的，详情可以看 `yii\web\Application::coreComponents()` 以及 `yii\base\Application::coreComponents()`。

如果你觉得用字符串写类名麻烦，可以使用 `Class::className()` 来代替写死的字符串，详情请看 `yii\base\Object::className()`，这样还方便以后用 IDE 的 find usages、rename、跳转等高效的功能，基本上框架和第三方为 yii2 开发的类都继承了 `yii\base\Object`。

## 验证器

首先，规则的写法如下：

```php
public function rules()
{
    return [
        [
            ['属性1', '属性2', ...],
            '验证器名或完整类名',
            '验证器属性1',
            '验证器属性2',
            // ...
        ],
        [
            '属性',
            '验证器名或完整类名',
            '验证器属性1',
            '验证器属性2',
            // ...
        ],
    ];
}
```

可能有些同学只用过**验证器名**，没用过**完整类名**，其实只要去看看 `yii\validators\Validator::$builtInValidators` 就知道是什么意思了：

```php
/**
 * @var array list of built-in validators (name => class or configuration)
 */
public static $builtInValidators = [
    // ...
    'date' => 'yii\validators\DateValidator',
    'default' => 'yii\validators\DefaultValueValidator',
    'double' => 'yii\validators\NumberValidator',
    'each' => 'yii\validators\EachValidator',
    'email' => 'yii\validators\EmailValidator',
    // ...
];
```

也就是说，以下两种用法是等价的：

```php
public function rules()
{
    return [
        [
            ['email'],
            'email',
            'skipOnEmpty' => false,
        ],
        [
            'email',
            \yii\validators\EmailValidator::className(),
            'skipOnEmpty' => false,
        ],
    ];
}
```

接下来，验证器属性就不用多说了吧？直接去看对应的类的属性就好了。

## Widget

有些地方是直接对某个类进行配置的，当然你需要看过注释才能知道，例如常用的 GridView 和 ActiveForm 两个类。

### GridView

以下代码直接使用 `yii\grid\GridView` 来调用 `widget()` 方法，这时候不需要再配置 `class`，直接配置类的属性。

```php
use yii\grid\ActionColumn;
use yii\grid\GridView;
use yii\grid\SerialColumn;
 
echo GridView::widget([
    'dataProvider' => $dataProvider,
    'filterModel' => $searchModel,
    'columns' => [
        ['class' => SerialColumn::className()],
        
        [
            'attribute' => 'id',
            'headerOptions' => ['width' => 80],
        ],
        'name',
        [
            'label' => '生日',
            'attribute' => 'brithday',
            'format' => 'date',
        ],

        ['class' => ActionColumn::className()],
    ],
]);
```

如果看过源码的话可以知道 `yii\grid\GridView::columns` 里的每一项默认 `class` 都是 `yii\grid\DataColumn`，所以默认是不需要配置 `class` 的，如果需要显示行号可以设置 `class` 为 `yii\grid\SerialColumn`，如果需要一些操作按钮的话，则可以用 `yii\grid\ActionColumn`。
