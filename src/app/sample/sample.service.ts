import { Injectable } from '@angular/core';

import { HttpWrapperService } from '@cmuh/http';
import { UserInfo } from '@cmuh-viewmodel/sample';

import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class SampleService {

  /**
   * constructor建構函式
   */
  constructor(private http: HttpWrapperService) { }

  /**
   * 取得userInfo
   * @param {string} id
   * @returns {Observable<UserInfo>} 
   */
  public getUserInfo(id: string): Observable<UserInfo> {

    let hostname: string = 'http://test.webapp.adcmuh.org.tw/';
    let path: string = 'webapi/propertyManager/getBranches';

    return this.http
      .get(`${hostname}${path}${id}`)
      .map((res) => {
        return res.json();
      });
  }

}