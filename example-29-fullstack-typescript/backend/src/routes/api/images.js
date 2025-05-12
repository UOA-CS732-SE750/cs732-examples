import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { v4 as uuid } from 'uuid';

const router = express.Router();

const upload = multer({
    dest: './temp'
});

/**
 * When we receive a POST to this handler, use Multer to handle the uploaded file.
 * Then, move the uploaded file into the correct place and return a 201 pointing to
 * the newly added image.
 */
router.post('/', upload.single("image"), (req, res) => {

    // TODO Make sure the uploaded file is actually an image!

    const oldPath = req.file.path;
    const ext = req.file.originalname.substring(req.file.originalname.lastIndexOf('.'));
    const newFileName = `${uuid()}${ext}`;
    const newPath = `./public/images/${newFileName}`;

    fs.renameSync(oldPath, newPath);

    res.status(201)
        .header('Location', `/images/${newFileName}`)
        .header('Access-Control-Expose-Headers', 'Location') // CORS stuff
        .send();

});

export default router;