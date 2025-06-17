import { generateSprite } from "./generate-sprite"

async function generateLockedBgSprite() {
  generateSprite("locked-bg/*.png").catch(console.error)
}

generateLockedBgSprite()
