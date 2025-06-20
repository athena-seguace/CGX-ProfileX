import Joi, { SchemaMap, CustomHelpers } from "joi";
import { ValidatorSignature, IValidatorResolve } from "../types/index.types";
import dataPolicyRules from "../config/dataPolicy";


const generateValidator = <IbDR, IbD>(
    schemaMap: SchemaMap<IbDR, true>
): ValidatorSignature<IbDR, IbD> => {
    let schema = Joi.object<IbDR>(schemaMap).unknown(false);

    return (data: IbDR): IValidatorResolve<IbD> => {
        let { value, error } = schema.validate(data);

        if (error === undefined) {
            return {
                safe: true,
                data: value as IbD,
            }
        }

        return {
            safe: false,
            errors: error.details.map((errorItem) => errorItem.message)
        }
    }
}

const _checkRegex = (regex: RegExp) => {
    return (value: string, helpers: CustomHelpers) => {
        if (!regex.test(value)) {
            return helpers.error("string.invalidRegex");
        }

        return value;
    }
}

const fieldSchemaGeneric = {
    text: (
        tag: string,
        min: number = dataPolicyRules.default.string.minLength,
        max: number = dataPolicyRules.default.string.maxLength,
    ) =>
        Joi.string()
            .trim()
            .min(min)
            .max(max)
            .required()
            .messages({
                'string.base': `<${tag}> must be a string.`,
                'string.empty': `<${tag}> cannot be empty.`,
                'string.min': `<${tag}> must be at least {#limit} characters long.`,
                'string.max': `<${tag}> must be at most {#limit} characters long.`,
                'any.required': `<${tag}> is required.`,
            }),
}

const fieldSchemaParticular = {
    user: {
        name:
            fieldSchemaGeneric.text(
                "name",
                dataPolicyRules.user.name.minLength,
                dataPolicyRules.user.name.maxLength
            ),
        email:
            Joi.string()
                .trim()
                .min(dataPolicyRules.user.email.minLength)
                .max(dataPolicyRules.user.email.maxLength)
                .custom(_checkRegex(dataPolicyRules.user.email.regex))
                .required()
                .messages({
                    'string.base': `<email> must be a string.`,
                    'string.empty': `<email> cannot be empty.`,
                    'string.min': `<email> must be at least {#limit} characters long.`,
                    'string.max': `<email> must be no longer than {#limit} characters.`,
                    'string.invalidRegex': `<email> is not valid.`,
                    'any.required': `<email> is required.`,
                }),
        passwordStrong:
            Joi.string()
                .trim()
                .min(dataPolicyRules.user.password.minLength)
                .max(dataPolicyRules.user.password.maxLength)
                .custom(_checkRegex(dataPolicyRules.user.password.regex))
                .required()
                .messages({
                    'string.base': `<password> must be a string.`,
                    'string.empty': `<password> cannot be empty.`,
                    'string.min': `<password> must be at least {#limit} characters long.`,
                    'string.max': `<password> must be no longer than {#limit} characters.`,
                    'string.invalidRegex': `<password> must be of proper format.`,
                    'any.required': `<password> is required.`
                }),
        passwordAny:
            Joi.string()
                .trim()
                .min(dataPolicyRules.user.password.minLength)
                .max(dataPolicyRules.user.password.maxLength)
                .required()
                .messages({
                    'string.base': `<password> must be a string.`,
                    'string.empty': `<password> cannot be empty.`,
                    'string.min': `<password> must be at least {#limit} characters long.`,
                    'string.max': `<password> must be no longer than {#limit} characters.`,
                    'any.required': `<password> is required.`
                }),
        bio:
            fieldSchemaGeneric.text(
                "bio",
                dataPolicyRules.user.bio.minLength,
                dataPolicyRules.user.bio.maxLength
            ),
    },
};

export default generateValidator;
export { fieldSchemaGeneric, fieldSchemaParticular };

