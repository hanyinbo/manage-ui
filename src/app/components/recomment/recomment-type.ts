export interface Recomment{
    id: bigint;
    customName: string;
    telephone: string;
    gender: number;
    intentionCompany: string;
    companyId: bigint;
    agreeInterviewTime: Date;
    interviewTime: Date;
    inductionTime: Date;
    leaveOfficeTime: Date;
    status: number;
    recommentName: string;
    recommentId: bigint;
    remark: string;
    createTime: Date;
    creator: string;
    updateTime: Date;
    updator: string;
}