const multer = require('multer');
const { nanoid } = require('nanoid');

const fileUploader = ({
 destinationFolder = 'avatar',
 prefix = 'POST',
 fileType = 'image'
}) => {
 const storageConfig = multer.diskStorage({
  //configurasi tempat menyimpan file
  destination: (req, file, cb) => {
   cb(null, `${__dirname}/../public/${destinationFolder}`);
  },
  // __dirname string letak file ini ada dimana

  //rename nama file
  filename: (req, file, cb) => {
   const fileExtension = file.mimetype.split('/')[1];

   // ["image","png"]
   // image/png => [image , png]
   //  "POST_AHDK2MJX.png"
   const filename = `${prefix}_${nanoid()}.${fileExtension}`;
   // POST_SGAHDSAJ.png
   cb(null, filename);
  }
 });

 const uploader = multer({
  storage: storageConfig,

  fileFilter: (req, file, cb) => {
   console.log(file);
   // image/png
   if (file.mimetype.split('/')[0] != fileType) {
    return cb(null, false);
   }

   cb(null, true);
  }
 });

 return uploader;
};

const upload = multer({
 limits: {
  fileSize: 10000000 //Byte
 },
 fileFilter: (req, file, cb) => {
  console.log(file);
  // image/png => [image,png]
  const file_type = file.mimetype.split('/')[0];
  const format_file = file.mimetype.split('/')[1];

  if (file_type != 'image' && (format_file != 'jpg' || format_file != 'png')) {
   return cb(null, false);
  }
  cb(null, true);
 }
});

module.exports = { fileUploader, upload };

// prefix untuk mengelompokan ini file apa

// POST
