const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const app = express();

app.use(bodyParser.json());
app.use('/', router);
let server = app.listen('1230', function (req, res) {
  console.log('Server is up at port 1230');
});
module.exports = server;

const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');
const id3 = require('node-id3');
const cors = require('cors');

app.use(cors());
app.set('view engine', 'ejs');

// Set up MySQL mysql
const mysql = require('mysql2/promise');

let connection;
async function main() {
  try {
     connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: ''
    });
    console.log('Connected to database!');

    // Perform database operations here

    // await connection.end(); // Close connection when done
  } catch (error) {
    console.error('Error connecting to database: ', error);
  }
}


    
// Set up Multer middleware for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

main(); 
const upload = multer({ storage: storage });
app.get('/files', async (req, res) => {
  console.log(req.query);
  try {
    const [rows] = await connection.query('SELECT * FROM files');

    const files = rows.map(row => {
      // Decrypt file contents
      const algorithm = 'aes-256-cbc';
      const key = Buffer.from(row.key, 'hex');
      const iv = Buffer.from(row.iv, 'hex');
      const decipher = crypto.createDecipheriv(algorithm, key, iv);
      const decrypted = Buffer.concat([decipher.update(row.file), decipher.final()]);

      // Create a download link for the file
      const downloadLink = `/download/${row.id}`;
      const filecoverimage = Buffer.from(row.filecoverimage).toString('base64');
      // console.log(row.user_id);
      return {
        id: row.id,
        filename: row.filename,
        filecoverimage: filecoverimage,
        // file: decrypted,
        // downloadLink: downloadLink,
        category: row.category,
        user: row.userid
      };
    });
    
    res.json({
      "files": files  
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/download/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const [rows] = await connection.query('SELECT * FROM files WHERE id = ?', [req.params.id]);

    if (rows.length == 0) {
      res.status(404).send('File not found');
      return;
    }

    const row = rows[0];

    // Decrypt file contents
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(row.key, 'hex');
    const iv = Buffer.from(row.iv, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(row.file), decipher.final()]);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${row.filename}"`);
    res.send(decrypted);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});




app.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    // console.log(req);
    console.log(req.file);
    //  fileCoverImage = req.file.path;
    // const tags = id3.read(fs.readFileSync(fileCoverImage));
    // let filecoverimage;
    // if (tags.image && tags.image.imageBuffer) {
    //   const coverImage = tags.image.imageBuffer;
    //   filecoverimage = Buffer.from(coverImage, 'binary');
    // } else {
    //   console.log('No cover image found.');
      // set default cover image
      const fileName = req.file.originalname;
      const fileExtension = fileName.split('.').pop();
      let defaultCoverImage;
      if(fileExtension.toLocaleLowerCase().includes("pdf"))
        defaultCoverImage = fs.readFileSync('images/PDF.svg');
      else
      if(fileExtension.toLocaleLowerCase().includes("jp"))
        defaultCoverImage = fs.readFileSync('images/jpg.png');
      else
        if(fileExtension.toLocaleLowerCase().includes("png"))
        defaultCoverImage = fs.readFileSync('images/jpg.png');
        else
      if(fileExtension.toLocaleLowerCase().includes("doc"))
        defaultCoverImage = fs.readFileSync('images/docs.png');
        else
      if(fileExtension.toLocaleLowerCase().includes("ppt"))
        defaultCoverImage = fs.readFileSync('images/ppt.png');
      const filecoverimage = Buffer.from(defaultCoverImage, 'binary');

    // Read file contents
    const file = fs.readFileSync(req.file.path);
    // Encrypt file contents
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(file), cipher.final()]);

    // Store file information and encrypted file in database
    const data = {
      filename: req.body.name+'.'+fileExtension,
      filecoverimage,
      file: encrypted,
      key: key.toString('hex'),
      iv: iv.toString('hex'),
      category: req.body.category,
      userid: req.body.userid
    };

    await connection.query('INSERT INTO files SET ?', data);

    res.json({ success: true });
    // res.render('index'); 
  } catch (error) {
    next(error);
  }
});



app.post('/uploadfake', async (req, res, next) => {
  try {
    // // console.log(req);
    // console.log(req.body);
    //   const fileName = req.body.name;
      defaultCoverImage = fs.readFileSync('images/PDF.svg');
      const filecoverimage = Buffer.from(defaultCoverImage, 'binary');

    // Read file contents
    const file = fs.readFileSync("uploads/To-do list - To do.pdf");
    // Encrypt file contents
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(file), cipher.final()]);

    // Store file information and encrypted file in database
    const data = {
      filename: req.body.name+'.'+"pdf",
      filecoverimage,
      file: encrypted,
      key: key.toString('hex'),
      iv: iv.toString('hex'),
      category: req.body.category,
      userid: req.body.user
    };

    await connection.query('INSERT INTO files SET ?', data);

    res.json({ success: true });
    // res.render('index'); 
  } catch (error) {
    next(error);
  }
});
 
app.delete("/deleteall", async (req, res) => { 
  await connection.query('DELETE FROM files');
})
