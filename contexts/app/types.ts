import { Dispatch, ReactNode } from "react";
import { Tenant } from "../../type/Tenant"

export type DataType = {
    tenant: Tenant | null;
}

export type ActionType = {
    type: Actions;
    payload?: any;
}

export enum Actions {
    SET_TENANT
}

export type ContextType = {
    state: DataType;
    dispatch: Dispatch<ActionType>;
}

export type ProviderType = {
    children: ReactNode
}