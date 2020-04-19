export const buildError = (code: Number, message) => {
    return { code, message };
}

export const Errors = {
    NOT_FOUND: buildError(404, 'Entity Not Found'),
    UNAUTHORISED: buildError(401, 'Permission Denied')
}

