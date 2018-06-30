---
title: Exception
subtitle: Abnormal
cols: 1
order: 5
---

The exception page is used to feed back page-specific exceptions. Usually, it contains an explanation of the error status, and provides users with suggestions or operations, to prevent users from feeling lost and confused.

## API

| Parameter         | Instructions                                      | Types of         | Defaults |
|-------------|------------------------------------------|-------------|-------|
| type        | 页面类型，若配置，则自带对应类型默认的 `title`，`desc`，`img`，此默认设置可以被 `title`，`desc`，`img` 覆盖 | Enum {'403', '404', '500'} | - |
| title       | 标题     | ReactNode  | -    |
| desc        | 补充描述    | ReactNode  | -    |
| img         | 背景图片地址     | string  | -    |
| actions     | 建议操作，配置此属性时默认的『返回首页』按钮不生效    | ReactNode  | -    |
| linkElement | 定义链接的元素 | string\|ReactElement | 'a' |
