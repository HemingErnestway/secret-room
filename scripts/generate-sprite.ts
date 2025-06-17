import { glob } from "glob"
import Spritesmith from "spritesmith"
import { writeFileSync } from "fs"

export async function generateSprite(pattern: string) {
  console.log("🔍 Searching for files...")
  const files = await glob(`src/assets/${pattern}`)

  if (files.length === 0) {
    console.error("⚠️ No files found.")
    return
  }

  console.log(`✅ Found ${files.length} files.`)

  Spritesmith.run({ src: files }, (err, result) => {
    if (err) {
      console.error("❌ Spritesmith error:", err)
      return
    }

    const spriteName = `${pattern.split("/")[0]}s-sprite`

    writeFileSync(`src/assets/${spriteName}.png`, result.image)
    writeFileSync(`src/assets/${spriteName}.json`, JSON.stringify(result.coordinates, null, 2))
    console.log("✅ Sprite and JSON generated!")
  })
}
