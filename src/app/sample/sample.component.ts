import { Component, OnInit } from '@angular/core';
import { SampleService } from './sample.service';

@Component({
  selector: 'cmuh-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  private data;
  constructor(private sampleService: SampleService) { }

  ngOnInit() {
  }

  public getData(id: number) {
    this.sampleService.getData(id).subscribe((res) => {
      this.data = res;
    })
  }

}
