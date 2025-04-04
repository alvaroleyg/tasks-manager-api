const validatorResult = require('express-validator');

exports.validate = (req, res, next) => {
    const errors = validatorResult.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
