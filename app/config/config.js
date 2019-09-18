const config = {
    port: 9273,
    mysql: {
        host: '119.23.208.134',
        user: 'zbowen',
        password: 'bowen350',
        database: 'bank_ocr'
    },
    isInit: false,
    session_signed_key: 'session@&',
    session_config: {
        key: 'koa:sess',
        maxAge: 86400000,
        autoCommit: true, 
        overwrite: true, 
        httpOnly: true, 
        signed: true, 
        rolling: false, 
        renew: false, 
    }
}

module.exports = config;