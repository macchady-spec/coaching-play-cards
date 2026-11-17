'use strict'

// The five original Cluj beats are shared, including 4's reversal to 1.
// Coordinates are feet. The basket is at (25, 5.25) and the foul line is y=19.
function clujStagger(reset) {
  function beat(title, cue, previous, movement, ball = previous.holder, timing = {}) {
    return {
      title, cue, holder: ball,
      p: previous.p.map((position, index) => movement[actorIds[index]] || position),
      ...timing
    }
  }

  const reversal = reset[reset.length - 1]
  const plant = beat('5 and 2 build the stagger',
    '3 leaves the right corner for the opposite wing on one diagonal. Inside, 5 plants first. Outside, 2 plants second. As 3 clears X3’s high shoulder, 4 walks toward the ball and 1 holds the dribble.',
    reversal, {
      o2:[9,24.0], o3:[32,13.67], o4:[30,31.8], o5:[17.4,19.35],
      x1:[37,30.7], x2:[9.5,21.2], x3:[35.4,10.2], x4:[30,27.7], x5:[16.5,16.7]
    }, 0, {curves:{6:[9.7,17.4],7:[43,2]}, windows:{2:[.20,1],1:[0,.78],4:[0,.78]}})

  const cross = beat('3 brushes the first screen as 4 approaches',
    '3 crosses the paint and runs off 5 toward 2. Both screeners hold their feet until 3 passes. On the right, 4 comes toward X1’s inside shoulder as if to screen 1 toward the middle.',
    plant, {
      o3:[13,24.07], o4:[33.5,30.8],
      x1:[37.5,30.2], x2:[7.6,22.2], x3:[20.1,18.8], x4:[32.1,27.6], x5:[17.6,16.9]
    }, 0, {screens:[4,1]})

  const exits = {o3:[4,29], x3:[12.1,22.3]}
  const coversExit = {...exits, x2:[5.8,26.5]}
  const exitTiming = {curves:{7:[18.8,25.2]}, screens:[1]}

  const shooter = beat('X3 trails and nobody takes 3',
    '3 clears 2’s outside shoulder above the break. X3 is still inside the stagger and X2 stays with 2. 1 sees the open left wing before starting the drive.',
    cross, {...exits, o4:[35.2,30.4], x1:[37.9,30.4], x2:[9.8,22]}, 0, exitTiming)
  const catchThree = beat('Throw across to 3',
    '1 passes across the top to 3 with feet ready. 5 stays high and 2 holds space below the pass. If a defender arrives in time, 3 can move the ball.',
    shooter, {x3:[10.6,27.4]}, 2, {pass:[.06,.78], curves:{7:[13.8,27]}})

  const solid = beat('X1 sits on the empty side',
    'X2 picks up 3 as X3 takes 2. X1 shades to 1’s right to close the reject. 4 plants on the inside, leaving 1 room to come across 4’s high shoulder toward the middle.',
    cross, {...coversExit, o4:[35.2,30.4], x1:[39.6,30.3], x4:[31.1,26.1]}, 0,
    {...exitTiming, screens:[1,3]})
  const useScreen = beat('Use 4’s screen toward the middle',
    '1 rubs across 4’s shoulder. X1 goes over and trails. X4 backs toward the foul line to protect the rim. 4 holds the screen until 1 is clear, then pops behind the ball.',
    solid, {
      o1:[30.7,26], o2:[11.2,22.1], o5:[17.3,24.2],
      x1:[34,32.5], x3:[12.1,20.2], x4:[29.2,17.8], x5:[18.5,21]
    }, 0, {curves:{0:[32.5,35.5],5:[38.8,36.7]}, screens:[3]})
  const pullUp = beat('Take the pull-up above the drop',
    'X4 stays deep and X1 is still behind. 1 can stop in balance just above the free-throw line. 4 is back out at the right slot if X4 climbs to challenge.',
    useScreen, {o1:[28.9,21.2], o4:[37,30.5], x1:[32,24.7], x4:[28.9,15.6]})

  const ghost = beat('X1 leans middle as 4 ghosts',
    'X2 takes 3 on the exit and X3 takes 2. X1 leans toward the expected screen. 4 veers out before contact. With 3 across the floor, 1 can reject to the empty right side.',
    cross, {...coversExit, o4:[31.1,32], x1:[36.3,31], x4:[33.5,27.8]}, 0,
    {...exitTiming, curves:{...exitTiming.curves,3:[35.4,30]}})

  const driveSpacing = {
    o1:[40.6,20.6], o2:[11.2,22.1], o4:[30.4,33], o5:[22.7,26.6],
    x1:[39.3,24.2], x3:[12.1,20.2], x4:[31,29.3]
  }
  const turnCorner = beat('1 turns the corner. Find X5.',
    '1 gets a shoulder past X1. 3 stays wide left, 2 holds the wing, 5 lifts toward the slot, and 4 stays behind the ball. X5 follows 5 high. There is room at the rim.',
    ghost, {...driveSpacing, x5:[22.8,23.7]}, 0, {curves:{0:[43.1,29]}})
  const finish = beat('Finish on the right',
    '1 bends back toward the rim ahead of the trailing X1. X5 stayed high with 5 and X4 stayed with the pop. Keep the ball and finish on the right side.',
    turnCorner, {o1:[28.7,7.6], x1:[32.5,11]}, 0, {curves:{0:[38.7,12],5:[38.9,15]}})

  const sink = beat('X5 leaves the high slot early',
    'As 1 rejects, X5 sees the gap and drops off 5. 5 lifts into 1’s view above the foul line. 4 stays higher and 3 and 2 keep their defenders on the left.',
    ghost, {...driveSpacing, x5:[27.8,13.9]}, 0, {curves:{0:[43.1,29]}})
  const help = beat('X5 gets between 1 and the rim',
    '1 draws X5 across to the right lane. A layup would run into the helper’s chest. 5 shows both hands above the foul line and has a clear passing lane.',
    sink, {o1:[35.4,12.2], x1:[38.3,16.4], x5:[32.2,11.1]}, 0, {curves:{0:[39.4,14.6]}})
  const hitFive = beat('Pass back to 5',
    '1 delivers to the player X5 left. 5 catches at the high slot with time to shoot if that is their range or to attack X5’s long recovery.',
    help, {x5:[28.8,16.3]}, 4, {pass:[.05,.78]})

  const twoOnBall = beat('X4 and X1 both follow 1',
    '1 rejects right. X4 steps up outside the lane to contain and X1 trails the ball. 4 has popped behind both defenders. Turn and find 4 before driving any deeper.',
    ghost, {...driveSpacing, o1:[40.5,24.3], x1:[37.6,25.7], x4:[39.6,20.8], x5:[22.8,23.7]}, 0,
    {curves:{0:[42.2,29]}})
  const hitFour = beat('Throw back to the ghost',
    '4 catches at the top with X4 still on the right side. Shoot if set, or attack the recovering defender. 5 stays left of the catch and leaves 4 room to play.',
    twoOnBall, {x1:[43,26.7], x4:[35.9,24.8]}, 3, {pass:[.44,.92], windows:{5:[0,.40]}, curves:{5:[39.3,30]}})

  function read(id, label, ending, stops) {
    return {id, label, frames:[...reset, plant, cross, ...ending], stops, headings:[]}
  }
  return {
    id:'stagger', name:'Cluj stagger finish',
    timeout:'Three, straight off five then two. Four, screen or ghost. One, see three first, then read the empty right side.',
    matchup:'Put a shooter at 3 and a downhill handler at 1. Start 4 toward the ball while 3 crosses the lane. After the stagger, keep the other four above the foul line so the defender who helps has a longer recovery.',
    notes:'The opening is the Cluj teaching sequence. This stagger finish is the coach’s addition. FIBA describes Unicaja combining a stagger and ghost screens in another set. The reactions here are drawn practice examples.',
    links:[
      ['FIBA · The original Cluj inverted screen and flare','https://www.fiba.basketball/en/news/bcl-21-22-news-the-big-bucket-a-quicker-look-at-u-bt-cluj-napoca'],
      ['FIBA · Unicaja combines stagger and ghost screens against Dijon','https://www.fiba.basketball/en/news/bcl-22-23-news-tactics-board-qualified']
    ],
    headings:['Choose the matchup','2 screens for 4','2 flares off 5','The defense recovers','4 reverses to 1'],
    options:[
      read('reject','4 ghosts · X1 leans middle → reject right',[ghost,turnCorner,finish],[4,7,8]),
      read('shooter','X3 trails the stagger → hit 3',[shooter,catchThree],[4,7]),
      read('screen','X1 closes the reject → use 4’s screen',[solid,useScreen,pullUp],[4,7,8]),
      read('help','1 rejects · X5 sinks → find 5',[ghost,sink,help,hitFive],[4,7,9]),
      read('pop','1 rejects · X4 contains → throw back to 4',[ghost,twoOnBall,hitFour],[4,7,8])
    ]
  }
}
