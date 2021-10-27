# Cloud DB JavaScript SDK CodeLab

## Introduction

This project is a Web project Codelab developed using AppGallery Connect Cloud DB JavaScript SDK.

## Preparing the Environments
* A computer can compile and run Vue project

## Quick Start

- 1.If you do not have a HUAWEI Developer account, you need to [register an account](https://developer.huawei.com/consumer/en/doc/start/registration-and-verification-0000001053628148) and pass identity verification.
- 2.Use your account to sign in to [AppGallery Connect](https://developer.huawei.com/consumer/en/doc/development/AppGallery-connect-Guides/agc-get-started), create a project and add an app, set app platform to Web.
- 3.Select your project and app in My projects, and go to Build > Cloud DB to enable the Cloud DB service. Then, perform the following operations:

  (1) Create a schema by importing a template file stored in **CloudDBQuickStart_1.json** in the root directory of the project. Alternatively, create a schema named **BookInfo** and ensure that all fields must be the same as those in **BookInfo.java** in the project.

  (2) Create a Cloud DB zone. On the **Cloud DB Zone** tab page, click **Add** to create a Cloud DB zone named **QuickStartDemo**.

- 4.In the ObjectTypes page, click **Export** and select **JS**. In the **File type of js** selection bar, select **js**. Unzip and copy and paste the exported local ZIP file into the path of "./src/components ".
- 5.Repeat the same operation, select *JSON* format when exporting, and copy and paste the exported JSON file into the path of "./src/components ".
- 6.click "Project Settings" In "My Project" , copy the SDK Code Snippet json and paste the json to the code snippet of const **var agConnectConfig** in the[agconnect-services.js](./src/components/agconnect-services.js)
- 7.Run the following code in terminal in the demo path, and demo will start.
    ``` bash
   # install Cloud DB SDK dependencies
    npm install --save @agconnect/database

    # run demo
    npm start
    ```
- 8.More details about [Cloud DB](https://developer.huawei.com/consumer/en/doc/development/AppGallery-connect-Guides/agc-clouddb-getstarted-web) .

## Question or issues

If you have questions about how to use AppGallery Connect Demos, try the following options:
* [Stack Overflow](https://stackoverflow.com/) is the best place for any programming questions. Be sure to tag your question with `AppGallery`.
* [Huawei Developer Forum](https://forums.developer.huawei.com/forumPortal/en/home) AppGallery Module is great for general questions, or seeking recommendations and opinions.

If you run into a bug in our samples, please submit an [issue](https://github.com/AppGalleryConnect/agc-demos/issues) to the Repository. Even better you can submit a [Pull Request](https://github.com/AppGalleryConnect/agc-demos/pulls) with a fix.

## License
This demo is licensed under the [Apache License, version 2.0](http://www.apache.org/licenses/LICENSE-2.0).
