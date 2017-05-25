import { Component, OnInit } from '@angular/core';

import { Branch, Department } from '@cmuh-viewmodel/sample';
import { BannerService } from '@cmuh/core';

import { SampleService } from './sample.service';

@Component({
  selector: 'cmuh-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  private branches: Array<Branch>;
  private departments: Array<Department>;
  private branchNo: number;

  /**
   * constructor 建構函式
   */
  constructor(private sampleService: SampleService,
    private bannerService: BannerService, ) {
    this.branchNo = 1;
  }
  /**
   * angular初始化函式
   */
  ngOnInit() { }

  /**
   * 取得院區
   * @returns {void} 
   */
  public getBranches() {
    this.bannerService.innerHtml = `<div>搜尋院區</div>`;
    this.sampleService.getBranches()
      .subscribe(res => {
        this.branches = res;
      });
  }

  /**
   * 取得院區下的部門
   * @returns {void} 
   */
  private getDepartments() {
    this.bannerService.innerHtml = `<div>搜尋部門</div>`;
    this.sampleService.getDepartments(this.branchNo)
      .subscribe(res => {
        this.departments = res;
      });
  }

}
