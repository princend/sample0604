import { Component, OnInit } from '@angular/core';

import { UserInfo } from '@cmuh-viewmodel/sample';

import { SampleService } from './sample.service';

@Component({
  selector: 'cmuh-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  private data;
  
  /**
   * constructor 建構函式
   */
  constructor(private sampleService: SampleService) { }
  /**
   * angular初始化函式
   */
  ngOnInit() { }

  /**
   * 取得userInfo
   * @param {string} id
   * @returns {void} 
   * 
   */
  public getUserInfo(id: string) {

    this.sampleService.getUserInfo(id)
      .subscribe((res: UserInfo) => {
        this.data = res;
      });
  }

}
