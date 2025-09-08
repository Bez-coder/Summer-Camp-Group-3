import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const router = Router()

fs.mkdirSync(path.resolve('uploads'), { recursive: true })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('uploads'))
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname) || '.jpg'
    cb(null, unique + ext)
  }
})

const upload = multer({ storage })

router.post('/', upload.single('file'), (req, res) => {
  const file = req.file
  if (!file) return res.status(400).json({ message: 'No file uploaded' })
  const base = `${req.protocol}://${req.get('host')}`
  const url = `/uploads/${file.filename}`
  res.json({ url, absoluteUrl: `${base}${url}` })
})

export default router


