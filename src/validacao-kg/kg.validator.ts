import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@Injectable()
@ValidatorConstraint({ async: true })
export class QuiloValidator implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean {
        const valoresValidos = [1, 2, 5];
        return valoresValidos.includes(value);
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        return `O valor informado deve ser 1, 2 ou 5.`;
    }
}

export const QuiloValido = (opcoesValidacao?: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesValidacao,
            constraints: [],
            validator: QuiloValidator,
        });
    }
}
