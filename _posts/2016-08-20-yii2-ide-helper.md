---
layout: post
title: 让 yii2 自定义组件支持 PHPStorm 代码提示
description: 让效率和准确性更上一层楼
date: 2016-08-20 00:00:00
category: yii2
tags: yii2
---

yii2 是我接触过的几个框架里用 PHPStorm 来学习和开发体验最好的一个，yii2 几乎所有代码都支持了 IDE 的提示，这得益于开发者们在底层内置了大量 PHPDoc 的缘故，但是对于一些自定义的 `components` 比如 `Yii::$app->myComponent->something`, IDE 的提示就无能为力了，这对于追求开发效率和准确性的程序员来说是非常不能忍的事情，但也不是完全没有办法解决这个问题的，以下教大家两种方法。

以 user 组件的 `identity` 属性（当前登录用户的实例，相当于 `findOne` 出来的类）以及第二个数据库组件（一般只有一个库时用默认的 db，因为底层已经有了 PHPDoc）为例，配置大概如下：

```php
return [
    // ...
    'components' => [
        // ...
        'user' => [
            'identityClass' => 'app\models\User',
            // ...
        ],
        'db2' => [
            'class' => 'yii\db\Connection',
            // ...
        ],
        // ...
    ],
    // ...
]
```

## 1.使用 PHPDoc 强行声明返回值的数据类型

这种方法有点麻烦，不是很推荐，但本着知识共享的习惯，还是可以说一下。首先在你喜欢的地方建一个类，里面加上以下几个方法，在方法上面声明好 return 的数据类型，以后调用这个组件时用这些静态方法来获取就好，第三个方法演示了如何对方法里的变量声明数据类型，如果不声明的话，return 的那一行代码就要一个一个字母敲出来了。

```php
namespace app\helpers;

use yii\db\Transaction;

class Helper
{
    /**
     * 获取当前登录用户实例
     * 
     * @return \app\models\User
     */
    public static function getUserInstance()
    {
        return Yii::$app->user->identity;
    }

    /**
     * 获取 db2
     * 
     * @return \yii\db\Connection
     */
    public static function getDb2()
    {
        return Yii::$app->db2;
    }

    /**
     * 开启事务
     *
     * @param string $dbComponentName
     * @param string $isolationLevel
     * @return Transaction
     */
    public static function beginTransaction($dbComponentName = 'db', $isolationLevel = Transaction::SERIALIZABLE)
    {
        /** @var \yii\db\Connection $db */
        $db = Yii::$app->$dbComponentName;
        return $db->beginTransaction($isolationLevel);
    }
}
```

## 2.覆盖原有类

这里说的覆盖不是去修改 vendor 目录里的代码，而是建立同名的类来达到代码提示的目的，yii2 的一个核心开发人员亚历山大给出了[解决方法](https://github.com/samdark/yii2-cookbook/blob/master/book/ide-autocompletion.md)，感觉貌似有点长，以下我的代码是以自己的理解精简后的写出来的，同样不影响原有的代码提示。

这种覆盖类的方法对强迫症只有那么点副作用：

1. IDE提示同命名空间下的类名冲突了，右边滚动条处原本干干净净的突然就多出了一堆警告；

2. 跳转到 `Yii` 类的时候会让你选择跳转到哪一个。

但这些并不会影响到程序的运行和代码提示，原本代码该怎么写就怎么写，极力推荐这种方法。

在你喜欢的地方新建一个文件，因为这个文件和你项目的运行无关，你可以放在项目根目录下，你可以命名为 “_ide_helper.php”，在里面加上以下代码：

```php
class Yii
{
    /**
     * @var MyApplication
     */
    public static $app;
}

/**
 * @property User $user
 * @property \yii\db\Connection $db2
 */
class MyApplication
{
}

/**
 * @property \app\models\User $identity
 */
class User
{
}
```

讲解：

1. 首先我建立了一个 `Yii` 类，它有一个静态属性 `$app`，通过注释声明数据类型为 `MyApplication`。

2. 接着在下面建立了一个 `MyApplication` 类，并通过注释声明它拥有 `$user` 和 `$db2` 两个属性，数据类型分别为 `User` 和 `yii\db\Connection`，这时候 db2 组件的代码提示已经完成。

3. 接着建立一个 `User` 类，通过注释声明它拥有 `$identity` 属性，数据类型为你用户的 `app\models\User`。

添加完以上代码后，可以输入 `Yii::$app->db2->` 和 `Yii::$app->user->identity->` 看效果。
