
const path = require('path');
const FileFilter = (req, file, callback) => {

    const acceptExt = ['.png', '.jpg', '.jpeg']

    if (!acceptExt.includes(path.extname(file.originalname))) {
        callback({ message: 'Only .pmg , .jpg , .jpeg  files are execepted ' })
    }

    const filesize = parseInt(req.headers["content-length"])

    if (filesize > 1048576) {
        callback({ message: ('File Sixe To Long') })
    }

    callback(null, true)

}

module.exports = FileFilter