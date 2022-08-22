import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "./firebase";

import { NFTStorage, File, Blob } from "nft.storage";

export const truncateAddress = (address) => {
  if (!address) return "No Account";

  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );

  if (!match) return address;

  return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => "0x" + Number(num).toString(16);

export const uploadFile = async (path, file, filename) => {
  let extension = file.name.substring(file.name.lastIndexOf("."));

  const storageRef = ref(storage, `${path}/${filename}${extension}`);

  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

// Upload via nft.storage clinet

const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_DOT_STORAGE_API_KEY;

const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
export const nftDotStorage = async (img) => {
  console.log("CALLED  NFT DOT STORAGE");
  try {
    const metadata = await client.store({
      attributes: [
        { trait_type: "Background", value: "Gradient Tres" },
        { trait_type: "Body", value: "Orange Circle" },
        { trait_type: "Face", value: "Smile" },
      ],
      description: "A NFT represent that you are part of CreatorLabs Family",
      name: "SKRT TOKEN",
      image: img,
    });
    return metadata;
  } catch (error) {
    console.log("NFT.PORT UPLOAD ERROR", error);
    return "ERROR_NFT_DOT_STORAGE";
  }
};
