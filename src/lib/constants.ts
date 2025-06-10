import emojiData from "../../emoji-objects.json"
import { type Item } from "./definitions"
import { parseEmojis } from "./functions"

export const EMOJI_OBJECTS: Item[] = parseEmojis(emojiData)
