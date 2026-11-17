'use strict'
const get = id => document.getElementById(id)
const hunt = huntAndRotate(window.switchFrames['cluj-inverted-flare/switch'])
const catchFrame = hunt.at(-2)
const quickFinish = hunt.at(-1)
const closeoutPhases = ['catch', 'bounce', 'reaction', 'outcome']
const rimPhases = ['drive', 'approach', 'decision', 'outcome']
const durations = [0, 610, 710, 1140]
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')

function frame(previous, changes, holder, pass) {
  return {p: previous.p.map((p,i) => changes[actorIds[i]] ?? p), holder, pass}
}
// Both examples use the published corner catch. The reference pass arrives on
// the first beat; the players then complete their original recovery to 1.
const quickCatch = frame(catchFrame, {x1:[44,9.8],x3:[34.1,21.7]}, 0, [.05,.96])
const quickFrames = [catchFrame, quickCatch, quickFinish, quickFinish]
const bounce = frame(catchFrame, {
  o3:[42.8,5.8], x1:[45,9], x3:[33.8,19.8],
  o4:[23.7,10.8], x2:[26.1,13.4]
}, 2)
function dribbleFrames(reaction) {
  const helps = reaction === 'help'
  const decision = frame(bounce, {
    o3:[39.5,5.4], x1:[43,9.2], x3: helps ? [34.1,14] : [36.1,26.4],
    o4:[21.8,10.8], x2:[24.9,13.1]
  }, 2)
  const last = helps
    ? frame(decision, {x3:[36.1,21.7],x1:[41.8,8.6]}, 0, [.08,.9])
    : frame(decision, {o3:[32.1,5.8],x1:[36.4,8.1],x3:[38,30.9],o4:[18.5,9.5],x2:[23.2,10.6]}, 2)
  return [catchFrame, bounce, decision, last]
}
const left = createCourt(get('left-court'), 'quick')
const right = createCourt(get('right-court'), 'dribble')
// Reuse the live keep-drive endpoint on both courts, including its last ball position.
const baselineDrive = dribbleFrames('stay').at(-1)
const finalStep = frame(baselineDrive, {
  o3:[31.6,6.1], o4:[18.7,10.3], x1:[35.4,8.4], x2:[22.8,10.1]
}, 2)
const driveSpacing = {o3:[30.6,6.7], o4:[19,12.1], x1:[34.5,8.6]}
const stepOver = frame(finalStep, {...driveSpacing,x2:[27.1,5.3]}, 2)
const stayHome = frame(finalStep, {...driveSpacing,x2:[20.4,10.3]}, 2)
const dropPass = frame(stepOver, {
  o4:[19.3,12.4], x2:[27.6,5.7], x1:[33.3,8.4]
}, 3, [.10,.89])
const finish = frame(stayHome, {
  o3:[27.2,7.6], x1:[31.2,9], x2:[20.6,10.3]
}, 2)
const passToFour = [baselineDrive,finalStep,stepOver,dropPass]
const finishAtRim = [baselineDrive,finalStep,stayHome,finish]
const rimLeft = [
  '3 has beaten X1 along the baseline. 4 is across the lane with X2 nearby.',
  'As 3 approaches the rim, 4 steps up the far lane and shows both hands.',
  'X2 steps between 3 and the rim. 4 shows hands behind X2’s shoulder. The drop pass is open.',
  '3 drops the ball back across the lane. 4 catches facing the basket while X2 is still on the ball side.'
]
const rimRight = [
  'Same drive, same spacing. X3 stays with 1 above the break.',
  'Watch X2 as 4 takes the same step up the far lane.',
  'X2 stays within reach of 4. X1 trails 3 and the near side of the rim is open.',
  '3 keeps the ball and releases on the near side before trailing X1 can contest.'
]
function markRead(board, defender, receiver) {
  for (const node of board.nodes) node.classList.remove('watched','shooter')
  board.part('actors').querySelector('.shooter-ring')?.remove()
  board.nodes[defender].classList.add('watched')
  const target = board.nodes[receiver]
  target.classList.add('shooter')
  target.insertBefore(svg('circle',{r:16.2,class:'shooter-ring'}),target.firstChild)
}
const frozenLeft = [
  '3 has the ball. X3 has left the paint and has a long run back to 1.',
  '3 passes on the catch. The ball reaches 1 while X3 is still well inside the arc.',
  '1 already has the ball above the break. X3 is still closing. Shoot if the release is clear.',
  'The quick-pass example stays on 1’s catch so you can compare the other finish.'
]
const rightText = {
  help:[
    'Same catch. 3 has space along the baseline, below X1’s closeout.',
    '3 takes one hard dribble past X1. X3’s first step is still toward 1.',
    'X3 turns back toward the baseline drive. 1 is still wide above the break. Pass now, before X3 can turn out again.',
    '3 passes to 1. The shooter catches while X3 is changing direction.'
  ],
  stay:[
    'Same catch. 3 has space along the baseline, below X1’s closeout.',
    '3 takes one hard dribble past X1. X3’s first step is still toward 1.',
    'X3 keeps running out to 1. X1 is behind 3 and the baseline ahead is clear. Keep driving.',
    '3 keeps the ball toward the rim. Read X2 next: finish if the lane stays open, or find 4 if X2 comes across.'
  ]
}
let reaction = 'help', rightFrames = dribbleFrames(reaction)
let rimRead = false
let userZoom = null
const originalIntro = get('intro').innerHTML
const previousRead = document.querySelector('.return')
function configureLesson() {
  get('lesson-title').textContent = rimRead ? 'Drop it to 4 or finish?' : 'Quick pass or one dribble?'
  document.title = get('lesson-title').textContent+' · Coaching board'
  if (rimRead) {
    get('intro').innerHTML = '3 keeps the baseline drive while X3 stays with shooter 1. Watch <strong>X2</strong>, the defender guarding 4 across the lane.'
  } else get('intro').innerHTML = originalIntro
  previousRead.href = rimRead ? '#stay/outcome' : 'switches.html#screen/hunt/6'
  previousRead.textContent = rimRead ? '← Back to 3’s baseline drive' : '← Back to the corner catch'
  get('left-heading').textContent = rimRead ? 'X2 steps over' : 'Quick extra pass'
  get('right-heading').textContent = rimRead ? 'X2 stays with 4' : 'Tenerife one-dribble read'
  get('watched-label').textContent = (rimRead?'X2':'X3')+' and direction of travel'
  get('target-label').textContent = rimRead ? '4, across the lane' : '1, target shooter'
  get('reaction-label').hidden = get('reaction').hidden = rimRead
  document.querySelector('.settings').classList.toggle('rim-settings',rimRead)
  get('zoom-label').textContent = rimRead ? 'Zoom to the rim' : 'Zoom to the ball side'
  get('focus').checked = userZoom ?? (rimRead || matchMedia('(max-width: 680px)').matches)
  get('restart').textContent = rimRead ? 'Back to the drive' : 'Back to the catch'
  for (const link of [get('x2-link'),get('x3-link')]) link.removeAttribute('aria-current')
  get(rimRead?'x2-link':'x3-link').setAttribute('aria-current','page')
  for (const board of [left,right]) markRead(board,rimRead?6:7,rimRead?3:0)
  get('sharing').replaceChildren()
}
let beat = 0, progress = 0, goal = 2, started = 0, running = false, request = 0

// A trail and arrow show actual travel, including X3's change of direction.
function defenderArrow(board, frames, from, to, u) {
  const layer = board.part('trails')
  let group = layer.querySelector('.direction')
  if (!group) {
    group = svg('path',{class:'direction'})
    layer.append(group)
  }
  const defender = rimRead ? 6 : 7
  const target = frames[to].p[defender]
  const origin = frames[from].p[defender]
  const dx = target[0]-origin[0], dy = target[1]-origin[1]
  const length = Math.hypot(dx,dy)
  if (!length || u<=0) { group.removeAttribute('d'); return }
  const v = u*u*(3-2*u)
  const end = mix(origin,target,v)
  const tx = dx/length, ty = dy/length
  const tip = [end[0]+1.5*tx,end[1]+1.5*ty]
  const ahead = [tip[0]+.95*tx,tip[1]+.95*ty]
  const base = [ahead[0]-.8*tx,ahead[1]-.8*ty]
  const a = [base[0]-.55*ty,base[1]+.55*tx], b = [base[0]+.55*ty,base[1]-.55*tx]
  group.setAttribute('d','M'+fmt(origin)+' L'+fmt(end)+' M'+fmt(tip)+' L'+fmt(ahead)+' M'+fmt(a)+' L'+fmt(ahead)+' L'+fmt(b))
}
function drawFinish(u) {
  // From the gather to release the ball follows 3's near-side hand. Then it
  // travels independently to the rim. Hold on the attempt at the basket.
  const releaseAt = .53
  const eased = t=>t*t*(3-2*t)
  const handAt = t=>{
    const pos = mix(stayHome.p[2],finish.p[2],eased(t))
    return [pos[0]+1.05-1.5*t,pos[1]-.85]
  }
  const release = handAt(releaseAt), rim=[25,5.25]
  const flight = clamp((u-releaseAt)/(1-releaseAt))
  const pos = u<=releaseAt ? handAt(u) : mix(release,rim,flight)
  const height = Math.sin(Math.PI*flight)
  pos[1] -= 1.4*height
  right.part('ball').setAttribute('transform','translate('+fmt(pos)+') scale('+(1+.22*height)+')')
  const path=right.part('trails').querySelector('.finish-path')
  if(path) path.setAttribute('d',flight>0?'M'+fmt(release)+' Q'+fmt([(release[0]+25)/2,(release[1]+5.25)/2-2.8])+' '+fmt(rim):'')
}
function renderTransition(to, u) {
  const from = Math.max(0,to-1)
  if (rimRead) {
    left.draw(passToFour,from,to,u)
    right.draw(finishAtRim,from,to,u)
    defenderArrow(left,passToFour,from,to,u)
    defenderArrow(right,finishAtRim,from,to,u)
    if(to===3) drawFinish(u)
    return
  }
  // The reference holds its completed pose and pass line after the catch.
  if(to>=2) {
    left.draw(quickFrames,1,2,to===2?u:1)
    const receiver=quickFrames[2].p[0], passer=quickFrames[2].p[2]
    left.part('pass').setAttribute('d','M'+fmt(passer)+' L'+fmt(receiver))
    defenderArrow(left,quickFrames,1,2,to===2?u:1)
  }else{
    left.draw(quickFrames,from,to,u)
    defenderArrow(left,quickFrames,from,to,u)
  }
  right.draw(rightFrames,from,to,u)
  defenderArrow(right,rightFrames,from,to,u)
  // Top-down cue: ball moves out to the baseline hand, shrinks at floor contact
  // between beats 1 and 2, then returns to 3. Only one bounce before the read.
  if(to===1 || to===2 || (to===3 && reaction==='stay')){
    const cycle = to===3 ? u : (to-1+u)/2
    const floor = Math.sin(Math.PI*cycle)
    const pos = mix(rightFrames[from].p[2],rightFrames[to].p[2],u*u*(3-2*u))
    const offsetBall=[pos[0]+1.05-.75*floor,pos[1]-.85-1.25*floor]
    right.part('ball').setAttribute('transform','translate('+fmt(offsetBall)+') scale('+(1-.34*floor)+')')
  }
}
function setupPaths(to) {
  if (rimRead) {
    left.paths(passToFour,to)
    right.paths(finishAtRim,to)
    if(to===3) right.part('trails').append(svg('path',{class:'finish-path'}))
    return
  }
  left.paths(quickFrames,Math.min(to,2))
  right.paths(rightFrames,to)
}
function hash() { return rimRead ? '#x2/'+rimPhases[beat] : '#'+reaction+'/'+closeoutPhases[beat] }
function save() {
  if(location.hash===hash())return
  try {history.replaceState(null,'',hash())} catch(error){if(error.name!=='SecurityError')throw error}
}
function show(index) {
  const leftCue = (rimRead ? rimLeft : frozenLeft)[index]
  const rightCue = (rimRead ? rimRight : rightText[reaction])[index]
  get('left-cue').textContent = left.part('court-desc').textContent = leftCue
  get('right-cue').textContent = right.part('court-desc').textContent = rightCue
  const stops = rimRead
    ? ['On the baseline drive','Approaching the rim','Paused on X2’s decision','Pass and finish']
    : ['At the corner catch','First bounce','Paused on X3’s reaction','At the finish']
  get('phase').textContent = running?'Playing both courts':progress?'Paused during the move':stops[index]
  const next = rimRead ? 'Play the pass and finish' : reaction==='help' ? 'Play the pass to 1' : 'Play the drive'
  const toRead = rimRead ? 'Play to X2’s decision' : 'Play to X3’s reaction'
  get('run').textContent = running?'Pause both':progress?'Resume both':beat===3?'Replay to the read':beat===2?next:toRead
  get('follow-keep').hidden = rimRead || reaction!=='stay' || beat!==3
  get('restart').disabled = beat===0 && !running && !progress
}
function stop() { cancelAnimationFrame(request); running=false }
function settle(index) {
  stop();beat=index;progress=0
  setupPaths(beat);renderTransition(beat,1)
  show(beat);save()
}
function tick(now) {
  const next=beat+1
  progress=clamp((now-started)/durations[next])
  renderTransition(next,progress)
  if(progress===1){
    beat=next;progress=0
    if(beat===goal){settle(beat);return}
    started=now;save();setupPaths(beat+1);show(beat)
  }
  request=requestAnimationFrame(tick)
}
function animate(target) {
  stop();goal=target
  if(reducedMotion.matches){settle(target);return}
  running=true
  started=performance.now()-progress*durations[beat+1]
  setupPaths(beat+1);show(beat);request=requestAnimationFrame(tick)
}
function restore() {
  const [branch,phase] = location.hash.slice(1).split('/')
  rimRead=branch==='x2'
  reaction=branch==='stay' || rimRead?'stay':'help'
  configureLesson()
  get('reaction').value=reaction;rightFrames=dribbleFrames(reaction)
  zoom()
  settle(Math.max(0,(rimRead?rimPhases:closeoutPhases).indexOf(phase)))
}
get('run').onclick=()=>{
  if(running){stop();show(beat);return}
  if(progress){animate(goal);return}
  if(beat===3)settle(0)
  animate(beat<2?2:3)
}
get('restart').onclick=()=>settle(0)
get('reaction').onchange=()=>{
  reaction=get('reaction').value;rightFrames=dribbleFrames(reaction)
  get('sharing').replaceChildren();settle(0);animate(2)
}
function zoom(){
  const ballSide = rimRead?'135 -25 263 258':'199 -13 312 387'
  for(const id of ['left-court','right-court'])get(id).setAttribute('viewBox',get('focus').checked?ballSide:'-6 -6 512 480')
}
get('focus').onchange=()=>{userZoom=get('focus').checked;zoom()}
get('share').onclick=async()=>{
  if(running || progress)settle(beat)
  const url=new URL(location.href);url.hash=hash()
  try{await navigator.clipboard.writeText(url.href);get('sharing').textContent='Board link copied to this beat.'}
  catch{const a=document.createElement('a');a.href=url.href;a.textContent=url.href;get('sharing').replaceChildren('Copy this link: ',a)}
}
addEventListener('hashchange',restore)
restore()
