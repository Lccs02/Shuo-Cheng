# 本地私人资料

此目录用于存放不应提交或部署的资料，例如 `cv-zh.pdf` 和 `contact.local.json`。
除本说明与示例文件外，目录内容已被 `.gitignore` 忽略。

- 私人简历：放置为 `/private/cv-zh.pdf`，仅供本地查看，网站不会复制到 `out`。
- 私密联系方式：复制 `contact.local.example.json` 为 `contact.local.json` 后填写。
- 只有将某项 `visible` 设为 `true`，构建前脚本才会把该字段加入静态网站。
- 静态网页一旦渲染某项信息，该信息即属于公开信息；`NEXT_PUBLIC_*` 也不具备保密性。
