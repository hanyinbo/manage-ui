export interface Login {
    userName: string;
    password: string;
}

export interface ResponseUtils{
    code: number;
    data: string;
    msg: string;
}