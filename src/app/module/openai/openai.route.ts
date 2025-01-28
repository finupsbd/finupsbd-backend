import express from 'express'
import { OpenaiController } from './openai.controller'

const router = express.Router()


// router.post('/assistant', OpenaiController.aiAssistant)
router.post("/assistant/:id/message", OpenaiController.interactWithAssistant);

export const OpenAiRouter = router