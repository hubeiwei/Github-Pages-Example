---
layout: post
title: 常用Markdown样式测试
description: 写一些常用的Markdown语法以便调整样式
date: 2016-06-25 0:0:0
category: blog
---

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

# 无序列表

* Hello World
* Hello World

---

* Hello World

* Hello World

# 有序列表

1. Hello World
2. Hello World

---

1. Hello World

2. Hello World

# 引用

## 唯一正常的用法

> 引用

## 不正常的用法

> 引用 > 引用

> 引用
> > 引用

# 文本块

## 单行文本块

    Hello World

## 多行文本块

    Hello World
    Hello World
    Hello World

# 宽代码测试 for mobile：

```php
namespace hello;

class world
{
    public static $helloWorld = 'Hello World';
    
    public static function helloWorld ($helloWorld = 'Hello World')
    {
        return $helloWorld;
    }
}

echo hello\world::helloWorld(self::$helloWorld);
```

# 表格测试：

| Hello World | Hello World | Hello World | Hello World |
|---|---|---|---|
| Hello World | `Hello World` | Hello World | Hello World |
| Hello World | `Hello World` | Hello World | Hello World |
| Hello World | `Hello World` | Hello World | Hello World |
| Hello World | `Hello World` | Hello World | Hello World |

![alipay](https://raw.githubusercontent.com/hubeiwei/laohu-yii2/master/web/ali_pay.jpg "支付宝")

![wechat](https://raw.githubusercontent.com/hubeiwei/laohu-yii2/master/web/wechat_pay.png "微信")
