import { Injectable } from '@angular/core';
import { HttpWrapperService } from '@cmuh/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
@Injectable()
export class SampleService {

  constructor(private http:HttpWrapperService) { }

  public getData(id:number):Observable<any>{
    return this.http.get(`http://10.21.11.225/WebApi/AppPortal/appStore/GetAppInfos/${id}`).map((res)=>{
      return res.json();
    })
  }

}
