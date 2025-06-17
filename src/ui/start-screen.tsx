import { MOCK_SHELF } from "../lib/constants"
import { Shelf } from "../ui"

export function StartScreen() {

  return (
    <div className="start-screen">
      <Shelf shelf={MOCK_SHELF} />
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
      <Shelf shelf={MOCK_SHELF} />
    </div>
  )
}
