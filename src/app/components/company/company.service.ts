import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL} from '../../config';
import { Result } from '../../system/result/result';
import { Company } from './company-type';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }

  getCompanyList(){
    return this.http.get<Result<Company[]>>(`${URL}/mini/getAllCompanyList`)
  }

}
