import prompt from '@ohos.promptAction';
import { BookInfo } from '../Service/BookInfo';
import { CloudDBService as CloudDB } from '../Service/CloudDBService';
import LoadingDialog from '../component/LoadingDialog';
import router from '@ohos.router';

@Entry
@Component
struct Index {
  @State bookInfoList: Array<BookInfo> = []

  loading: CustomDialogController = new CustomDialogController({
    builder: LoadingDialog(),
    autoCancel: false,
    customStyle: true,
    alignment: DialogAlignment.Center
  })

  async onPageShow() {
    console.info('onPageShow')
    // 初始化
    await CloudDB.init(getContext(this));
    // 查询数据并展示
    this.bookInfoList = await CloudDB.queryRecord();
  }

  build() {
    Column() {
      Row() {
        Button('查询数据', { type: ButtonType.Capsule, stateEffect: true }).backgroundColor(0x317aff).width('40%').margin({top: 10, right: 10})
          .onClick(async () => {
            // 查询数据
            this.bookInfoList = await CloudDB.queryRecord();
          })

        Button('添加数据', { type: ButtonType.Capsule, stateEffect: true }).backgroundColor(0x317aff).width('40%').margin({top: 10})
          .onClick(() => {
            // 添加数据
            router.pushUrl({
              url: "pages/Add"
            })
          })
      }

      Column() {
        List({ space: 5, initialIndex: 0 }) {
          ForEach(this.bookInfoList, (item: BookInfo) => {
            ListItem() {
              Row() {
                Column() {
                  Row() {
                    Text(item.getBookName()).fontSize(16).fontWeight(500).margin({ right: 5 })
                  }

                  Row() {
                    Text("作者：" + item.getAuthor()).fontSize(14).margin({ right: 5 })
                    Divider().vertical(true).margin(5).height(15)
                    Text('￥' + item.getPrice()).fontSize(14)
                  }
                }
                .height(80)
                .alignItems(HorizontalAlign.Start)
                .justifyContent(FlexAlign.Center)
                .layoutWeight(3)

                Column() {
                  Button('删除')
                    .opacity(0.8)
                    .backgroundColor(0xF55A42)
                    .onClick(async () => {
                      // 进行数据删除
                      AlertDialog.show({
                        title: '提示',
                        message: '确认删除吗？',
                        primaryButton: {
                          value: '取消',
                          action: () => {
                            console.info('Cancel delete record.')
                          }
                        },
                        secondaryButton: {
                          value: '确认',
                          action: async () => {
                            this.loading.open();

                            // 删除数据
                            await CloudDB.deleteRecord(item);

                            this.loading.close();
                            prompt.showToast({
                              message: '删除成功',
                              duration: 2000,
                            });
                            // 刷新列表数据
                            this.bookInfoList = await CloudDB.queryRecord();
                          }
                        },
                        cancel: () => {
                          console.info('Closed callbacks')
                        }
                      })
                    })
                }
                .width(50)
                .alignItems(HorizontalAlign.Center)
                .justifyContent(FlexAlign.Center)
                .margin({ right: 10 })
                .layoutWeight(1)
              }
              .padding({ left: 10, right: 10 })
              .height(80)
              .width('100%')

            }.editable(true)
          }, (item: BookInfo) => item.getId())
        }
        .listDirection(Axis.Vertical)
        .height('70%')
        .margin({ top: 10, left: 18 })
        .width('100%')
        .layoutWeight(2)
      }
    }
    .height('100%')
  }
}