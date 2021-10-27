# Cloud DB JavaScript SDK CodeLab

## 介绍

此项目是使用AppGallery Connect云数据库JavaScript SDK开发的Web项目CodeLab。

## 环境要求
- 一台可以编译运行Vue项目的计算机。

## 使用指南

- 1.如果没有华为开发者联盟帐号，需要先[注册账号](https://developer.huawei.com/consumer/cn/doc/start/registration-and-verification-0000001053628148) 并通过实名认证。

- 2.使用申请的帐号登录[AppGallery Connect](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-get-started) 网站创建一个项目并添加应用，软件包类型选择“Web”。

- 3.在我的项目中进入新建的项目，选择创建的Web应用，进入“构建”>“云数据库”页面，点击“立即开通”，开启云数据库服务。然后执行以下操作：

  (1) 创建对象类型：在**对象类型**页签，通过导入当前根目录下**CloudDBQuickStart_1.json**中的模板文件，创建对象类型；或者自行创建一个名为**BookInfo**的对象类型文件，并确保所有字段必须与项目中**BookInfo.java**中的字段相同。

  (2) 创建存储区：在**存储区**页签，单击**新增**，创建名为**QuickStartDemo**的存储区。

- 4.在对象类型页面，点击**导出**，选择**js**，在js文件类型选择栏内，选择**js**，将导出的本地zip文件解压缩并且复制粘贴到“./src/components”路径下。

- 5.进行相同的操作，导出时类型选择**json格式**，将导出的json文件同样复制粘贴到“./src/components”路径下。

- 6.在“我的项目”中点击“项目设置”，复制SDK代码片段并粘贴到[agconnect-services.js](./src/components/agconnect-services.js)文件的**var agConnectConfig**的代码片段中。

- 7.在命令行中依次运行如下命令以运行demo：
    ```
    # 安装Cloud DB SDK 依赖
    npm install --save @agconnect/database

    # 启动demo
    npm start
    ```
7. 更多详情请点击[云数据库](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-clouddb-getstarted-web) 。

## 技术支持

如果您对使用AppGallery Connect示例代码有疑问，请通过如下途径寻求帮助：
- 访问[Stack Overflow](https://stackoverflow.com/) , 在`AppGallery`标签下提问，有华为研发专家在线一对一解决您的问题。
- 访问[华为开发者论坛](https://forums.developer.huawei.com/forumPortal/en/home) AppGallery Connect板块与其他开发者进行交流。

如果您在尝试示例代码中遇到问题，请向仓库提交[issue](https://github.com/AppGalleryConnect/agc-demos/issues) ，也欢迎您提交[Pull Request](https://github.com/AppGalleryConnect/agc-demos/pulls) 。

## 授权许可
该示例代码经过[Apache 2.0 授权许可](http://www.apache.org/licenses/LICENSE-2.0) 。
