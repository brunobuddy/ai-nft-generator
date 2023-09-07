const axios = require("axios");
const fs = require("fs");
const pinataSDK = require("@pinata/sdk");

export const pin = async (url: string): Promise<string> => {
  const imagePath: string = await downloadFile(url, "storage/file.png");

  console.log("File downloaded !!");

  const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

  const stream = fs.createReadStream(imagePath);
  const pinataRes = await pinata.pinFileToIPFS(stream, {
    pinataMetadata: {
      name: "NFT art",
    },
  });

  return "ipfs://" + pinataRes.IpfsHash;
};

const downloadFile = async (url: string, path: string): Promise<string> => {
  const res = await axios.get(url, { responseType: "stream" });

  return new Promise((resolve, reject) => {
    res.data
      .pipe(fs.createWriteStream(path))
      .on("error", reject)
      .once("close", () => resolve(path));
  });
};
