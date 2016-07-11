---
layout: post
title: 简单认识yii2配置
description: 认识yii2常见套路
date: 2016-07-02 00:00:00
category: blog
---

## 前言

**本文的定位是初学者**，写这篇文章，主要是想给初学者分享一下我所理解的yii2配置，以及分享一些`component`和`widget`等是如何配置的。

配置在yii2中很常见，而且配置里还可以嵌套配置，在配置文件中的`$config`数组就能认为是对`yii\web\Application`类进行配置，数组里还能看到`component`和`module`的配置，但这还不是全部，在`model`、`controller`里的`actions`和`behaviors`以及`view`的`widget`都会用到配置。

对初学者来说，配置可以简单的认为是：配置某个类以及父类的默认`public`[属性](http://www.yiiframework.com/doc-2.0/guide-concept-configurations.html)。

看完下面基本格式后，结合上面这句话，去看看[我](https://github.com/hubeiwei/laohu-yii2)或者别人一些现成的代码（推荐用IDE），或许会有不小的收获，以下的示例代码仅供新人参考。

想对配置有更深了解的话还是建议去看一下[官方文档](http://www.yiiframework.com/doc-2.0/guide-concept-configurations.html)，或者[这篇文章](http://www.digpage.com/configuration.html)。

只要知道了配置是什么意思，大概能对框架有更深入的了解，我认为在不改动源码的情况下甚至可以把整个架构都改一遍。

## 配置格式

### 基本格式

以配置文件的`components`为例：

```php
$config['components'] = [
    'user' => [
        //'class' => 'yii\web\User',
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
        //'class' => 'yii\i18n\Formatter',
        'dateFormat' => 'php:Y-m-d',
        'datetimeFormat' => 'php:Y-m-d H:i:s',
    ],
    /*'session' => [
        'class' => 'yii\web\Session',//默认
        //'class' => 'yii\web\DbSession',//可选
        //'class' => 'yii\web\CacheSession',//可选
    ],*/
    'cache' => [
        'class' => 'yii\caching\FileCache',
    ],
];
```

以上几个`component`的数组里，都能看到有声明`class`这个配置，为了规范，一般把`class`写在第一行，下面接着就是对这个`class`的属性进行配置。有些`class`甚至整个`component`我都加上了注释，因为以上都是框架本身的`component`，已经默认是注释里的配置了。

另外，`actions`、`behaviors`的配置项也是这种形式，但到了入口文件之后的代码都支持了类加载，可以使用`Class::className()`来代替写死的字符串，方便以后用IDE重构类名（我觉得大型架构在配置方面能不用字符串就尽量不用字符串，尽量建多点对象来声明属性），这个方法封装在`yii\base\Object`里，yii2几乎所有类的父类最终都继承了该类，所以使用yii2以及其他为yii2开发的类时是可以调用到的，如果有疑问的话，可以看看IDE能不能提示这个方法就好。

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
            ...
        ],
        [
            '属性',
            '验证器名或完整类名',
            '验证器属性1',
            '验证器属性2',
            ...
        ],
    ];
}
```

可能有些同学只用过**验证器名**，没用过**完整类名**，其实只要去看看`yii\validators\Validator`类的源码就知道是什么意思了：

```php
/**
 * @var array list of built-in validators (name => class or configuration)
 */
public static $builtInValidators = [
    'boolean' => 'yii\validators\BooleanValidator',
    'captcha' => 'yii\captcha\CaptchaValidator',
    'compare' => 'yii\validators\CompareValidator',
    'date' => 'yii\validators\DateValidator',
    'default' => 'yii\validators\DefaultValueValidator',
    'double' => 'yii\validators\NumberValidator',
    'each' => 'yii\validators\EachValidator',
    'email' => 'yii\validators\EmailValidator',
    'exist' => 'yii\validators\ExistValidator',
    'file' => 'yii\validators\FileValidator',
    'filter' => 'yii\validators\FilterValidator',
    'image' => 'yii\validators\ImageValidator',
    'in' => 'yii\validators\RangeValidator',
    'integer' => [
        'class' => 'yii\validators\NumberValidator',
        'integerOnly' => true,
    ],
    'match' => 'yii\validators\RegularExpressionValidator',
    'number' => 'yii\validators\NumberValidator',
    'required' => 'yii\validators\RequiredValidator',
    'safe' => 'yii\validators\SafeValidator',
    'string' => 'yii\validators\StringValidator',
    'trim' => [
        'class' => 'yii\validators\FilterValidator',
        'filter' => 'trim',
        'skipOnArray' => true,
    ],
    'unique' => 'yii\validators\UniqueValidator',
    'url' => 'yii\validators\UrlValidator',
    'ip' => 'yii\validators\IpValidator',
];
```

也就是说，以下两种用法是等价的：

```php
use yii\validators\EmailValidator;
 
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
            EmailValidator::className(),
            'skipOnEmpty' => false,
        ],
    ];
}
```

接下来，验证器属性就不用多说了吧？直接去看对应的类的属性就好了。

### Widget

#### GridView

```php
use kartik\grid\ActionColumn;
//use kartik\grid\DataColumn;
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
            //'class' => DataColumn::className(),
            'attribute' => 'id',
            'headerOptions' => ['width' => 80],
        ],
        'access_token',
        'created_at:dateTime',
        [
            //'class' => DataColumn::className(),
            'label' => '过期时间',
            'value' => function ($model) {
                return strtotime('+3 day', $model->created_at);
            },
            'format' => 'dataTime',
        ],
        
        ['class' => ActionColumn::className()],
    ],
]);
```

以上代码直接调用了`kartik\grid\GridView`，不需要再配置class，如果看过源码注释的话可以知道`columns`数组里的每一项默认class都是`kartik\grid\DataColumn`，所以默认是不需要配置class的，如果需要显示行号可以配置一个class为`kartik\grid\SerialColumn`的column，如果需要RUD按钮的话，则可以用`kartik\grid\ActionColumn`。

#### ActionForm

以下代码比较多，但只要关注数组里的内容即可。

```php
use kartik\password\PasswordInput;
use yii\captcha\Captcha;
use yii\helpers\Html;
use yii\widgets\ActiveForm;
 
/**
 * $this yii\web\View
 * $model app\models\User
 */
 
$form = ActiveForm::begin([
    'options' => [
        'class' => 'form-horizontal',
    ],
    'fieldConfig' => [
        'template' => '{label}<div class="col-md-5">{input}</div><div class="col-md-5">{error}</div>',
        'labelOptions' => ['class' => 'col-md-2 control-label'],
    ],
]);
 
//密码控件
echo $form->field($model, 'password')->widget(PasswordInput::className(), ['options' => ['maxlength' => 20]]);
 
//验证码
echo $form->field($model, 'verifyCode')->widget(Captcha::className(), [
    'captchaAction' => '/site/captcha',
    'imageOptions' => [
        'alt' => '验证码',
        'title' => '验证码',
    ],
    'template' => '{input}{image}',
    'options' => [
        'class' => 'form-control',
        'maxlength' => 4,
    ],
]);
 
//复选框
echo $form->field($model, 'rememberMe', [
    'template' => '<div class="col-md-offset-2 col-md-3">{input}{label}</div><div class="col-md-7">{error}</div>',
])->checkbox()->label('记住我');
 
ActiveForm::end();
```

以上用了大量的配置项，但要注意了，有一些配置的是html属性，并不是类的属性，对这些还不熟的应该先去看这个方法的注释。

`$form->field($model, 'attribute')->widget()`方法也很简单，第一个参数是类名，第二个参数就是配置，代码里演示了密码和验证码两个部件。

这里有两个需要注意的，`ActiveForm::begin()`的其中一个配置是`fieldConfig`，以及`$form->field()`的第三个参数，它们都是用来配置`yii\widgets\ActiveField`类的属性的，这个需要看过注释才能知道，以上代码特地展示了一些。

你应该发现最后复选框重新配置了`template`，这样就覆盖了之前在`ActiveForm::begin()`里配置的`template`了。
