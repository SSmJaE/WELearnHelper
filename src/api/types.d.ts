export interface IErrorDetail {
    id: string;
    message: string;
}

export interface ICommonResponse<T = null> {
    status: boolean;
    error: IErrorDetail | null;
    data: T;
}
