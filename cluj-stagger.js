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
    cross, {...exits, o4:[35.2,29.1], x1:[38.2,29.5], x2:[9.8,22]}, 0, exitTiming)
  // 3 turns the corner of the second screen. The earlier exit is nearly 32 ft
  // out; all three catches use the same lead pass to a spot near the left arc.
  const catchSpacing = {
    o2:[12,31.4], o3:[6,20.5], o4:[25,32.5], o5:[19.8,22.2],
    x1:[38.8,29.4], x2:[13.5,28.6]
  }
  function wingCatch(title, cue, defense, closerPath) {
    return beat(title, cue, shooter, {...catchSpacing, ...defense}, 2, {
      pass:[.19,1], leadPass:true, watch:[7],
      curves:{1:[8,29], 2:[2.9,24.3], 3:[31.7,33.2], 6:[8.4,16.7], 7:closerPath, 8:[29.8,24.6]},
      windows:{1:[.04,.86], 2:[0,.95], 3:[.48,.99], 6:[.11,.76], 7:[.13,1]}
    })
  }
  const late = wingCatch('Catch · X3 is still chasing',
    '3 comes back toward the arc for 1’s pass. X3 is still above the catch and cannot contest an immediate release. 4 has lifted to the top. If this is 3’s practiced range, shoot now.',
    {x3:[9.2,26.6], x4:[26.7,27.1], x5:[19.1,20.1]}, [11,29.2])
  const jumper = beat('3 shoots off the catch',
    '3 goes straight up before X3 can close the gap. 1 stays high for safety and 4 balances the top. The board shows the shot attempt.',
    late, {x3:[8.4,23.7]}, 2, {shot:[.06,.95]})

  const hard = wingCatch('Catch · X3 is running high',
    'X3 sprints across 3’s high shoulder to take away the shot. The baseline side is open and X5 stays high with 5. Rip the ball low and take the first dribble past X3.',
    {x3:[6.6,23], x4:[26.7,27.1], x5:[19.1,20.1]}, [9.5,29.5])
  const beatCloseout = beat('Attack the baseline shoulder',
    '3 beats X3 on the baseline side. X3 runs past the catch and turns to chase. 2 stays lifted, 4 holds the top and X5 is still attached to 5. The next open space is toward the rim.',
    hard, {o3:[9.1,12.4], x3:[5.8,15.9], x5:[19.2,19.9]}, 2,
    {curves:{2:[5.1,16.2], 7:[3.8,20.9]}, watch:[7,9]})
  const rim = beat('3 reaches the near side of the rim',
    'No low defender gets across. 3 turns the corner for a left-side layup. If X5 had stepped across earlier, 5 would be the outlet above the lane.',
    beatCloseout, {o3:[21.9,7.4], x3:[17.6,10.4], x5:[20.1,17.1]}, 2,
    {curves:{2:[14.3,7.3],7:[11.5,11]}, windows:{2:[0,.72]}, shot:[.76,1]})

  const balanced = wingCatch('Catch · X3 is square and X5 is inside',
    'X3 arrives between 3 and the rim on balance. X5 has stepped down from 5 into the driving lane. X4 is at the nail with a long recovery to 4. Reverse before that recovery starts.',
    {x3:[8.8,17.8], x4:[23.4,20.6], x5:[14.1,14.2]}, [12.7,16.3])
  const reverse = beat('4 catches the reversal at the top',
    '3 passes back up to 4. X4 has to close from the nail. 4 can shoot in range or attack that closeout. 1 stays wide right so the next drive has room.',
    balanced, {x3:[8.5,18], x4:[24.1,25.8], x1:[36,28.9]}, 3,
    {pass:[.06,1], watch:[8]})

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
      read('shooter','3 catches · X3 late → shoot',[shooter,late,jumper],[4,7,8]),
      read('closeout','3 catches · X3 flies high → drive',[shooter,hard,beatCloseout,rim],[4,7,8,9]),
      read('reverse','3 catches · X3 square, X5 inside → reverse',[shooter,balanced,reverse],[4,7,8]),
      read('screen','X1 closes the reject → use 4’s screen',[solid,useScreen,pullUp],[4,7,8]),
      read('help','1 rejects · X5 sinks → find 5',[ghost,sink,help,hitFive],[4,7,9]),
      read('pop','1 rejects · X4 contains → throw back to 4',[ghost,twoOnBall,hitFour],[4,7,8])
    ]
  }
}
