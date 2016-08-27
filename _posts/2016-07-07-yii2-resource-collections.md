---
layout: post
title: yii2资源收集
description: 少造点轮子
date: 2016-07-07 00:00:00
category: blog
---

yii2上有着大量扩展，加快了开发的速度，在此我也打算分享一些我看过的资源。

在此向[forecho](https://github.com/forecho)的[awesome-yii2](https://github.com/forecho/awesome-yii2)致敬，他在yii2方面铺了很多的路。

## 文档

* [官方GitHub中文文档](https://github.com/yiisoft/yii2/tree/master/docs/guide-zh-CN)：如果你也有兴趣的话，就参与文档的翻译吧。

## kartik

[kartik](https://github.com/kartik-v)为yii2贡献了大量既实用又强大的扩展，因此专门用一个标题向他们致敬，以及分享一些我看过的扩展，官方DEMO地址[http://demos.krajee.com](http://demos.krajee.com)。

* [yii2-grid](https://github.com/kartik-v/yii2-grid)：GridView强化版，功能说不清，[文档](http://demos.krajee.com/grid)，[DEMO1](http://demos.krajee.com/grid-demo)，[DEMO2](http://demos.krajee.com/group-grid)。

* [yii2-export](https://github.com/kartik-v/yii2-export)：因为grid的导出只能导出当前页的数据，先显示全部数据再导出的话对于成千上万条数据来说不现实，因此使用这个独立的导出插件是最好的办法，它可以导出全部页数据，配合grid可以达到“所搜即所导”的效果，只需配置`dataProvider`和`columns`属性即可，用法可以参考[这里](https://github.com/hubeiwei/laohu-yii2/blob/master/modules/core/helpers/RenderHelper.php#L82)，[文档](http://demos.krajee.com/export)。

* [yii2-detail-view](https://github.com/kartik-v/yii2-detail-view)：DetailView强化版，不仅是显示详情，还带修改功能，[文档](http://demos.krajee.com/detail-view)，[DEMO](http://demos.krajee.com/detail-view-demo)。

* [yii2-password](https://github.com/kartik-v/yii2-password)：输入控件可以显示密码的强度，也可以选择明文显示密码，附带一个密码验证器，有很丰富的验证功能，输入控件[文档和DEMO](http://demos.krajee.com/password-details/password-input)，验证器[文档和DEMO](http://demos.krajee.com/password-details/strength-validator)，验证功能的中文注释可以看看[这里](https://github.com/hubeiwei/laohu-yii2/blob/master/modules/core/extensions/HuStrengthValidator.php)。

* [yii2-date-range](https://github.com/kartik-v/yii2-date-range)：选择日期范围，建议用1.6.3版，后续版本貌似不支持24小时制，只能选择AM和PM，[文档](http://demos.krajee.com/date-range)，在grid上筛选日期的用法可以参考这里：1.[DataColumn](https://github.com/hubeiwei/laohu-yii2/blob/master/modules/portal/views/music/index.php#L76)，2.[DateRangePicker封装](https://github.com/hubeiwei/laohu-yii2/blob/master/modules/core/helpers/RenderHelper.php#L41)，3.[SearchModel](https://github.com/hubeiwei/laohu-yii2/blob/master/models/search/MusicSearch.php#L81)，4.[ActiveQuery](https://github.com/hubeiwei/laohu-yii2/blob/master/modules/core/extensions/HuActiveQuery.php#L64)。

### yii2-widgets

[yii2-widgets](https://github.com/kartik-v/yii2-widgets)里集成了大量的widget，真心不错，建议花时间看一遍demo，这里单独拿几个我觉得不错的出来分享：

* [yii2-widget-alert](https://github.com/kartik-v/yii2-widget-alert)：消息提示，在框架自带的Alert基础上，增加了持续时间等功能，[文档和DEMO](http://demos.krajee.com/widget-details/alert)。

* [yii2-widget-depdrop](https://github.com/kartik-v/yii2-widget-depdrop)：无限级联动，[文档和DEMO](http://demos.krajee.com/widget-details/depdrop)。

* [yii2-widget-fileinput](https://github.com/kartik-v/yii2-widget-fileinput)：文件上传，带文档、图片、音频、视频预览功能，强烈推荐，[文档和DEMO](http://demos.krajee.com/widget-details/fileinput)。

* [yii2-widget-growl](https://github.com/kartik-v/yii2-widget-growl)：消息提示，可以自定义在页面6个方向的位置显示，效果不错而且不影响布局，[文档和DEMO](http://demos.krajee.com/widget-details/growl)。

* [yii2-widget-typeahead](https://github.com/kartik-v/yii2-widget-typeahead)：文本框输入时能在下方出现提示，感觉不够模糊，不适用于搜索，一般只能用于密保问题之类的，[文档和DEMO](http://demos.krajee.com/widget-details/typeahead)。

* [yii2-widget-select2](https://github.com/kartik-v/yii2-widget-select2)：可以理解成带搜索功能的select下拉框，[文档和DEMO](http://demos.krajee.com/widget-details/select2)。

## Widget

* [ijackua/yii2-lepture-markdown-editor-widget](https://github.com/iJackUA/yii2-lepture-markdown-editor-widget)：简洁的Markdown编辑器。

* [yiidoc/yii2-redactor](https://github.com/yiidoc/yii2-redactor)：简洁的富文本编辑器。

* [2amigos/yii2-file-upload-widget](https://github.com/2amigos/yii2-file-upload-widget)：批量文件上传，[DEMO](http://blueimp.github.io/jQuery-File-Upload)，更多2amigos的扩展请看[这里](https://github.com/2amigos)。

* [wbraganca/yii2-dynamicform](https://github.com/wbraganca/yii2-dynamicform)：动态批量添加修改，[DEMO1](http://wbraganca.com/yii2extensions/dynamicform-demo1/)，[DEMO2](http://wbraganca.com/yii2extensions/dynamicform-demo2/)，[DEMO3](http://wbraganca.com/yii2extensions/dynamicform-demo3/)，更多wbraganca的扩展请看[这里](https://github.com/wbraganca)。

* [wbraganca/yii2-selectivity](https://github.com/wbraganca/yii2-selectivity)：用来选择分类的扩展，提供两种方式，但好像只能选择已有的，不能自行输入，[DEMO](http://wbraganca.com/yii2extensions/yii2-selectivity/usage)。

## Module

* [mdmsoft/yii2-admin](https://github.com/mdmsoft/yii2-admin)：该模块提供了编辑yii2的RBAC表的页面，还附带动态菜单，强烈推荐，[mdmsoft](https://github.com/mdmsoft)还有挺多yii2扩展，可以去看看。

## 图表

* [daixianceng/yii2-echarts](https://github.com/daixianceng/yii2-echarts)

* [2amigos/yii2-highcharts-widget](https://github.com/2amigos/yii2-highcharts-widget)

* [miloschuman/yii2-highcharts](https://github.com/miloschuman/yii2-highcharts)

## gii模版

* [warrence/yii2-kartikgii](https://github.com/warrence/yii2-kartikgii)：顾名思义，这套模板可以帮你生成kartik/grid的CRUD代码，具体还是自己看吧。

* [mootensai/yii2-enhanced-gii](https://github.com/mootensai/yii2-enhanced-gii)：这套模板生成model可以配置添加修改时自动填充的时间和用户字段，其他功能还是自己看吧。

## 网站

* [Get√Yii](https://github.com/iiYii/getyii)

* [iiSNS](https://github.com/shi-yang/iisns)

## 结束语

以上还有很多扩展还在学习中，如果你对我分享的内容有兴趣的话，可以向我打赏，让我更有动力去写这些扩展的教程。

![alipay](https://raw.githubusercontent.com/hubeiwei/hello-yii2/master/web/ali_pay.jpg "支付宝")

![wechat](https://raw.githubusercontent.com/hubeiwei/hello-yii2/master/web/wechat_pay.png "微信")
