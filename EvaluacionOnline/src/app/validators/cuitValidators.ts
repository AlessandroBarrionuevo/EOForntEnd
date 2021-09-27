import { AbstractControl } from '@angular/forms';

export function cuitValidator(control: AbstractControl) {
    const regexCuit = /^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g;

    if(!regexCuit.test(control.value))
        return {cuitValid: true};

    return null;
}