import { Injectable } from '@angular/core';
import { HttpWrapperService } from '@cmuh/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
@Injectable()
export class SampleService {

  constructor(private http:HttpWrapperService) { }

  public getData(id:number):Observable<any>{

    let url = 'http://10.21.11.225/webapi/sample/userInfo/';
    return this.http.get(`${url}${id}`).map((res)=>{
      return res.json();
    })
  }

}
