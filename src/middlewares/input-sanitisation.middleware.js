import HttpError from '../errors/http.error.js';

const valdate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (err) {
        throw new HttpError(400, 'Invalid input data', err.errors);
    }
}

export default valdate;