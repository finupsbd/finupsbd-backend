

import catchAsync from "../../utils/catchAsync";
import { OpenaiServices } from "./openai.service";



// const aiAssistant = catchAsync(async (req, res) => {
//   const assistant = await OpenaiServices.createAssistant() 
//   res.status(200).json({
//     success: true,
//     message: "Assistant created successfully",
//     assistantId: assistant.id,
//   });
// });

const interactWithAssistant = catchAsync(async (req, res)=> {
  const { id } = req.params;
  const { message } = req.body;

  const response = await OpenaiServices.interactWithAssistant(id, message);

  res.status(200).json({
    success: true,
    reply: response,
  });
});


export const OpenaiController = {
  interactWithAssistant,
};
