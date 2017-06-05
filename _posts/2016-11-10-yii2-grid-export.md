---
layout: post
title: yii2 GridView 导出
description: 搜索和排序后的结果也可以导出
date: 2016-11-10 00:46:48 +0800
category: yii2
tags: yii2,grid
---

导出使用的扩展是 [kartik-v/yii2-export](https://github.com/kartik-v/yii2-export)，先用 composer 安装好它。

控制器和 `searchModel` 的代码，和用 gii 生成的一样，或者你看看[这篇文章]({% post_url 2016-11-02-yii2-grid %})，区别在于视图里，传递给 `GridView` 的 columns 需要共享给 `ExportMenu`，做到“所见即所得”的效果，当然你为了自定义一些内容，也可以分开写，视图代码如下：

```php
use kartik\export\ExportMenu;
use yii\grid\GridView;

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
]);
```
