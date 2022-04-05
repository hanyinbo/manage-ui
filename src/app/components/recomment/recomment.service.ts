import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL} from '../../config';
import { Result } from '../../system/result/result';
import { Recomment } from './recomment-type';

@Injectable({
  providedIn: 'root'
})
export class RecommentService {

  constructor(private httpClient: HttpClient) { }

  getRecommendList(){
    return this.httpClient.get<Result<Recomment[]>>(`${URL}/mini/getRecommendList`)
  }
}
