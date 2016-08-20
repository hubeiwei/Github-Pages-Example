---
layout: post
title: 让yii2自定义组件支持PHPStorm代码提示
description: 让效率更上一层楼
date: 2016-08-20 00:00:00
category: blog
---

yii2是我接触过的几个框架里用PHPStorm来学习和开发体验最好的一个，yii2几乎所有代码都支持了IDE的提示，这得益于开发者们在底层内置了大量PHPDoc的缘故，但是对于一些自定义的components比如`Yii::$app->myComponent->something`, IDE的提示就无能为力了，这对于追求开发效率和准确性的程序员来说是非常不能忍的事情，但也不是完全没有办法解决这个问题的，以下教大家两种方法。

以user组件的identity（当前登录用户的实例，相当于findOne出来的类）以及第二个数据库组件（一般只有一个库时用默认的db最好因为底层已经有了PHPDoc）为例，配置如下：

```php
'user' => [
    'identityClass' => 'app\models\User',
    'enableAutoLogin' => true,
    'loginUrl' => ['/login'],
],
'db2' => [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=127.0.0.1;dbname=yii2basic',
    'username' => 'root',
    'password' => '123456',
    'charset' => 'utf8',
],
```

## 1.使用PHPDoc强行声明返回值的数据类型

这种方法有点麻烦，不是很推荐，但本着知识共享的习惯，还是可以说一下。首先在你喜欢的地方建一个类，里面加上以下几个方法，在方法上面声明好return的数据类型，以后调用这个组件时用这些静态方法来获取就好，第三个方法演示了如何对方法里的变量声明数据类型，如果不声明的话，return的那一行代码就要一个一个字母敲出来了。

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
     * 获取db2
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

这里说的覆盖不是去修改vendor目录里的代码，而是建立同名的类来达到代码提示的目的，这种方法对强迫症只有那么点副作用：

1. IDE提示同命名空间下的类名冲突了，右边滚动条处原本干干净净的突然就多出了一堆警告；

2. 跳转到`Yii`类的时候会让你选择跳转到哪一个。

但这些并不会影响到程序的运行和代码提示，极力推荐这种方法。

在项目根目录新建一个文件，你可以命名为_ide_helper，在里面加上以下代码：

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

1. 首先我建立了一个`Yii`类，它有一个静态属性`$app`，声明数据类型为`MyApplication`。

2. 接着在下面建立了一个`MyApplication`类，并在注释里声明了它拥有`$user`和`$db2`两个属性，数据类型分别为`User`和`yii\db\Connection`，这时候db2组件的代码提示已经完成。

3. 接着建立一个`User`类，在注释里声明它拥有`$identity`属性，数据类型为你用户的`app\models\User`。
