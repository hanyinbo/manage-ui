import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { URL } from '../../config';
import { Result } from '../../system/result/result';
import { Recruit, Company, Position,RecruitDTO,RecruitInfoDTO ,CompanyImg,UploadImg} from './company-type';

const params = new HttpParams()

const headers = new HttpHeaders()
  .set('content-Type', 'application/json;charset=UTF-8"')



@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  constructor(private http: HttpClient) { }

  getRecruitList() {
    return this.http.get<Result<Recruit[]>>(`${URL}/mini/getAllRecruitList`)
  }

  delRecruit(id: bigint) {
    return this.http.delete<Result<Boolean>>(`${URL}/mini/delRecruit/${id}`)
  }
  //添加招聘
  addRecruitInfo(param:Recruit){
     return this.http.post<Result<Boolean>>(`${URL}/mini/addRecruitInfo`,param)
  }
  // 获取招聘详情
  getRecruitData(id:bigint){
    return this.http.get<Result<RecruitDTO>>(`${URL}/mini/getRecruitData/${id}`)
  }
   // 分页获取招聘
   getRecruitOfPage(body: any) {
    return this.http.get<Result<RecruitInfoDTO[]>>(`${URL}/mini/getRecruitOfPage`, { params: body, headers: headers })
  }
  // 修改招聘信息
  updateRecruitInfo(param: RecruitInfoDTO){
    return this.http.put<Result<Boolean>>(`${URL}/mini/updateRecruitInfo`,param)
  }
  // 获取公司列表
  getCompanyList() {
    return this.http.get<Result<Company[]>>(`${URL}/mini/getCompanyList`)
  }
  // 删除公司
  delCompanyById(id: bigint) {
    return this.http.delete<Result<Boolean>>(`${URL}/mini/delCompanyById/${id}`)
  }
  // 添加公司
  addCompany(company: Company) {
    return this.http.post<Result<Boolean>>(`${URL}/mini/addCompany`, company)
  }
  // 获取公司信息
  getCompanyInfo(id: bigint) {
    return this.http.get<Result<Company[]>>(`${URL}/mini/getCompanyInfo/${id}`)
  }
  // 修改公司信息
  updateCompany(param: Company) {
    return this.http.put<Result<Boolean>>(`${URL}/mini/updateCompany`, param)
  }
  // 分页获取公司
  getPageOfCompany(body: any) {
    return this.http.get<Result<Company[]>>(`${URL}/mini/getPageOfCompany`, { params: body, headers: headers })
  }
  // 获取公司图片
  getCompanyImgList(id: bigint){
    return this.http.get<Result<NzUploadFile[]>>(`${URL}/mini/getCompanyImgList/${id}`)
  }
  // 获取职位信息
  getPositionInfo(id: bigint) {
    return this.http.get<Result<Position>>(`${URL}/mini/getPositionInfo/${id}`)
  }
  // 获取职位列表
  getPositionList() {
    return this.http.get<Result<Position[]>>(`${URL}/mini/getPositionList`)
  }
  // 删除职位
  delPositionById(id: bigint) {
    return this.http.delete<Result<Boolean>>(`${URL}/mini/delPositionById/${id}`)
  }
  // 添加职位
  addPosition(position: Position) {
    return this.http.post<Result<Boolean>>(`${URL}/mini/addPosition`, position)
  }
  // 修改职位信息
  updatePosition(param: Position) {
    return this.http.put<Result<Boolean>>(`${URL}/mini/updatePosition`, param)
  }
  // 分页获取职位
  getPageOfPosition(body: any) {
    return this.http.get<Result<Position[]>>(`${URL}/mini/getWxPositionPage`, { params: body, headers: headers })
  }
}
