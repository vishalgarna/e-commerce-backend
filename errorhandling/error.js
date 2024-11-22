

const errhandling = (err, req, res, next) => {
    console.log(err);

    err.message = err.message || 'Server Error';
    err.status = err.status || 500

    if (err.status === 400) {
        return res.status(err.status).send({
            message: err.message || 'Bad Request'
        });
    }


    if (err.status === 404) {
        return res.status(err.status).send({
            message: err.message || 'Page Not Found'
        });
    }

    if (err.status === 500) {
        return res.status(err.status).send({
            message: err.message || 'Internal Server Error'
        });
    }
    if (err.status === 503) {
        return res.status(err.status).send({
            message: err.message || 'Service Unavailable'
        });
    }

    if (err.status === 504) {
        return res.status(err.status).send.json({
            message: err.message || 'Gateway Timeout'
        });
    }

    return res.status(err.status).send({ message: err.message })
}

module.exports = errhandling;