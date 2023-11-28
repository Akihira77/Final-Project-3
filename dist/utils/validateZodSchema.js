export function validateZodSchema(schema, data) {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
        return {
            success: false,
            errors: validationResult.error.issues.map(({ path, message }) => ({
                [String(path)]: message,
            })),
        };
    }
    return { success: true, errors: [] };
}
//# sourceMappingURL=validateZodSchema.js.map