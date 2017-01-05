---
layout: post
title: 常用 Markdown 样式测试
description: 写一些常用的 Markdown 语法以便调整样式
date: 2016-06-25 00:00:00
tags: markdown
---

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

# 无序列表

## li 里不带 p

* Hello World
* Hello World

## li 里带 p

* Hello World

* Hello World

# 有序列表

## li 里不带 p

1. Hello World
2. Hello World

## li 里带 p

1. Hello World

2. Hello World

# 引用

## 唯一正常的

> 引用

## 不正常的

> 引用 > 引用

> 引用
> > 引用

# 普通文本

这篇文章是用来测试 `Markdown` 语法的，感觉有点坑，这段话是用来测试 `p` 标签的，一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长一定要长

# 文本块

## 单行文本块

    Hello World

## 多行文本块

    Hello World
    Hello World
    Hello World

# 代码

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

echo hello\world::helloWorld(hello\world::$helloWorld);
```

# 表格

| Hello World | Hello World | Hello World | Hello World |
|---|---|---|---|
| Hello World | `Hello World` | Hello World | Hello World |
| Hello World | `Hello World` | Hello World | Hello World |
| Hello World | `Hello World` | Hello World | Hello World |
| Hello World | `Hello World` | Hello World | Hello World |

# 图片

![alipay](https://raw.githubusercontent.com/hubeiwei/hubeiwei.github.io/master/images/pay/ali_pay.jpg "支付宝")

![wechat](https://raw.githubusercontent.com/hubeiwei/hubeiwei.github.io/master/images/pay/wechat_pay.png "微信")
