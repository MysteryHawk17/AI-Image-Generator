import express from "express"
import * as dotenv from "dotenv"
import {Configuration,OpenAIApi} from "openai"

dotenv.config();

const router=express.Router();


const configutaion=new Configuration({
    apiKey:process.env.OPENAI_API_KEY
})
 
const openai =new OpenAIApi(configutaion);

router.get("/",(req,res)=>{
    res.send("Hello from DALLE")
})
router.post('/',async (req, res) => {
    try { 
      const { prompt } = req.body;
      console.log(prompt);
      try {
        const aiResponse = await openai.createImage({
            prompt, 
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
          });
        //   console.log(aiResponse);
             const image = aiResponse.data.data[0].b64_json;
     
      res.status(200).json({ photo: image });
      } catch (error) {
        console.log("Error in open ai")
        console.log(error.message);
      }
       
   
    } catch (error) {
      console.error(error);
      res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
  });
export default router