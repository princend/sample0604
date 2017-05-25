import { Injectable } from '@angular/core';

import { HttpWrapperService } from '@cmuh/http';
import { Branch, Department } from '@cmuh-viewmodel/sample';

import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class SampleService {

  private hostname: string = 'http://test.his.cmuh.org.tw/webapi/sample/'; 
  /**
   * constructor建構函式
   */
  constructor(private http: HttpWrapperService) { }

  /**
   * 取得院區
   * @returns {Observable<Branch[]>} 
   */
  public getBranches(): Observable<Branch[]>{
    let path: string = 'getBranches';
    return this.http
      .get(`${this.hostname}${path}`)
      .map((res) => {
        return res.json();
      });
  }

  public getDepartments(branchNo: number): Observable<Department[]>{
    let path: string = 'getDepartNameList/';
    return this.http
      .get(`${this.hostname}${path}${branchNo}`)
      .map(res=>{
        return res.json();
      });
  }

}