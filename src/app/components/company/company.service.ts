import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL} from '../../config';
import { Result } from '../../system/result/result';
import { Recruit ,Company } from './company-type';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }

  getRecruitList(){
    return this.http.get<Result<Recruit[]>>(`${URL}/mini/getAllRecruitList`)
  }

  delRecruitById(id:number){
    return this.http.delete<Result<Boolean>>(`${URL}/mini/delRecruitById/${id}`)
  }

  // 获取公司列表
  getCompanyList(){
    return this.http.get<Result<Company[]>>(`${URL}/mini/getCompanyList`)
  }
  // 删除公司
  delCompanyById(id:bigint){
    return this.http.delete<Result<Boolean>>(`${URL}/mini/delCompanyById/${id}`)   
  }
  // 添加公司
  addCompany(company: Company){
    return this.http.post<Result<Boolean>>(`${URL}/mini/addCompany`,company)
  }
}
