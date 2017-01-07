---
layout: post
title: 使用 ShadowSocks 为终端加速
description: 告别 git 和 composer 龟速下载
date: 2017-01-07 17:55:00 +0800
category:
tags:
---

## 前言

有些人玩 GitHub 和 composer 或者别的，总会遇到你懂得的问题，就算用了 ShadowSocks，在默认情况下它是不会处理终端的网络的，我为大家提供一个简单的解决方法。

如果你还不知道哪家的 ShadowSocks 好用的话，可以试一下[我正在用的](http://vpnaff.com/?2289)，按流量计费。

如果你还没有 ShadowSocks 客户端，可以去他们的 [GitHub 仓库](https://github.com/shadowsocks)看一下。

## 正文

默认情况下，ShadowSocks 是1080端口。

### windows

```bash
SET http_proxy='http://127.0.0.1:1080'
SET HTTPS_PROXY="https://127.0.0.1:1080"
```

效果是临时的，退出失效，你也可以在环境变量下添加，用户变量或系统变量随意，用完后记得删掉。

### [babun](https://github.com/babun/babun)

```bash
export http_proxy='http://127.0.0.1:1080'
export HTTPS_PROXY='https://127.0.0.1:1080'
```

效果同样是临时的，linux 应该也是这么用。

### 需要注意的坑

我是在 babun 上用的，http_proxy 对 composer 有效 ，HTTPS_PROXY 对 git 有效，如果你设置没有效果的话，尝试大小写都设置一遍。

在用 composer 时如果配置了 https 的代理，应该会遇到问题，你可以退出重来只设置 http 代理，或者设置 https 代理为空字符串。
