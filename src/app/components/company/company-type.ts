export interface Recruit{
  id: number;
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
  creatime: Date;
  creator: string;
  updatime: Date;
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
  creatime: Date;
  creator: string;
  updatime: Date;
  updator: string;
}