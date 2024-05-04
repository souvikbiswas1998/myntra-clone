import { FormControl } from "@angular/forms";

export interface Authentication {
    email?: FormControl<string | null>;
    password?: FormControl<string | null>;
    name?: FormControl<string | null>;
    phoneNumber?: FormControl<number | null>;
}