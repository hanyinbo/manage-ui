export interface Recruit{
  id: bigint;
  companyName: string;
  address: string;
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