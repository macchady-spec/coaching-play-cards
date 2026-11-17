'use strict'
const get = id => document.getElementById(id)
const hunt = huntAndRotate(window.switchFrames['cluj-inverted-flare/switch'])
const catchFrame = hunt.at(-2)
const quickFinish = hunt.at(-1)
const phaseNames = ['catch', 'bounce', 'reaction', 'outcome']
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
for (const board of [left,right]) {
  board.nodes[7].classList.add('watched')
  board.nodes[0].classList.add('shooter')
  board.nodes[0].insertBefore(svg('circle',{r:16.2,class:'shooter-ring'}),board.nodes[0].firstChild)
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
let beat = 0, progress = 0, goal = 2, started = 0, running = false, request = 0

// A trail and arrow show actual travel, including X3's change of direction.
function defenderArrow(board, frames, from, to, u) {
  const layer = board.part('trails')
  let group = layer.querySelector('.direction')
  if (!group) {
    group = svg('path',{class:'direction'})
    layer.append(group)
  }
  const target = frames[to].p[7]
  const origin = frames[from].p[7]
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
function renderTransition(to, u) {
  const from = Math.max(0,to-1)
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
  left.paths(quickFrames,Math.min(to,2))
  right.paths(rightFrames,to)
}
function hash() { return '#'+reaction+'/'+phaseNames[beat] }
function save() {
  if(location.hash===hash())return
  try {history.replaceState(null,'',hash())} catch(error){if(error.name!=='SecurityError')throw error}
}
function show(index) {
  get('left-cue').textContent = frozenLeft[index]
  get('right-cue').textContent = rightText[reaction][index]
  left.part('court-desc').textContent = frozenLeft[index]
  right.part('court-desc').textContent = rightText[reaction][index]
  get('phase').textContent = running?'Playing both courts':progress?'Paused during the move':
    ['At the corner catch','First bounce','Paused on X3’s reaction','At the finish'][index]
  get('run').textContent = running?'Pause both':progress?'Resume both':
    beat===3?'Replay to the read':beat===2?(reaction==='help'?'Play the pass to 1':'Play the drive'):'Play to X3’s reaction'
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
  reaction=branch==='stay'?'stay':'help'
  get('reaction').value=reaction;rightFrames=dribbleFrames(reaction)
  settle(Math.max(0,phaseNames.indexOf(phase)))
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
  for(const id of ['left-court','right-court'])get(id).setAttribute('viewBox',get('focus').checked?'199 -13 312 387':'-6 -6 512 480')
}
get('focus').checked=matchMedia('(max-width: 680px)').matches
get('focus').onchange=zoom
get('share').onclick=async()=>{
  if(running || progress)settle(beat)
  const url=new URL(location.href);url.hash=hash()
  try{await navigator.clipboard.writeText(url.href);get('sharing').textContent='Board link copied to this beat.'}
  catch{const a=document.createElement('a');a.href=url.href;a.textContent=url.href;get('sharing').replaceChildren('Copy this link: ',a)}
}
addEventListener('hashchange',restore)
zoom();restore()
