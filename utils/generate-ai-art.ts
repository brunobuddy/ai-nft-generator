import axios from "axios";

export const generateAiArt = async (prompt: string): Promise<string> => {
  const response = await axios.post(
    "https://api.openai.com/v1/images/generations",
    {
      prompt,
      size: "256x256",
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );

  return response.data.data[0].url;
};
