import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL} from '../../config';
import { Result } from '../../system/result/result';
import { NavigationImg } from './mini-type';
@Injectable({
  providedIn: 'root'
})
export class MiniProgramsService {

  constructor(private http:HttpClient) { }

  getNavigationList(){
    return this.http.get<Result<NavigationImg[]>>(`${URL}/mini/getNavigationImgList`)
  }

}
