export interface Brokerage{
  id: bigint;
  cusName: string;
  cusId: bigint;
  companyName: string;
  companyId: bigint;
  brokerage: number;
  isSettle: boolean;
  recommentName: string;
  recommentId: bigint;
  interviewTime: Date;
  inductionTime: Date;
  leaveOfficeTime: Date;
  status: number
  delFlag: number;
  createTime: Date;
  creator: string;
  updateTime: Date;
  updator: string;
}
