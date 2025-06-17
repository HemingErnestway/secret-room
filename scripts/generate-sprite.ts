import { glob } from 'glob';
import Spritesmith from 'spritesmith';
import { writeFileSync } from 'fs';

async function generateSprite() {
  console.log('🔍 Searching for PNGs...');
  const files = await glob('src/assets/items/*.png');

  if (files.length === 0) {
    console.error('⚠️ No PNG files found.');
    return;
  }

  console.log(`✅ Found ${files.length} files`);

  Spritesmith.run({ src: files }, (err, result) => {
    if (err) {
      console.error('❌ Spritesmith error:', err);
      return;
    }

    writeFileSync('src/assets/items-sprite.png', result.image);
    writeFileSync('src/assets/items-sprite.json', JSON.stringify(result.coordinates, null, 2));
    console.log('✅ Sprite and JSON generated!');
  });
}

generateSprite().catch(console.error);
