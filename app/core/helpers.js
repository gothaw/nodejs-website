const getStaticDir = () => {
    if (process.env.NODE_ENV === 'production') {
        return './public'
    } else {
        return './';
    }
}

module.exports.getStaticDir = getStaticDir;