module.exports = function(req, res, next) {
    return next();
    /* if (req.isAuthenticated()) {
            return next();
        } else {
            res.status('401').json('Não autorizado');
        }

        */
};
