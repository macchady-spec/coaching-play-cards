'use strict'
const actorIds = ['o1','o2','o3','o4','o5','x1','x2','x3','x4','x5']
// An authored continuation of the Cluj switch; frames before the paint touch come from CoachOS.
function huntAndRotate(switchFrames) {
  const turns = [...switchFrames]
  function add(cue, changes, holder, pass) {
    const prev = turns[turns.length-1]
    turns.push({cue, p:prev.p.map((p,i)=>changes[actorIds[i]] ?? p), holder, pass})
  }
  add('4 beats X2 into the paint. X3 leaves corner 3 to get between 4 and the rim. 3 holds the corner, 1 holds the high outlet and neither weak-side player cuts into the drive.',
    {o4:[26.3,10.6],x2:[29.8,14.6],x3:[29.3,8.2],x1:[40,21]},3)
  add('4 passes to 3. X1 closes down from the high outlet and takes away the immediate corner three. X3 turns back out of the paint to pick up 1. Watch how much farther X3 has to run.',
    {o4:[25.4,11],x1:[43.9,10.1],x3:[32.8,17.5],x2:[27.8,13.5]},2,[.07,.82])
  add('3 makes the extra pass before X3 can recover. 1 catches above the break ready to shoot. If X3 arrives under control, 1 swings the ball or attacks an exposed hip.',
    {x1:[44.3,9.3],x3:[35.4,25.6]},0,[.09,.85])
  return turns
}
