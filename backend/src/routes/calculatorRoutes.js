import express from 'express'
import fs from 'fs/promises'
import { fileURLToPath } from 'url';
import path from 'path';
import { calculateCarPrice } from '../services/calculatorService.js'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, '../config/calculator.json');

router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(configPath, 'utf-8')
    res.json(JSON.parse(data))
  } catch (e) {
    res.status(500).json({ error: 'Не вдалося прочитати конфіг' })
  }
})

router.put('/', async (req, res) => {
  try {
    await fs.writeFile(configPath, JSON.stringify(req.body, null, 2))
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ error: 'Не вдалося зберегти конфіг' })
  }
})

router.post('/calculate', async (req, res) => {
  try {
    const result = await calculateCarPrice(req.body)
    res.json(result)
  } catch (e) {
    res.status(500).json({ error: 'Не вдалося розрахувати ціну', details: e.message })
  }
})

export default router