/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponses from "../../../utils/sendResponce";
import pdfParse from 'pdf-parse';
import aiModel from "../../../utils/ai/aiModes";
import { personalLoanData } from "../../../damoData/damodata";
import { prisma } from "../../../../app";
import cleanAiResponse from "../../../utils/cleanAiResponse";
import path from "path";
import fs from 'fs';
import Tesseract from "tesseract.js";
import { GoogleGenerativeAI } from '@google/generative-ai'
import multer from "multer";







const getAllApplyedLoans = catchAsync(async (req, res) => {

    const  {prompth}  = JSON.parse(req.body.data)
  
    console.log(prompth)

    const files = req.files as Express.Multer.File[];

    console.log(prompth)

    const multimodalPayload = [
        {
            text: `You are a data‐extraction assistant. and i want ${prompth}` },
        ...files.map(file => ({
            inlineData: {
                data: file.buffer.toString("base64"),
                mimeType: file.mimetype
            }
        }))
    ];



    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent(multimodalPayload);
    const filanOutput = result.response?.candidates?.[0].content.parts[0]

    console.log(filanOutput)



    sendResponses(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Get all applyed Loans from retrive successfully',
        data: filanOutput
    })

});


export const LoansBankController = {
    getAllApplyedLoans
};



   

    // const filePath = path.join(process.cwd(), 'uploads', 'sample.pdf');

    // const readPDF = async () => {
    //   try {
    //     const dataBuffer = fs.readFileSync(filePath);
    //     const data = await pdfParse(dataBuffer);
    //     return data.text
    //   } catch (err) {
    //     console.error('Failed to read or parse PDF:', err);
    //   }
    // };

    // const pdfText = await readPDF()




    



    // const image = async () => {

    //  const doc = await Tesseract.recognize(imagePath, 'ben+eng')
    //     console.log(doc.data.text);
    //     return doc.data.text
    // }

    // const imageData = await image()


    // const result = await aiModel(mainPrompth)

    // console.log(result)

