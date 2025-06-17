import { generateSprite } from "./generate-sprite"

async function generateItemsSprite() {
  generateSprite("item/*.png").catch(console.error)
}

generateItemsSprite()
