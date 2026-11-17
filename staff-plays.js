'use strict'
// Authored five-on-five teaching diagrams. Coordinates are feet, in order O1–O5, X1–X5.
window.staffPlaybook = (() => {
  const f=(title,cue,p,holder,watch=[],extra={})=>({title,cue,p,holder,watch,...extra})
  const branch=(id,label,frames,stops)=>({id,label,frames,stops})
  const wabc=['FIBA/WABC · Level 1, team defense: helping a helper and transition defense','https://assets.fiba.basketball/image/upload/documents-corporate-wabc-coaching-level-manuals-level-1-eng.pdf']
  const clinic=['Dave Smart interview · Force left, matchups and closeouts (chapter guide)','https://the-basketball-podcast.captivate.fm/episode/episode-51-dave-smart-matchup-based-offense-and-defense']
  const curr=['Basketball Australia · National Player Development Curriculum, “Guarding the dribbler” and “Close-outs”','https://bears.bunburybasketball.com.au/wp-content/uploads/2021/09/Basketball-National-Curriculum.pdf#page=31']
  const base=[
    f('Choose who guards the ball','1 is our best downhill guard. X5 struggles to contain speed; X1 gives up size in the post. Bring X5 into the play by having their check, 5, screen. 2 and 3 stretch the corners; 4 is the outlet.',[[20,34],[46,7],[4,7],[9,29],[31,20],[21,30],[43,10],[7,10],[13,26],[29,17]],0,[4,9]),
    f('5 sets the screen','5 arrives and plants before 1 goes. 1 uses the screen shoulder to shoulder. Both corners stay wide so we can see which defender leaves.',[[24,29],[46,7],[4,7],[9,29],[24,25],[22,26],[43,10],[7,10],[13,26],[29,23]],0,[4,5,9],{screen:4}),
    f('Freeze: they exchanged','X5 now guards 1. X1 has picked up the bigger 5 on the roll. Look inside first: is there a target hand AND a clear passing lane? If not, give 1 the empty driving lane.',[[35,24],[46,7],[4,7],[11,31],[25,13],[23,11],[43,10],[8,10],[15,26],[32,20]],0,[5,9],{curves:{0:[32,29]}})
  ]
  const seal=base.concat([
    f('5 seals the guard','5 gets hips across X1 and presents the outside hand. X3 stays with the corner, so 1 can pass to the hand away from X1. If X3 is sitting in that lane, keep the ball out.',[[34,23],[46,7],[4,7],[12,31],[27,11],[24.5,10],[43,10],[8,10],[16,27],[35.8,20]],4,[4,5,7],{pass:[.55,.94]}),
    f('Finish before the rescue','X1 is behind the play; 5 turns toward the rim. 3 holds the far corner as a pass out if X3 digs. No need to wait for a double when the finish is already there.',[[34,23],[46,7],[4,7],[12,31],[26.4,7.2],[23.6,9],[43,10],[8,10],[16,27],[32,18]],4,[4,5])
  ])
  const downhill=base.concat([
    f('Clear the lane; attack X5','5 takes X1 across the lane. 1 changes pace and gets outside X5’s hip. 2 stays in the right corner so X2 must choose between the ball and the shooter.',[[37,16],[46,7],[4,7],[14,32],[18,9],[20,10],[42,10],[8,10],[18,26],[34,18]],0,[0,6,9],{curves:{0:[39,22]}}),
    f('Freeze: X2 leaves the corner','X5 trails. X2 steps inside to stop 1; that opens 2, the player X2 just left. If X2 stays home and the lane is clear, 1 keeps going.',[[33,10],[46,7],[4,7],[14,32],[18,9],[20,10],[31,8],[8,10],[18,26],[36,14]],0,[6,9]),
    f('Pass behind the help','1 kicks out to 2 before picking up under the rim. 2 catches ready to shoot. If the next closeout arrives on balance, move it again.',[[32,10],[46,7],[4,7],[16,31],[17,10],[20,10],[36,9],[9,11],[20,24],[33,13]],1,[1,6],{pass:[.08,.78]})
  ])
  const front=base.concat([
    f('They front the seal and load the lane','X1 gets between 1 and 5. X3 is behind the post, and X5 stays in front of 1. Neither mismatch has produced an open shot. 4 moves up for a new angle.',[[36,25],[46,7],[4,7],[20,32],[25,12],[27.6,14],[43,10],[22,8],[17,27],[34,21]],0,[5,7,9]),
    f('Reverse; do not force the entry','1 reverses to 4. 3 stays wide behind X3. From the new angle, feed 5 only with a visible target and no back help; otherwise swing to 3 or re-screen.',[[37,26],[46,7],[4,7],[20,32],[24,12],[26,14],[43,10],[22,8],[19,27],[34,21]],3,[3,5,7],{pass:[.1,.85]})
  ])
  const safety=[
    f('The miss: who is already back?','2 has shot from the wing. X5 has just rebounded at the top basket. The numbered team now DEFENDS the bottom basket. On the release, 1 turned to run with leaking X2; 4 got above the ball as second safety.',[[26,43],[43,23],[5,9],[13,34],[27,9],[30,22],[37,38],[9,25],[16,15],[24,7]],9,[0,3,6,9]),
    f('Freeze: runner or ball?','X2 is sprinting down the right lane. 1 is between X2 and the far rim: stay deep. X3 shows for a short outlet; 4 can delay the ball because 1 has the basket.',[[29,58],[40,34],[10,24],[15,43],[26,15],[32,32],[36,51],[12,34],[16,24],[24,8]],9,[0,3,6]),
  ]
  const short=safety.concat([
    f('The long pass is covered','X5 takes the short outlet to X3. 4 meets the ball without gambling. 1 keeps sight of X2 and the basket; nobody leaves the runner to join 4.',[[30,70],[39,46],[11,38],[16,49],[26,28],[31,42],[37,64],[14,42],[17,36],[24,13]],7,[0,3,6,7],{pass:[.05,.8]}),
    f('Recover by threat','1 takes the runner near the far rim. 4 contains X3. 2 takes trailing X1; 3 finds X4; 5 sprints back inside. Call the matches before trying to get back to your usual player.',[[32,80],[34,59],[17,51],[17,62],[26,47],[35,55],[36,76],[17,57],[17,47],[24,30]],7,[0,3,6,7])
  ])
  const long=safety.concat([
    f('They throw ahead anyway','X5 throws an overhead outlet. X2 catches near the sideline, in front of 1 but outside the lane. 1 stays goal-side instead of lunging for the pass. Make X2 dribble through you to get to the basket.',[[31,74],[40,48],[11,38],[23,53],[26,29],[32,42],[39,68],[13,41],[17,35],[24,13]],6,[0,6],{pass:[.02,.94]}),
    f('Contain first; match the trailer','1 meets X2 outside the lane; 4 gets back inside to cover the next cutter. As teammates arrive, point and match. Do not send a second defender at X2 just because the long pass was caught.',[[33,81],[36,59],[15,52],[25,71],[25,47],[34,55],[37,77],[14,53],[19,48],[25,31]],6,[0,3,6])
  ])
  const close=[
    f('The ball is about to reverse','On this scout, our long-closeout call is “left.” 1 is passing to 2 in the right slot. X2 has been in help; X3 is one pass away near the nail (the middle of the free-throw line).',[[15,30],[36,29],[16,24],[4,7],[32,7],[16,27],[29,15],[21,21],[9,10],[29,8]],0,[6,7]),
    f('Freeze: take away 2’s right','X2 sprints while the ball travels, brakes into short steps, and arrives on 2’s right side with a high hand. Leave room to slide. Left means the ballhandler’s left as 2 faces the top basket.',[[15,30],[36,29],[15,24],[4,7],[32,7],[17,27],[37,25.6],[23,21],[9,10],[29,8]],1,[6,7],{pass:[.02,.68],curves:{6:[36,18]}})
  ]
  const slide=close.concat([
    f('Show a crowd; keep the corner','2 takes the left lane. X2 slides between ball and basket. X3 shows a chest at the nail, then goes back as soon as X2 contains. X5 holds the rim and X4 keeps sight of 4.',[[15,31],[30,22],[13,24],[4,7],[32,7],[17,27],[31,19],[25,19.5],[10,11],[28,8]],1,[6,7,9]),
    f('Recover on the pass','2 picks up and passes back to 3. X3 recovers to the catch. X2 stays with 2 and X5 keeps the rim; one show did not require a five-player scramble.',[[15,32],[30,22],[13,24],[4,7],[32,7],[17,28],[31,19],[16,22],[10,11],[28,8]],2,[6,7],{pass:[.05,.8]})
  ])
  const spin=[
    f('Start with a right-hand drive','1 attacks from the left slot toward the right elbow. X1 is on the ball. X3 can see both 3 and the nail; X5 is between the dunker and the rim. Watch X1’s cushion.',[[20,33],[46,7],[11,25],[4,7],[31,6],[22,29],[42,10],[18,22],[9,10],[28,8]],0,[5,7,9]),
    f('X1 stops the right lane','X1 beats 1 to the spot. As 1 turns their back, X1 gives a short retreat step toward the rim. No reach around the exposed back: that gives up the spin exit.',[[30,23],[46,7],[11,25],[4,7],[31,6],[31,19.5],[42,10],[21,21],[10,11],[28,8]],0,[5,7])
  ]
  const stunt=spin.concat([
    f('Freeze: the spin exits LEFT','1 spins back toward the middle. X1 keeps the inside angle and meets the exit; X3 shows briefly at the nail. X5 stays at the rim. Do not send a second defender if X1 still has the ball contained.',[[25.6,20.6],[46,7],[11,25],[4,7],[31,6],[26,17.4],[42,10],[22,19.5],[10,11],[28,8]],0,[5,7],{curves:{0:[32,18],5:[30,16]}}),
    f('The spin produced a pass out','1 picks up and throws to 3. X3 recovers on the flight. X1 stays with 1, X4 stays with the corner, and X5 never had to leave the rim.',[[25,21],[46,7],[11,25],[4,7],[31,6],[25,18],[42,10],[14,23],[10,11],[28,8]],2,[5,7],{pass:[.08,.77]})
  ])
  const beaten=spin.concat([
    f('Freeze: the spin beats X1','1 exits left of X1’s hip. X3 now steps across the open lane to contain. X4 splits the wing and corner behind X3. X5 stays goal-side of the dunker; X2 stays connected to the far shooter.',[[24,18],[46,7],[12,25],[4,7],[31,6],[28.6,20],[42,10],[23,15.5],[10,16],[28,8]],0,[5,7,8,9],{curves:{0:[31,17]}}),
    f('On the kick, cover the helper','1 kicks to 3. X4 is first out to the wing, so X3 releases toward the corner as X1 recovers to 1. If X4 could not arrive on the catch, 3 would have a shot. That is the cost of the help.',[[24,18],[46,7],[12,25],[4,7],[31,6],[25.8,15.7],[42,10],[12,11],[14,22.5],[28,8]],2,[5,7,8],{pass:[.12,.78]})
  ])
  const play=(id,name,timeout,matchup,notes,links,options,other={})=>({id,name,timeout,matchup,notes,links,options,headings:[],...other})
  return [
    play('hunt','1–5 mismatch','Five, screen for one. Seal the small. If the entry is shut, clear out and let one turn the big.','Choose the defender you want to involve. Their assignment sets the screen. Put a downhill guard at 1 and a strong finisher at 5; leave a shooter in each corner.','Drawn teaching options. A switch gives you a new matchup. The defender’s position and the help decide whether you actually have an advantage.',[],[branch('seal','Small on 5 → feed the seal',seal,[2,3]),branch('drive','Big on 1 → turn the corner',downhill,[2,4]),branch('front','They front 5 and contain 1 → reverse',front,[2,3])]),
    play('safety','Stop the leak-out','One: basket first. Four: ball next. If one goes to the glass, four calls “back” and takes the runner.','Decide the two safeties before the shot. First back buys time between the deepest runner and the rim. Second back finds the ball. Nearest rebounder can delay the outlet without fouling.','WABC describes basket and ball responsibilities in transition. These numbers, outlets and exact positions are our example. Discuss who replaces the safety when your high guard drives.',[wabc],[branch('short','Runner covered → short outlet',short,[1]),branch('long','Pass goes ahead → contain the catch',long,[1,2])],{fullCourt:true,legend:'Numbers are getting back. Xs have the ball and attack the bottom basket.'}),
    play('left','Long closeout: force left','High hand. Take away the right. Nail shows, rim stays.','This is a team call against a right-hand threat. From the right slot it sends the ball toward the middle, so load the nail before the catch. Change the call if the scouting report calls for it.','Smart discusses force-left and matchup defense. The exact five jobs here are a staff teaching example. Close under control: a fly-by gives up either direction.',[clinic,curr],[branch('contain','Show at the nail → recover to the pass',slide,[1,2])]),
    play('spin','Stop the spin-back','Stop right. On the turn, give a step. Nail, show your chest; stay home if we have it.','Here the first drive is RIGHT and the spin exits LEFT. X1 protects the route to the rim. X3 watches the exit, X5 guards the rim, X4 covers behind real help and X2 stays with the far shooter.','Basketball Australia teaches recovering the angle on the spin. These two help calls and the X-out are authored alternatives. The spin direction alone does not tell you whether to double.',[curr,wabc],[branch('stunt','X1 contains → nail shows and recovers',stunt,[1,2]),branch('help','X1 beaten → nail helps; cover the pass',beaten,[1,2])])
  ]
})()
