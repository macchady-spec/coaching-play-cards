'use strict'
const ref = id => document.getElementById(id)
function buildSwitchPlays(){
const sequence = (group, branch) => window.switchFrames[group + '/' + branch]
const cluj = id => sequence('cluj-inverted-flare', id)
const lift = id => sequence('clearout-corner-lift', id)
const afterPeel = id => lift('peel').concat(sequence('clearout-peel-entry', id).slice(1))
const xout = id => sequence('attack-xout', id)
function twice(id) {
  return window.createFiveTwice(id).map(frame => ({
    ...frame, curves: Object.fromEntries(Object.entries(frame.curve || {}).map(([key, value]) => [actorIds.indexOf(key), value])),
    windows: Object.fromEntries(Object.entries(frame.delay || {}).map(([key, value]) => [actorIds.indexOf(key), [value,1]]))
  }))
}
// Stops are the completed beats where the defense reveals an assignment or passing window.
const choice = (id, label, frames, stops, headings = []) => ({id,label,frames,stops,headings})
return [
  {id:'screen', name:'Cluj flare', timeout:'Two screens four. Five frees two. Four, turn the corner and find the helper.',
    matchup:'Put your creator at 4. Put the player guarded by your target at 2. If X2 switches and 4 gets a shoulder past them, 4 drives. If both defenders stay square, keep moving the ball.',
    notes:'FIBA describes a hedge against the original Cluj action. The switch, paint help and X-out here are drawn coaching options. In the X-out option, put a shooter at 1 if the shot you want is the three above the break.',
    links:[['FIBA · Cluj inverted screen and flare','https://www.fiba.basketball/en/news/bcl-21-22-news-the-big-bucket-a-quicker-look-at-u-bt-cluj-napoca'],['FIBA · How Türkiye made Porziņģis guard repeated actions','https://www.fiba.basketball/en/news/how-did-they-do-it-tuerkiye-send-a-message-to-the-rest-of-eurobasket']],
    headings:['Choose the matchup','2 screens for 4','2 flares off 5'],
    options:[
      choice('switch','X2 switches onto 4 · nobody helps',cluj('switch'),[3],['Turn X2’s outside hip','Read the rim']),
      choice('hunt','X2 switches · X3 helps · X1 closes out',huntAndRotate(cluj('switch')),[3,5,6],['Turn X2’s outside hip','4 gets into the paint','X3 leaves the corner','X1 takes the first pass','3 passes up to 1']),
      choice('post','X5 goes out with the shooter',cluj('post'),[3],['5 releases inside','Feed the post']),
      choice('flare','X5 stays in the paint',cluj('flare'),[3],['Find the wing','Catch ready to shoot']),
      choice('corner','X3 tags the post',cluj('corner'),[3],['Read the low helper','Skip to the corner']),
      choice('high','X1 rotates down to the corner',cluj('high'),[3],['Read both helpers','Find 1 above the ball']),
      choice('reset','They recover every matchup',cluj('reset'),[3],['The defense recovers','Reverse and reset'])
    ]},
  {id:'drive',name:'Corner lift',timeout:'Two drives. Five, seal the peel. Four, give us the new angle.',
    matchup:'Use a downhill player at 2. If their big leaves 5 to stop the drive, the beaten guard may peel onto 5. Look for a visible hand and a clear entry lane.',
    notes:'Bilbao’s published peel shows how a defense can stop the driver and front the post. These drawn continuations let you change the entry angle and test the next defender.',
    links:[['FIBA · Bilbao Onion Peel','https://www.fiba.basketball/en/news/bcl-22-23-news-tactics-board-bilbao-onion-peel']],
    headings:['Space the floor','Lift from the corner','Deliver the kick-up','2 attacks the catch'],
    options:[
      choice('seal','X5 takes 2 · 5 seals the guard',afterPeel('seal-release'),[4,6,9],['X5 takes the drive','Reverse to 4','Check the new angle','5 shows a target','Feed the seal','X3 digs down','5 finds corner 3']),
      choice('front','X2 fronts 5 · X3 protects the rim',afterPeel('front-reverse'),[4,6,7],['X5 takes the drive','Reverse to 4','Check the new angle','X2 fronts the post','Reverse to 2','Read the front again','Keep the ball outside']),
      choice('attached','No help comes to the drive',lift('attached'),[3],['2 has the finishing lane']),
      choice('help','X1 helps off the corner',lift('help-cover'),[4],['X1 leaves the corner','Kick behind X1','Read the closeout']),
      choice('deny','X2 takes away the lift',lift('deny'),[2],[])
    ]},
  {id:'handoff',name:'5 Twice',timeout:'Five twice. Two, screen whoever takes five. One, see the pop and the rim.',
    matchup:'Use your shooting big at 5 and your downhill guard at 1. After the handoff, 2 screens the defender who picked up 5. Keep the right corner empty for 1.',
    notes:'An original coaching call for a shooting big. Read each exchange before choosing the throwback, drive or reversal.',links:[],headings:[],
    options:[
      choice('switch','They switch the handoff and the pop',twice('switch'),[2,3]),
      choice('return','Nobody takes 5 on the pop',twice('return'),[3]),
      choice('drive','The defense stays with 5',twice('drive'),[3]),
      choice('slash','X3 leaves the left wing to help',twice('slash'),[3,4]),
      choice('first','X5 trails the opening screen',twice('first'),[1])
    ]},
  {id:'xout',name:'Attack the X-out',timeout:'One, draw the tag. Four, show your hands. Three, read the defender coming out of the paint.',
    matchup:'Use 5 as the roller and put a shooter at 4 in the weak-side corner. Give 3 the wing. When X4 leaves to tag 5, watch X3 close to 4 and X4 race out to 3.',
    notes:'These three teaching options share a ball screen and a low tag. The screen on the rotating defender is a called wrinkle. Smart describes assigning roles and choosing matchups. The numbered routes are coaching adaptations.',
    links:[['BCL · Rubio reads the second helper, Joventut–Bonn (2026)','https://www.championsleague.basketball/en/news/tactics-board-badalona-passing-clinics'],['FIBA · Tenerife attacks Jerusalem’s X-out (2024)','https://www.fiba.basketball/en/news/23-24-news-games-within-games-lenovo-tenerife-vs-hapoel-bank-yahav-jerusalem'],['Dave Smart · matchups, roles and rim dives (2019 interview)','https://basketballimmersion.com/the-basketball-podcast-ep50-dave-smart-part-2/']],
    headings:['Space the weak side','1 uses the screen','X4 tags the roll'],
    options:[
      choice('lift','X4 is late getting back out to 3',xout('lift'),[2,4],['4 lifts as 3 rises','X3 closes to 4','One more pass to 3']),
      choice('backdoor','X4 jumps the wing pass',xout('backdoor'),[2,4,5],['Clear the cutting lane','X4 takes away the pass','3 cuts behind X4','Catch and read X5']),
      choice('screen','X3 runs the corner closeout · screen it',xout('screen'),[2,4],['3 moves before the skip','Plant in the recovery path','Hit the corner','Read the recovering X3'])
    ]}
]
}
const plays = window.staffPlaybook || buildSwitchPlays()
const denyTitles=['Space the floor','X2 denies the lift','Cut behind X2','Reverse to 4','Re-space']
function title(i) {
  if (play.id==='drive' && option.id==='deny') return denyTitles[i]
  return frames[i].title || play.headings[i] || option.headings[i-play.headings.length] || 'Read the defense'
}
let courtView, fullCourt
const samePose=(a,b)=>a.holder===b.holder&&a.p.every((v,i)=>v[0]===b.p[i][0]&&v[1]===b.p[i][1])
let play,option,frames,at=0,goal=0,progress=0,running=false,raf=0,started=0
const duration=1280
const reduced=matchMedia('(prefers-reduced-motion: reduce)')
function cue(i){
  ref('count').textContent='Beat '+(i+1)+' of '+frames.length+(option.stops.includes(i)?' · Decision':'')
  ref('moment').textContent=title(i)
  ref('cue').textContent=frames[i].cue
  ref('court-desc').textContent=frames[i].cue
}
function beatHash(){return '#'+[play.id,option.id,at].join('/')}
function save(){
  const hash=beatHash()
  if(location.hash===hash)return
  // Safari may limit rapid URL updates when a coach taps through many beats.
  try { history.replaceState(null,'',hash) }
  catch(error) { if(error.name!=='SecurityError') throw error }
}
function controls(){
  ref('play').textContent=running?'Pause':progress>0?'Resume':at===frames.length-1?'Replay':at===0?'Play to the read':'Continue'
  ref('prev').disabled=at===0&&!progress&&!running
  ref('next').disabled=at===frames.length-1
  Array.from(ref('beats').children).forEach((button,i)=>{
    button.className=i<at?'done':''
    if(i===at)button.setAttribute('aria-current','step')
    else button.removeAttribute('aria-current')
  })
}
function stop(){cancelAnimationFrame(raf);running=false}
function settle(i){
  stop();at=i;progress=0
  courtView.paths(frames,i);courtView.draw(frames,i,i,1);cue(i);controls();save()
}
function tick(now){
  progress=clamp((now-started)/duration)
  courtView.draw(frames,at,at+1,progress)
  if(progress>=1){
    at++;progress=0;save()
    if(at>=goal){settle(at);return}
    started=now;courtView.paths(frames,at+1);cue(at+1);controls()
  }
  raf=requestAnimationFrame(tick)
}
function animate(target){
  stop()
  if(target<=at || reduced.matches){settle(target);return}
  goal=target;running=true;started=performance.now()-progress*duration
  courtView.paths(frames,at+1);cue(at+1);controls();raf=requestAnimationFrame(tick)
}
function nextStop(){return option.stops.find(i=>i>at)??frames.length-1}
function button(label,handler){const b=document.createElement('button');b.textContent=label;b.onclick=handler;return b}
function select(selected,branch,i){
  stop();play=selected;option=branch;frames=option.frames
  if(!courtView || fullCourt!==Boolean(play.fullCourt)){
    fullCourt=Boolean(play.fullCourt);courtView=createCourt(ref('court'),'',fullCourt)
  }
  if(ref('legend-teams'))ref('legend-teams').textContent=play.legend || 'Numbers attack the top basket. Xs defend.'
  Array.from(ref('plays').children).forEach((b,n)=>b.setAttribute('aria-pressed',plays[n]===play))
  ref('read').replaceChildren(...play.options.map(o=>new Option(o.label,o.id,false,o===option)))
  if(ref('only-read')){
    const only=play.options.length===1
    ref('read').hidden=only;ref('only-read').hidden=!only
    ref('only-read').textContent=only?option.label:''
  }
  ref('beats').replaceChildren(...frames.map((_,i)=>{
    const label='Beat '+(i+1)+' · '+title(i)
    const b=button('',()=>settle(i));b.setAttribute('aria-label',label);b.title=label;return b
  }))
  ref('timeout').textContent='“'+play.timeout+'”';ref('matchup').textContent=play.matchup
  const note=document.createElement('p');note.textContent=play.notes
  ref('notes').replaceChildren(note,...play.links.map(([name,url])=>{const p=document.createElement('p'),a=document.createElement('a');a.href=url;a.textContent=name;p.append(a);return p}))
  ref('sharing').replaceChildren()
  settle(i)
}
function restore(){
  const [p,o,idx]=location.hash.slice(1).split('/')
  const selected=plays.find(v=>v.id===p)??plays[0],branch=selected.options.find(v=>v.id===o)??selected.options[0]
  select(selected,branch,/^\d+$/.test(idx||'')?Math.min(Number(idx),branch.frames.length-1):0)
}
for(const p of plays)ref('plays').append(button(p.name,()=>select(p,p.options[0],0)))
ref('read').onchange=()=>{
  const branch=play.options.find(o=>o.id===ref('read').value)
  let common=0
  while(common<at&&common+1<branch.frames.length&&samePose(frames[common+1],branch.frames[common+1]))common++
  select(play,branch,common);animate(nextStop())
}
ref('play').onclick=()=>{
  if(running){stop();controls();return}
  if(progress>0){animate(goal);return}
  if(at===frames.length-1)settle(0)
  animate(nextStop())
}
ref('next').onclick=()=>animate(Math.min(frames.length-1,at+1))
ref('prev').onclick=()=>settle(progress>0||running?at:Math.max(0,at-1))
ref('share').onclick=async()=>{
  if(running||progress)settle(at)
  const shared=new URL(location.href);shared.hash=beatHash()
  const url=shared.href
  try{await navigator.clipboard.writeText(url);ref('sharing').textContent='Link copied to this beat.';ref('share').textContent='Link copied'}
  catch{const a=document.createElement('a');a.href=url;a.textContent=url;ref('sharing').replaceChildren('Copy this link: ',a);ref('sharing').scrollIntoView({block:'nearest'})}
  setTimeout(()=>{ref('share').textContent='Share this beat'},1800)
}
addEventListener('hashchange',restore);restore()
