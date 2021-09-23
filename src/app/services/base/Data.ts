export enum DataState
{
    LOADING,
    LOADED,
    ERROR
}


export interface AppData<T>
{
    dataState : DataState,
    data?:T,
    errorMessage?:string
}
