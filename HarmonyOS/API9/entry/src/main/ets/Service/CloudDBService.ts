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

import {
  AGConnectCloudDB,
  CloudDBZoneConfig,
  CloudDBZone,
  CloudDBZoneQuery
} from '@hw-agconnect/database-ohos';
// @ts-ignore
import schema from './app-schema.json';
import { AGCRoutePolicy } from "@hw-agconnect/core-ohos";
import { BookInfo } from './BookInfo';

export class CloudDBService {
  private static readonly ZONE_NAME = 'QuickStartDemo';
  private static cloudDB: AGConnectCloudDB;
  private static cloudDBZone: CloudDBZone;
  private static isInit: boolean;

  /**
   * 初始化
   *
   * @param context context
   * @returns 是否初始化成功
   */
  public static async init(context: any): Promise<boolean> {
    if (this.isInit) {
      return;
    }
    try {
      // 初始化并获取AGConnectCloudDB
      this.cloudDB = await AGConnectCloudDB.getInstance({
        context: context, // 在eTS页面中通过全局方法getContext(this)获取当前页面关联的Context
        agcRoutePolicy: AGCRoutePolicy.CHINA, // 数据处理位置，CHINA-中国区，GERMANY-德国，RUSSIA-俄罗斯，SINGAPORE-新加坡
        objectTypeInfo: schema
      });

      // 打开存储区
      await this.openZone(this.ZONE_NAME);

      this.isInit = true;
    } catch (e) {
      console.error('init failed. e:' + JSON.stringify(e))
    }
    return Promise.resolve(this.isInit);
  }

  /**
   * 打开存储区
   *
   * @param zoneName 存储区名称
   * @returns
   */
  private static async openZone(zoneName: string): Promise<void> {
    if (this.cloudDBZone) {
      console.log('zone has been closed.')
      return;
    }
    try {
      const cloudDBZoneConfig = new CloudDBZoneConfig(zoneName);
      this.cloudDBZone = await this.cloudDB.openCloudDBZone(cloudDBZoneConfig);
      console.log('[openZone] open zone success.')
    } catch (e) {
      console.error('[openZone] open zone failed. e:' + e);
      console.error(JSON.stringify(e));
    }
  }

  /**
   * 添加数据
   *
   * @param bookInfos BookInfo单个对象或数组
   * @returns 添加成功条数
   */
  public static async upsertRecord(bookInfos: BookInfo | Array<BookInfo>): Promise<number> {
    try {
      const upsertNum = await this.cloudDBZone.executeUpsert(bookInfos);
      console.log('[upsertRecord] upsertNum is ' + upsertNum);
      return upsertNum;
    } catch (e) {
      console.error('[upsertRecord] upsertRecord failed. e:' + JSON.stringify(e));
      return 0;
    }
  }

  /**
   * 删除数据
   *
   * @param bookInfos BookInfo单个对象或数组
   * @returns 删除成功条数
   */
  public static async deleteRecord(bookInfos: BookInfo | Array<BookInfo>): Promise<number> {
    try {
      const deleteNum = await this.cloudDBZone.executeDelete(bookInfos);
      console.log('[deleteRecord] deleteNum is ' + deleteNum);
      return deleteNum;
    } catch (e) {
      console.error('[deleteRecord] deleteRecord failed. e:' + e);
      return 0;
    }
  }

  /**
   * 查询数据
   *
   * @param queryStr 查询条件，可为空
   * @returns 查询数据结果数组
   */
  public static async queryRecord(queryStr?: string): Promise<Array<BookInfo>> {
    try {
      const query = CloudDBZoneQuery.where(BookInfo);
      if (queryStr) {
        query.contains('bookName', queryStr);
      }
      const result = await this.cloudDBZone.executeQuery(query);
      return result.getSnapshotObjects();
    } catch (e) {
      console.error('[queryRecord] queryRecord failed. e:' + JSON.stringify(e));
      return [];
    }
  }
}