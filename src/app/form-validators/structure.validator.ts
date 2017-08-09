import { AbstractControl, ValidatorFn } from '@angular/forms';

export function StructureValidator(structureRe: Array<RegExp>): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} => {
        const value = control.value;
        var validate: boolean = false;
        if( value === null || value === undefined || value === ''){
            return null
        }else{
            structureRe.forEach(structure => {
                if(structure.test(value)){
                    validate = structure.test(value);
                    return;
                }
            })

            return validate ? null: {'forbiddenStructure': {value}};
        }
    }
}