export interface ICommonResponse<T = null> {
    status: boolean;
    error?: string;
    data: T;
}
