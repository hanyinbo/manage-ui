export interface Recomment{
    id: bigint;
    customName: string;
    telephone: string;
    gender: number;
    intentionCompany: string;
    companyId: bigint;
    position: string;
    agreeInterviewTime: Date;
    interviewTime: Date;
    inductionTime: Date;
    leaveOfficeTime: Date;
    status: number;
    recommentName: string;
    recommentId: bigint;
    recruitId: bigint;
    remark: string;
    createTime: Date;
    creator: string;
    updateTime: Date;
    updator: string;
}

export interface RecuitPosition{
    id: bigint;
    positionName: string;
    recruitId: bigint;
    companyId: bigint;
    remark:string;
    createTime: Date;
    creator: string;
    updateTime: Date;
    updator: string;
}