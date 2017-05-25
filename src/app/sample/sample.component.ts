import { Component, OnInit } from '@angular/core';

import { Branch, Department } from '@cmuh-viewmodel/sample';

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
  constructor(private sampleService: SampleService) {
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
    this.sampleService.getBranches()
      .subscribe(res=>{
        this.branches = res;
      });
  }

  /**
   * 取得院區下的部門
   * @returns {void} 
   */
  private getDepartments(){
    this.sampleService.getDepartments(this.branchNo)
      .subscribe(res=>{
        this.departments = res;
      });
  }

}
