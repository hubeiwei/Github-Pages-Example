---
layout: post
title: 认识yii2配置
description: 认识yii2常见套路
date: 2016-07-02 00:00:00
category: yii2
tags: yii2
---

## 前言

**本文的定位是初学者**，写这篇文章，主要是想给初学者分享一下我所理解的yii2配置是什么意思。

配置在yii2中很常见，例如入口文件里`(new yii\web\Application($config))->run()`中的`$config`，就是对`yii\web\Application`类的属性进行配置，有些配置里还会有配置，比如`$config['component']`和`$config['module']`。

**一句话：配置可以简单的认为是配置某个类以及父类的默认属性。**

**不论怎么说，一定要要养成用IDE看源码有哪些属性和方法以及注释的习惯，可以说yii2几乎有一半代码都是注释，我也是这样才懂得快速上手各种yii2相关类的。**

看完下面的一些示例后，结合上面这句话，学习的收获或许会更大。

想对配置有更深了解的话还是建议去看一下[官方文档](http://www.yiiframework.com/doc-2.0/guide-concept-configurations.html)，或者[这篇文章](http://www.digpage.com/configuration.html)。

只要知道了配置是什么意思，大概能对框架有更深入的了解，我认为在不改动源码的情况下甚至可以把整个架构都改一遍。

## 正文

### 基本格式

首先，你要在数组里声明`class`，最佳的写法就是把`class`写在数组的第一位，接下来的内容才是这个`class`的属性配置。

以配置文件的`components`为例：

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

当然有些核心组件是不需要配置`class`的，详情可以看`yii\web\Application::coreComponents()`以及`yii\base\Application::coreComponents()`。

如果你觉得用字符串写类名麻烦，可以使用`Class::className()`来代替写死的字符串，详情请看`yii\base\Object::className()`，这样还方便以后用IDE的find usages、rename、跳转，基本上框架和第三方为yii2开发的类都继承了`yii\base\Object`。

### 验证器

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

可能有些同学只用过**验证器名**，没用过**完整类名**，其实只要去看看`yii\validators\Validator::$builtInValidators`就知道是什么意思了：

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

### Widget

#### GridView

以下代码直接使用`kartik\grid\GridView`来调用`widget()`方法，这时候不需要再配置`class`，直接配置类的属性。

```php
use kartik\grid\ActionColumn;
use kartik\grid\GridView;
use kartik\grid\SerialColumn;
 
echo GridView::widget([
    'resizableColumns' => false,
    'responsiveWrap' => false,
    'hover' => true,
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

如果看过源码的话可以知道`columns`里的每一项默认`class`都是`kartik\grid\DataColumn`，所以默认是不需要配置`class`的，如果需要显示行号可以配置一个`class`为`kartik\grid\SerialColumn`的column，如果需要一些操作按钮的话，则可以用`kartik\grid\ActionColumn`。
