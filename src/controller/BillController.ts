import { GoogleGenerativeAI } from "@google/generative-ai";
require('dotenv').config();
export class BillController {
  async save(image: string) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      "what is the measurement? I need just the numbers as an answer",
      {
        inlineData: {
          data: image,
          mimeType: "image/png",
        },
      },
    ]);
    console.log(result.response.text());
    return;
  }
}
