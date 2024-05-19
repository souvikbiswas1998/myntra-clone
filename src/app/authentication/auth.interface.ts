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