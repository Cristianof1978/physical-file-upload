//modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Grid = require('gridfs-stream');
//const requireDir = require('require-dir');
//const cors = require('cors');

//instanciando a aplicação
    const app = express();

//database
    const MONGO_URI = 'mongodb://localhost:27017/uploads'
    mongoose.connect(MONGO_URI, { useNewUrlParser: true });

//init gfs / stream
    conn.once('open', () => {
        const gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads');
    })

//creat stoage engine
    const storage = new GridFsStorage({
        url: MONGO_URI,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                    return reject(err);
                    }
                    const filename = buf.toString('hex') + path.extname(file.originalname);
                    const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                    };
                    resolve(fileInfo);
                });
            });
        }
    });
    const upload = multer({ storage });

//config
//method-override
    app.use(methodOverride('_method'));
//cors
    //app.use(cors());
//express
    app.use(express.json()); //permite a aplicação trabalhar com json
    app.use(express.urlencoded({ extended: true })); //facilitador de envio de arquivos
//require-dir
    //requireDir('./src/app/models');
//morgan
    app.use(morgan('dev'));

//root routes
    //app.use('/auth', require('./src/app/controllers/userController'));

//server
    const PORT = 3001;
    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));