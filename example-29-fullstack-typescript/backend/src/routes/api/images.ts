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

    // !!! TypeScript !!!
    // This is called a type guard. It checks if req.file is defined.
    // You should always check if req.file is defined before using it, even in JS.
    // In TS, doing this allows TS to automatically 'narrow the type' from `Express.Multer.File | undefined` to `Express.Multer.File`
    if (!req.file) {
        return res.status(400).send("No file uploaded or file is not an image.");
    }

    const oldPath = req.file.path;
    const ext = req.file.originalname.substring(req.file.originalname.lastIndexOf('.'));
    const newFileName = `${uuid()}${ext}`;
    const newPath = `./public/images/${newFileName}`;

    fs.renameSync(oldPath, newPath);

    return res.status(201)
        .header('Location', `/images/${newFileName}`)
        .header('Access-Control-Expose-Headers', 'Location') // CORS stuff
        .send();

});

export default router;