import { type TShelf } from "../lib/definitions"
import { Shelf } from "../ui"

export function StartScreen() {
  const shelf: TShelf = [...Array(5).keys()].map(i => ({ content: "locked", id: i }))

  return (
    <div className="start-screen">
      <Shelf shelf={shelf} />
      <div className="title-group">
        <p>Welcome to the</p>
        <h2>Secret Room</h2>
      </div>
      <p>
        This is a memory game. You have to remember the objects in a cabinet and press &ldquo;Ready&rdquo;.
      </p>
      <p>
        Then the lights go out for a second. You need to choose which objects were actually in the cabinet before and which are fake.
      </p>
      <p>Good luck!</p>
      <Shelf shelf={shelf} />
    </div>
  )
}
