---
layout: post
title: Hello World
category: blog
description: Hello World
---

## Hello World

* Hello World
* Hello World

1. Hello World
2. Hello World

```php
namespace hello;

class world
{
    const HELLO_WORLD = 'Hello World';
    
    public static function helloWorld ()
    {
        return self::HELLO_WORLD;
    }
}

echo hello\world::helloWorld();
```