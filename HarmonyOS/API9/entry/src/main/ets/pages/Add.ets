/*
* Copyright 2022. Huawei Technologies Co., Ltd. All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import LoadingDialog from '../component/LoadingDialog';
import promptAction from '@ohos.promptAction';
import { CloudDBService as CloudDB } from '../Service/CloudDBService';
import { BookInfo } from '../Service/BookInfo';
import router from '@ohos.router';

@Entry
@Component
struct Add {
  @State bookId: number = 1
  @State bookName: string = ''
  @State author: string = ''
  @State price: number = undefined

  loading: CustomDialogController = new CustomDialogController({
    builder: LoadingDialog(),
    autoCancel: false,
    customStyle: true,
    alignment: DialogAlignment.Center
  })

  build() {
    Column({ space: 30 }) {
      Row() {
        Text("ID").width(60).fontSize(14)
        TextInput({ placeholder: '请输入ID' }).layoutWeight(1)
          .type(InputType.Number)
          .onChange((value: string) => {
            this.bookId = Number(value);
          })
      }

      Row() {
        Text("名称").width(60).fontSize(14)
        TextInput({ placeholder: '请输入名称' }).layoutWeight(1)
          .onChange((value: string) => {
            this.bookName = value;
          })
      }

      Row() {
        Text("作者").width(60).fontSize(14)
        TextInput({ placeholder: '请输入作者' }).layoutWeight(1)
          .onChange((value: string) => {
            this.author = value;
          })
      }

      Row() {
        Text("价格").width(60).fontSize(14)
        TextInput({ placeholder: '请输入价格' }).layoutWeight(1)
          .type(InputType.Number)
          .onChange((value: string) => {
            this.price = Number(value);
          })
      }

      Row() {
        Button('添加', { type: ButtonType.Capsule, stateEffect: true }).backgroundColor(0x317aff).width(90)
          .onClick(async () => {
            // 进行数据添加
            const bookInfo = new BookInfo();
            bookInfo.setId(this.bookId);
            bookInfo.setBookName(this.bookName);
            bookInfo.setAuthor(this.author);
            bookInfo.setPrice(this.price);
            this.loading.open();

            if (this.bookId == undefined || this.bookName == '') {
              this.loading.close();
              promptAction.showToast({
                message: '请输入ID或名称',
                duration: 2000,
              });
              return;
            }

            const upsertNum = await CloudDB.upsertRecord(bookInfo);
            this.loading.close();
            if (upsertNum > 0) {
              promptAction.showToast({
                message: '添加成功',
                duration: 2000,
              });
              // 返回首页
              router.back({url:'pages/Index'});
            } else {
              promptAction.showToast({
                message: '添加失败',
                duration: 5000,
              });
            }
            console.log('upsertNum is ' + upsertNum);
          })
      }
    }
    .margin({ top: 20 })
    .padding({ left: 10, right: 10 })
  }
}