export interface IErrors {
    value: string;
    reason: string;
}
export interface IErrorPayload {
    message: string;
    errors?: IErrors[];
}