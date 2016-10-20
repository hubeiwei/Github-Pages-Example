---
layout: post
title: 认识yii2配置
description: 认识yii2常见套路，包含了rules、GridView（DataColumn和Formatter）、ActiveForm。
date: 2016-07-02 00:00:00
category: blog
---

## 前言

**本文的定位是初学者**，写这篇文章，主要是想给初学者分享一下我所理解的yii2配置是什么意思。

配置在yii2中很常见，配置里还可以嵌套配置，在basic版配置文件`web.php`中的`$config`数组就能认为是对`yii\web\Application`类的配置，数组里还能看到`component`和`module`的配置。

（这句话很重要）对初学者来说，配置可以简单的认为是：配置某个类以及父类的默认`public`属性。

看完下面的一些示例后，结合上面这句话，去看别人一些现成代码的时候或许收获会更大。

想对配置有更深了解的话还是建议去看一下[官方文档](http://www.yiiframework.com/doc-2.0/guide-concept-configurations.html)，或者[这篇文章](http://www.digpage.com/configuration.html)。

只要知道了配置是什么意思，大概能对框架有更深入的了解，我认为在不改动源码的情况下甚至可以把整个架构都改一遍。

## 正文

### 基本格式

以配置文件的`components`为例，以下几个数组里，都能看到有声明`class`这个配置，为了容易读懂，一般把`class`写在第一行，下面接着就是对这个`class`的属性进行配置。有些`class`甚至整个`component`我都加上了注释，因为以下都是框架本身的`component`，注释里的配置已经是默认的了。

```php
$config['components'] = [
    /** @see \yii\web\User */
    'user' => [
        //'class' => 'yii\web\User',
        'identityClass' => 'app\models\User',
        'enableAutoLogin' => true,
        'loginUrl' => ['/user/default/login'],
    ],
    /** @see \yii\db\Connection */
    'db' => [
        'class' => 'yii\db\Connection',
        'dsn' => 'mysql:host=127.0.0.1;dbname=yii2',
        'username' => 'root',
        'password' => '123456',
        'charset' => 'utf8',
    ],
    /** @see \yii\i18n\Formatter */
    'formatter' => [
        //'class' => 'yii\i18n\Formatter',
        'dateFormat' => 'php:Y-m-d',
        'datetimeFormat' => 'php:Y-m-d H:i:s',
    ],
    /** @see \yii\web\Session */
    /*'session' => [
        'class' => 'yii\web\Session',//默认
        //'class' => 'yii\web\DbSession',//可选
        //'class' => 'yii\web\CacheSession',//可选
    ],*/
    /** @see \yii\caching\FileCache */
    'cache' => [
        'class' => 'yii\caching\FileCache',
    ],
];
```

另外，到了入口文件之后的代码都支持了类加载，如果是自己的类，尽量使用`Class::className()`方法来代替写死的字符串，方便以后用IDE重构自己的类名以及查看源码，框架和第三方扩展的类可以使用`className()`方法，也可以使用PHPDoc的@see来辅助跳转到源码，`className()`方法封装在`yii\base\Object`里，很简单的一行代码，yii2几乎所有类的父类最终都继承了该类，所以使用yii2以及其他为yii2开发的类时是可以调用到的，如果有疑问的话，可以看看IDE能不能提示这个方法就好。

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

以下代码直接使用`kartik\grid\GridView`来调用`widget()`方法，`widget()`方法的参数里不需要再配置`class`，直接配置类的属性。

如果看过源码注释的话可以知道`columns`数组里的每一项的默认class都是`kartik\grid\DataColumn`，所以默认是不需要配置class的（也就是注释掉的那些），如果需要显示行号可以配置一个class为`kartik\grid\SerialColumn`的column，如果需要一些操作按钮的话，则可以用`kartik\grid\ActionColumn`。

`columns`数组里的很多项加上了`format`，如果我没猜错的话，能使用的`format`可以认为是`yii\i18n\Formatter`类里的所有asXx方法去掉as并开头小写，以下代码里我在每一个`format`上的注释指出了该格式对应的方法。如果留意一下文章开头`components`的配置，你会发现我为dateTime和date配置了格式，更多内容自行发掘。有一些`format`为数组的，如果我没猜错的话，可以认为数组的第一个参数为格式，接着就是从对应asXx方法的第二个参数逐个开始配置（第一个参数为value不需要配置），起码我以下示例里的配置都成功了。

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
        'name',
        [
            //'class' => DataColumn::className(),
            'attribute' => 'avatar',
            'value' => function ($model) {
                return Yii::$app->getAlias('@web/avatar/' . $model->avatar);
            },
            /** @see \yii\i18n\Formatter::asImage() */
            'format' => [
                'image'
                ['width' => '60px'],
            ],
        ],
        [
            'label' => '生日',
            'attribute' => 'brithday',
            /** @see \yii\i18n\Formatter::asDate() */
            'format' => 'date',
        ],
        /** @see \yii\i18n\Formatter::asEmail() */
        'email:email',
        /** @see \yii\i18n\Formatter::asDateTime() */
        'created_at:dateTime',
        [
            'label' => '百分比',
            'value' => function ($model) {
                return $model->a / $model->b;
            },
            /** @see \yii\i18n\Formatter::asPercent() */
            'format' => ['percent', 2],
        ],
        
        ['class' => ActionColumn::className()],
    ],
]);
```

#### ActionForm

`$form->field($model, 'attribute')->widget()`方法很简单，第一个参数是完整类名，第二个参数就是配置，代码里演示了密码和验证码两个部件。

这里有两个需要注意的，`ActiveForm::begin()`的其中一个配置是`fieldConfig`，以及`$form->field()`的第三个参数，它们都是用来配置`yii\widgets\ActiveField`类的属性的，这个需要看过注释才能知道，代码里特地展示了一些。

你应该发现最后复选框重新配置了`template`，这样就覆盖了之前在`ActiveForm::begin()`里配置的`template`了。

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
