---
layout: post
title: 使用 ShadowSocks 为终端加速
description: 告别 git 和 composer 龟速下载
date: 2017-01-07 17:55:00 +0800
category:
tags:
---

## 前言

有些人玩 GitHub 和 composer 或者别的，总会遇到你懂得的问题，就算用了 ShadowSocks，在默认情况下它是不会处理终端的网络的，我为大家分享一个简单的解决方法。

如果你还不知道哪家的 ShadowSocks 好用的话，可以试一下[我正在用的](https://www.vtrhome.net/aff.php?aff=2289)，速度很快，目前境内IP无法访问。

> 你还在百度搜文件下载？[点击此处](https://github.com/shadowsocks)传送到 ShadowSocks 仓库，找到自己的系统，在 releases 里下载。

## 正文

默认情况下，ShadowSocks 是1080端口，如果给别人用，需要允许来自局域网的连接。

### windows

```bash
set http_proxy='http://127.0.0.1:1080'
set https_proxy="https://127.0.0.1:1080"
```

效果只对当前 cmd 有效，退出失效。

有个不是很推荐的方法，在环境变量下添加 http_proxy 和 https_proxy，做到真正的全局代理，但是如果你的 ShadowSocks 是按流量计费的话，很快就会用完了，或者说你 ShadowSocks 的速度不够快的话，你上网体验会降低。

> 在 windows 安装 composer 的时候，其中有一步会叫你设置代理，其实就是帮你添加一个 http_proxy 到环境变量里，如果你想提高 composer 安装的成功率的话，不妨设置一下，完成后记得删掉这个变量。

### Linux

```bash
export http_proxy='http://127.0.0.1:1080'
export https_proxy='https://127.0.0.1:1080'
```

效果同样是临时的。

### 需要注意的问题

git 使用的是 https_proxy。

使用 composer 时不要设置 https_proxy，或者把https_proxy设置为空字符串，在执行 composer update 或者 install 时，检查 ShadowSocks 的详细日志你会发现根本没有连接（即使你配置了 http_proxy），可能你会等半天然后出来一堆错误。强烈建议在命令里加上 `--prefer-dist`，作用是不使用 `git clone` 而是直接下载代码，才可以走 http_proxy，而且这样每个包里就都不会有你用不到的 .git 目录存在。
