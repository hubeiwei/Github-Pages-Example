---
layout: post
title: yii2 GridView导出
description: 导出搜索和排序结果
date: 2016-11-10 00:00:00
category: blog
---

GridView改用功能更强大的[kartik-v/yii2-grid](https://github.com/kartik-v/yii2-grid)。

导出使用[kartik-v/yii2-export](https://github.com/kartik-v/yii2-export)，这个类的父类就是以上的`kartik-v/yii2-grid`。

控制器和searchModel的代码和[这篇文章](http://laohu321.cc/yii2-grid)里的基本一样，区别在于视图里，传递给GridView的columns需要共享给ExportMenu，做到“所见即所得”的效果，视图代码如下：

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
]);
```
