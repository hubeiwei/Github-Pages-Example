---
layout: post
title: yii2 面向对象基础
description: 认识 yii2 类配置方法
date: 2016-07-05 15:49:00 +0800
category: yii2
tags: yii2
---

`yii\base\BaseObject` 这个类，是 yii2 里最顶端的父类，它提供了属性这一个概念，具体可以看[官方文档](https://www.yiiframework.com/doc/guide/2.0/zh-cn/concept-properties)。

类的配置就是遵循属性这一个概念的，其实我觉得[官方文档](https://www.yiiframework.com/doc/guide/2.0/zh-cn/concept-configurations)就说得很明白了，所以本文就不重复讲这些内容了，只讲些可能需要注意的点。

平时用到的类的父类最好都看一下，这样你才知道你这个类到底拥有什么功能。yii2 的源码里有大量注释，甚至可以不看 [api 文档](https://www.yiiframework.com/doc/api/2.0)了，建议学会用 IDE 提高学习效率。

## 验证器

首先，规则的写法如下：

```php
public function rules()
{
    return [
        [
            ['属性1', '属性2', ...],
            '验证器名或类的完全限定名称',
            '验证器属性1' => '值',
            '验证器属性2' => '值',
            // ...
        ],
        [
            '属性',
            '验证器名或类的完全限定名称',
            '验证器属性1' => '值',
            '验证器属性2' => '值',
            // ...
        ],
    ];
}
```

可能有些同学只用过**验证器名**，没用过**完全限定名称**，其实只要去看看 `yii\validators\Validator::$builtInValidators` 就知道是什么意思了：

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

## GridView

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

如果看过 `yii\grid\GridView` 的属性的话，你会发现 `yii\grid\GridView::$dataColumnClass` 告诉你 `yii\grid\GridView::$columns` 里每一项默认都是 `yii\grid\DataColumn` 这个类，所以在以上示例的 `columns` 里有些内容没有显式配置 `class`，如果需要显示行号可以使用 `yii\grid\SerialColumn`，如果需要一些操作按钮的话，则可以用 `yii\grid\ActionColumn`。

## ActiveForm

```php
use yii\widgets\ActiveForm;

$form = ActiveForm::begin([
    'fieldClass' => 'yii\widgets\ActiveField',
    'fieldConfig' => [
        'template' => "{label}\n{input}\n{hint}\n{error}",
        'inputOptions' => ['class' => ['form-control']],
    ],
]);

// 直接输出一个 mobile 的 input
echo $form->field($model, 'mobile')->textInput(['type' => 'number']);

// 直接输出一个 name 的 input，且修改它的 template
echo $form->field($model, 'name', [
    'template' => "{label}\n{input}\n{error}",
])->textInput(['maxlength' => true]);

// 取得一个 description 字段的 ActiveField 对象
$field = $form->field($model, 'description');
// 修改它的 class
$field->inputOptions = ['form-control', 'input-sm'];
// 它是一个 text 的 input
$field->textInput();
// 输出 input
echo $field;

ActiveForm::end();
```

上面演示了3个字段的 input 的输出，爱动脑的你一定看出来了，`yii\widgets\ActiveForm::field()` 方法返回一个 `yii\widgets\ActiveField` 对象，然后这个对象你有3种方法可以配置它。
