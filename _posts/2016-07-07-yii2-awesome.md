---
layout: post
title: 个人 yii2 资源收集
description: 少造轮子
date: 2016-07-07 16:30:00 +0800
category: yii2
tags: yii2
---

yii2 上有着大量扩展，加快了开发的速度，在此我也打算分享一些我看过的资源。

在此向 [forecho](https://github.com/forecho) 的 [awesome-yii2](https://github.com/forecho/awesome-yii2) 致敬，他在 yii2 方面铺了很多的路。

## 文档

* [官方GitHub中文文档](https://github.com/yiisoft/yii2/tree/master/docs/guide-zh-CN)：如果你也有兴趣的话，就参与文档的翻译吧。

## kartik

[kartik](https://github.com/kartik-v) 为 yii2 贡献了大量既实用又强大的扩展，因此专门开一块以表致敬，以下都是我看过的扩展，官方 DEMO 地址：[http://demos.krajee.com](http://demos.krajee.com)。

* [yii2-grid](https://github.com/kartik-v/yii2-grid)：GridView 加强版，功能挺多，自己看，[文档](http://demos.krajee.com/grid)，[DEMO1](http://demos.krajee.com/grid-demo)，[DEMO2](http://demos.krajee.com/group-grid)。

* [yii2-export](https://github.com/kartik-v/yii2-export)：因为上面的 grid 导出功能只能导出当前页的数据，先显示全部数据再导出的话对于成千上万条数据来说不现实，因此使用这个独立的导出插件是最好的办法，它可以导出全部页数据，配合 grid 的 filter 可以达到“所搜即所导”的效果，只需配置 `dataProvider` 和 `columns` 属性即可，用法可以参考[我的]({% post_url 2016-11-10-yii2-grid-export %})，[文档](http://demos.krajee.com/export)。

* [yii2-detail-view](https://github.com/kartik-v/yii2-detail-view)：DetailView 强化版，不仅是显示详情，还带修改功能，[文档](http://demos.krajee.com/detail-view)，[DEMO](http://demos.krajee.com/detail-view-demo)。

* [yii2-password](https://github.com/kartik-v/yii2-password)：输入控件可以显示密码的强度，也可以选择明文显示密码，附带一个密码验证器，有很丰富的验证功能，输入控件[文档和 DEMO](http://demos.krajee.com/password-details/password-input)，验证器[文档和 DEMO](http://demos.krajee.com/password-details/strength-validator)，验证功能的中文注释可以看看[我的](https://github.com/hubeiwei/hello-yii2/blob/master/common/extensions/StrengthValidator.php)。

* [yii2-date-range](https://github.com/kartik-v/yii2-date-range)：选择日期范围，[文档](http://demos.krajee.com/date-range)，在 grid 上筛选日期的用法可以参考[我的文章](https://github.com/hubeiwei/yii2-tools)，搜索“范围过滤”字样。

### kartik-v/yii2-widgets

[yii2-widgets](https://github.com/kartik-v/yii2-widgets)里集成了大量的 widget，真心不错，建议花时间看一遍 demo，这里单独拿几个我觉得不错的出来分享：

* [yii2-widget-alert](https://github.com/kartik-v/yii2-widget-alert)：消息提示，在框架自带的 `yii\bootstrap\Alert` 基础上，增加了持续时间等功能，[文档和DEMO](http://demos.krajee.com/widget-details/alert)。

* [yii2-widget-depdrop](https://github.com/kartik-v/yii2-widget-depdrop)：无限级联动，[文档和DEMO](http://demos.krajee.com/widget-details/depdrop)。

* [yii2-widget-fileinput](https://github.com/kartik-v/yii2-widget-fileinput)：文件上传，带文档、图片、音频、视频预览功能，强烈推荐，[文档和 DEMO](http://demos.krajee.com/widget-details/fileinput)。

* [yii2-widget-growl](https://github.com/kartik-v/yii2-widget-growl)：消息提示，可以自定义在页面6个方向的位置显示，效果不错而且不影响布局，[文档和 DEMO](http://demos.krajee.com/widget-details/growl)。

* [yii2-widget-select2](https://github.com/kartik-v/yii2-widget-select2)：功能挺丰富的下拉框，也可以做文章标签输入，[文档和 DEMO](http://demos.krajee.com/widget-details/select2)。

* [yii2-widget-typeahead](https://github.com/kartik-v/yii2-widget-typeahead)：输入提示，[文档和 DEMO](http://demos.krajee.com/widget-details/typeahead)。

## Widget

* [ijackua/yii2-lepture-markdown-editor-widget](https://github.com/iJackUA/yii2-lepture-markdown-editor-widget)：简洁的 Markdown 编辑器，现在被标记成废弃了，还没找到别的可以替代的。

* [yiidoc/yii2-redactor](https://github.com/yiidoc/yii2-redactor)：简洁的富文本编辑器。

* [2amigos/yii2-file-upload-widget](https://github.com/2amigos/yii2-file-upload-widget)：批量文件上传，[DEMO](http://blueimp.github.io/jQuery-File-Upload)，更多 2amigos 的扩展请看[这里](https://github.com/2amigos)。

* [wbraganca/yii2-dynamicform](https://github.com/wbraganca/yii2-dynamicform)：动态批量添加修改，[DEMO1](http://wbraganca.com/yii2extensions/dynamicform-demo1/)，[DEMO2](http://wbraganca.com/yii2extensions/dynamicform-demo2/)，[DEMO3](http://wbraganca.com/yii2extensions/dynamicform-demo3/)，更多 wbraganca 的扩展请看[这里](https://github.com/wbraganca)。

## Module

* [mdmsoft/yii2-admin](https://github.com/mdmsoft/yii2-admin)：该模块提供了配置 rbac 的页面，他把 rbac 原本的权限分为了权限和路由，可以使用它附带的中间件来控制不同用户可访问的路由，还附带根据权限来显示的菜单 widget，需求简单的推荐用这个，当然 [mdmsoft](https://github.com/mdmsoft) 还有挺多 yii2 扩展，可以去看看。

## 图表

* [daixianceng/yii2-echarts](https://github.com/daixianceng/yii2-echarts)

* [2amigos/yii2-highcharts-widget](https://github.com/2amigos/yii2-highcharts-widget)

* [miloschuman/yii2-highcharts](https://github.com/miloschuman/yii2-highcharts)

## gii 模版

* [warrence/yii2-kartikgii](https://github.com/warrence/yii2-kartikgii)：这套模板生成的 CRUD 代码用到了很多 kartik 的 widget，可以用来参考一些 widget 的用法，具体还是自己看吧。

* [mootensai/yii2-enhanced-gii](https://github.com/mootensai/yii2-enhanced-gii)：这套模板生成 model 可以配置添加修改时自动填充的时间和用户字段，其他功能还是自己看吧。

## 开源网站

* [Get√Yii](https://github.com/iiYii/getyii)
