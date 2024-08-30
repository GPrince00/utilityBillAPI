import { GoogleGenerativeAI } from "@google/generative-ai";
import { AppDataSource } from "../data-source";
import { Bill } from "../entity/Bill";
require("dotenv").config();
export class BillController {
  private billRepository = AppDataSource.getRepository(Bill);

  async save(bill: Bill) {
    const billSaved = await this.billRepository.save(bill);

    return billSaved;
  }

  async measure(image: string) {
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

    return result.response.text();
  }
}
