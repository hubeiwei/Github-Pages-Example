---
layout: post
title: yii2 自动填充字段
description: 学习偷懒
date: 2016-07-18 01:37:00 +0800
category: yii2
tags: yii2
---

我很懒，每次建完表之后都喜欢用 gii 生成 model 和 CRUD 代码，有些表简单到只需要很普通的输入，不需要对代码进行改动，很方便，如果遇到稍微特殊点的比如富文本编辑器或者日期选择之类的，可以直接找一个 widget，在表单简单修改一下就 OK 了。

但有些字段是需要在后端完成的，例如添加修改时的时间戳和操作人 ID，可能你会想到在这个 model 添加和修改的地方给对应字段加上 `time()` 和 `Yii::$app->user->id`，但这太辛苦，只能解决当前问题，称不上偷懒，应该做的更彻底一些。

有些同学应该想到了 model 的 `beforeSave()`，这可以，代码可以这么写：

```php
use Yii;

public function beforeSave($insert)
{
    if (parent::beforeSave($insert)) {
        if ($insert) {
            $this->created_at = time();
            $this->created_by = Yii::$app->user->id;
        } else {
            $this->updated_at = time();
            $this->updated_by = Yii::$app->user->id;
        }
        return true;
    } else {
        return false;
    }
}
```

这应该是最简单的一个方法，但以后要是有其他需求在 `beforeSave()` 方法里加代码的话，代码混在一起，可能会搞得很乱，所以强烈推荐使用 `behaviour()`：

```php
use yii\behaviors\BlameableBehavior;
use yii\behaviors\TimestampBehavior;

/**
 * @inheritdoc
 */
public function behaviors()
{
    return [
        BlameableBehavior::className(),// 不进行任何配置
        [
            'class' => TimestampBehavior::className(),
            'attributes' => [
                parent::EVENT_BEFORE_UPDATE => 'updated_at',// 修改时填充 updated_at 字段
            ],
            'value' => date('Y-m-d H:i:s'),// 填充的值
        ],
    ];
}
```

在以上代码添加了两个行为，第一个类 `yii\behaviors\BlameableBehavior` 是用来自动完成操作人 ID 字段的，第二个类 `yii\behaviors\TimestampBehavior` 是自动完成时间戳字段的，然后对它们进行了一些配置（如果你对配置不熟的话，不妨看看[这个](http://laohu321.cc/yii2-configuration-simple)）。

第一个行为我没有进行任何配置，这是为了告诉大家，这两个类其实是有默认配置的，所以这些默认配置如果和自己的需求符合的话，就可以直接添加类名，你去把这两个类的内容看一遍就知道了。

需要补充的是，在执行 `save()` 方法的时候，会先进行验证，再触发 `yii\db\BaseActiveRecord::EVENT_BEFORE_INSERT` 和 `yii\db\BaseActiveRecord::EVENT_BEFORE_UPDATE` 两个事件，所以相关字段如果有非空之类的规则的话，`save()` 是无法成功的，可以考虑取消相关字段的非空规则，或者，如果你已经确认接收到的数据是安全的，可以使用 `save(false)`。

最后，这两个类的父类 `yii\behaviors\AttributeBehavior`，如果你有更多的想法，不妨试试用这个来实现。
