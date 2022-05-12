import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { URL } from '../../config';
import { Result } from '../../system/result/result';
import { Recomment ,RecuitPosition } from './recomment-type';


const headers = new HttpHeaders()
  .set('content-Type', 'application/json;charset=UTF-8"')

@Injectable({
  providedIn: 'root'
})
export class RecommentService {

  constructor(private httpClient: HttpClient) { }

  // 获取报备列表
  getRecommentList() {
    return this.httpClient.get<Result<Recomment[]>>(`${URL}/mini/getRecommentList`)
  }
  // 获取报备详情
  getRecommentById(id: bigint) {
    return this.httpClient.get<Result<Recomment[]>>(`${URL}/mini/getRecommentById/${id}`);
  }
  // 删除报备
  delRecomment(id: bigint) {
    return this.httpClient.delete<Result<Boolean>>(`${URL}/mini/delRecomment/${id}`);
  }
  // 修改报备
  updateRecomment(param: Recomment) {
    return this.httpClient.put<Result<Boolean>>(`${URL}/mini/updateRecomment`, param);
  }
  // 新增报备
  addRecomment(param:Recomment){
     return this.httpClient.post<Result<Boolean>>(`${URL}/mini/addRecomment`,param);
  }
  // 分页获取全部报备信息
  getRecommentOfPage(body: any) {
    return this.httpClient.get<Result<Recomment[]>>(`${URL}/mini/getRecommentOfPage`, { params: body, headers: headers });
  }
  // 分页获取未面试报备信息
  getRecommentNotInterview(body: any) {
    return this.httpClient.get<Result<Recomment[]>>(`${URL}/mini/getRecommentNotInterview`, { params: body, headers: headers });
  }
  // 分页获取已面试报备信息
  getRecommentOkInterview(body: any) {
    return this.httpClient.get<Result<Recomment[]>>(`${URL}/mini/getRecommentOkInterview`, { params: body, headers: headers })
  }
  // 分页获取已入职报备信息
  getRecommentInduction(body: any) {
    return this.httpClient.get<Result<Recomment[]>>(`${URL}/mini/getRecommentInduction`, { params: body, headers: headers })
  }
  // 分页获取已离职报备信息
  getRecommentLeaveOffice(body: any) {
    return this.httpClient.get<Result<Recomment[]>>(`${URL}/mini/getRecommentLeaveOffice`, { params: body, headers: headers })
  }
  // 变更面试
  changeInterviewStatus(body: Array<bigint>){
     return this.httpClient.put<Result<Boolean>>(`${URL}/mini/changeInterviewStatus`,body);
  }
  // 变更入职状态
  changeInductionStatus(body: Array<bigint>) {
    return this.httpClient.put<Result<Boolean>>(`${URL}/mini/changeInductionStatus`, body);
  }
  // 变更离职状态
  changeLeaveOfficeStatus(body: Array<bigint>){
    return this.httpClient.put<Result<Boolean>>(`${URL}/mini/changeLeaveOfficeStatus`, body);
  }
  // 根据公司ID获取招聘岗位
  getRecruitPositionByCompanyId(companyId:bigint){
    return this.httpClient.get<Result<RecuitPosition[]>>(`${URL}/mini/getRecruitPositionByCompanyId/${companyId}`)
  }
}
