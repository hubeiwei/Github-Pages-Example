---
layout: post
title: yii2 GridView 导出
description: 搜索和排序后的结果也可以导出
date: 2016-11-10 00:46:48 +0800
category: yii2
tags: yii2,grid
---

GridView 改用功能更强大的 [kartik-v/yii2-grid](https://github.com/kartik-v/yii2-grid)，当然了，你不用也行。

导出使用 [kartik-v/yii2-export](https://github.com/kartik-v/yii2-export)，这个类的父类就是以上的 `kartik-v/yii2-grid`。

控制器和 `searchModel` 的代码，和用 gii 生成的一样，或者你看看[这篇文章]({% post_url 2016-11-02-yii2-grid %})，区别在于视图里：

1. 如果你用了 `kartik\grid\GridView`，它的 `$export` 需要设置为 `false`，否则会报错提醒你下载 mpdf，这个包的大小为 100M，而且 `kartik\grid\GridView` 本身的导出只能导出当前页，你需要显示所有数据才能导出所有，但是页面的数据达到几千条就很卡了，不合理，所以最好的做法就是禁用掉它。

2. 传递给 `GridView` 的 columns 需要共享给 `ExportMenu`，做到“所见即所得”的效果，当然你为了自定义一些内容，也可以分开写，视图代码如下：

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
