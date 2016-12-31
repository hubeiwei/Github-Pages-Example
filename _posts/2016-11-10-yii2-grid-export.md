---
layout: post
title: yii2 GridView导出
description: 导出搜索和排序结果
date: 2016-11-10 00:00:00
category: yii2
tags: yii2,grid
---

GridView改用功能更强大的[kartik-v/yii2-grid](https://github.com/kartik-v/yii2-grid)。

导出使用[kartik-v/yii2-export](https://github.com/kartik-v/yii2-export)，这个类的父类就是以上的`kartik-v/yii2-grid`。

控制器和searchModel的代码和[这篇文章]({% post_url 2016-11-02-yii2-grid %})里的基本一样，区别在于视图里：

1. `kartik\grid\GridView::$export`需要设置为`false`，否则会报错提醒你下载mpdf包，这个包的大小为100M，而且`kartik\grid\GridView`本身的导出只能导出当前页，你需要显示所有数据才能导出所有，页面的数据达到几千条就很卡了，不合理，所以最好的做法就是禁用掉它。

2. 传递给GridView的columns需要共享给ExportMenu，做到“所见即所得”的效果，当然你为了自定义一些内容，也可以分开写，视图代码如下：

```php
use kartik\export\ExportMenu;
use kartik\grid\GridView;

/**
 * @var $this \yii\web\View
 * @var $searchModel \app\models\search\UsersSearch
 * @var $dataProvider \yii\data\ActiveDataProvider
 */

$gridColumns = [
    'id',
    'user_name',
];

echo ExportMenu::widget([
    'dataProvider' => $dataProvider,
    'columns' => $gridColumns,
]);

echo GridView::widget([
    'filterModel' => $searchModel,
    'dataProvider' => $dataProvider,
    'columns' => $gridColumns,
    'export' => false,
]);
```
