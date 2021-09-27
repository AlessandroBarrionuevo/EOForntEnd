import { FormGroup } from '@angular/forms';

export function dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
        let f = group.controls[from];
        let t = group.controls[to];
        if (f.value > t.value) {
            return {
                errorMsg: "Fecha inicio tiene que ser menor a fecha fin"
            };
        }
        return {};
    }
}