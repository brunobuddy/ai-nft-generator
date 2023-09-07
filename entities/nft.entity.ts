import { BeforeInsert, CaseEntity, Entity, Prop, PropType } from "@casejs/case";

import { generateAiArt } from "../utils/generate-ai-art";
import { pin } from "../utils/pin-to-IPFS";

@Entity({
  nameSingular: "NFT",
  namePlural: "NFTs",
  propIdentifier: "name",
  slug: "nfts",
})
export class Nft extends CaseEntity {
  @Prop({
    type: PropType.Text,
  })
  name: string;

  @Prop({
    type: PropType.Text,
  })
  owner: string;

  @Prop({
    type: PropType.Link,
    options: {
      isHiddenInCreateEdit: true,
    },
  })
  image: string;

  @BeforeInsert()
  async mintNFT() {
    console.log("Before Insert...");

    const generatedImage: string = await generateAiArt(this.name);
    this.image = await pin(generatedImage);
  }
}
