import { FormControl } from "@angular/forms";

export interface AuthenticationForm {
    email?: FormControl<string | null | undefined>;
    password?: FormControl<string | null | undefined>;
    name?: FormControl<string | null | undefined>;
    phoneNumber?: FormControl<number | null | undefined>;
}

export interface Authentication {
    email?: string | null | undefined;
    password?: string | null | undefined;
    name?: string | null | undefined;
    phoneNumber?: number | null | undefined;
}
export interface LoginApiResponse {
    name: string;
    email: string;
    auth_type: string;
    user_type: string;
    last_login: string;
    is_registered: boolean;
    address: any[]; // Address can be of various formats, keep it generic
    token: string;
}