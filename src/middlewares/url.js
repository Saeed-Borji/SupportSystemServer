const urlUtils = (req, res, next) => {
    req.getFullPath = () => `${req.protocol}://${req.get('host') + req.baseUrl + req.path}`
    req.getPath = () => `${req.baseUrl + req.path}`
    return next();
};

export default urlUtils