export interface Recruit{
  id: bigint;
  companyName: string;
  address: string;
  interviewAddress: string;
  industry: string;
  region: string;
  position: string;
  money: number;
  number: number;
  companyIntroduce: string;
  welfare: string;
  jobRequire: string;
  companyImgUrl: string;
  createTime: Date;
  creator: string;
  updateTime: Date;
  updator: string;
}

export interface Company{
  id: bigint;
  companyName: string;
  companyCode: string;
  introduce: string;
  address: string;
  industry: string;
  region: string;
  delFlag: number;
  createTime: Date;
  creator: string;
  updateTime: Date;
  updator: string;
}
export interface Position{
  id: bigint;
  positionName: string;
  positionCode: string;
  delFlag: number;
  createTime: Date;
  creator: string;
  updateTime: Date;
  updator: string;
}

export interface RecruitDTO{
  id: bigint;
  companyName: string;
  companyId: bigint;
  interviewAddress: string;
  money: number;
  number: number;
  welfare: string;
  jobRequire: string;
  company: Company;
  wxPositionList: Array<Position>;
}


export interface RecruitInfoDTO{
  id: bigint;
  companyName: string;
  companyId: bigint;
  industry: string;
  region: string;
  address: string
  interviewAddress: string;
  money: number;
  number: number;
  wxPositionList: Array<string>;
  welfare: string;
  jobRequire: string;
  createTime: Date;
}