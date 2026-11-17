'use strict'
const svg=(tag,attributes)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v] of Object.entries(attributes))n.setAttribute(k,v);return n}
const clamp=v=>Math.max(0,Math.min(1,v))
const mix=(a,b,u)=>[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u]
const fmt=p=>p.map(v=>(v*10).toFixed(2)).join(' ')

function createCourt(root, prefix=''){
  const id = name => prefix ? prefix+'-'+name : name
  const part = name => root.querySelector('#'+id(name))
  root.setAttribute('aria-labelledby',id('court-title')+' '+id('court-desc'))
  root.innerHTML = `<title id="${id('court-title')}">Five-on-five coaching court</title><desc id="${id('court-desc')}"></desc>
<defs><pattern id="${id('wood')}" width="100" height="36" patternUnits="userSpaceOnUse"><path d="M0 0H100M65 0V18M0 18H100M15 18V36" fill="none" stroke="#decba8" stroke-width="1"/></pattern></defs>
<rect width="500" height="470" fill="#f7e7ca"/><rect width="500" height="470" fill="url(#${id('wood')})"/>
<g fill="none" stroke="#a89577" stroke-width="2"><rect x="1" y="1" width="498" height="468"/><path d="M170 0V190H330V0" fill="#e7d5b6"/><circle cx="250" cy="190" r="60"/><path d="M30 0V140 A237.5 237.5 0 0 0 470 140V0 M210 51 A40 40 0 0 0 290 51 M190 470 A60 60 0 0 1 310 470"/></g><path d="M220 40H280" stroke="#74482b" stroke-width="4"/><circle cx="250" cy="52.5" r="8" stroke="#a85320" stroke-width="3" fill="none"/>
<g id="${id('trails')}"></g><path id="${id('pass')}" stroke="#763c09" stroke-width="2.5" stroke-dasharray="5 4" fill="none"/><g id="${id('actors')}"></g><g id="${id('ball')}" aria-hidden="true"><circle r="5.9" fill="#ffbb4d" stroke="#3b2b18" stroke-width="1.8"/><path d="M-5 2Q0 -2 5 -2" fill="none" stroke="#57300c" stroke-width="1"/></g>`
  const nodes=actorIds.map((id,i)=>{
    const offense=i<5,g=svg('g',{class:offense?'off':'def'})
    g.dataset.player=id
    const label=svg('text',{});label.textContent=offense?id[1]:id.toUpperCase()
    g.append(offense?svg('circle',{r:12.6}):svg('rect',{x:-12,y:-10,width:24,height:20,rx:4}),label)
    part('actors').append(g);return g
  })
  // Draw offense above defenders when a legal screen brings two symbols together.
  nodes.slice(0,5).forEach(n=>part('actors').append(n))
  function draw(frames,from,to,u){
    const a=frames[from],b=frames[to]
    const pts=a.p.map((p,i)=>{
      const [start,end]=b.windows?.[i]||[0,1]
      let v=clamp((u-start)/(end-start));v=v*v*(3-2*v)
      const control=from!==to&&b.curves?.[i]
      return control?mix(mix(p,control,v),mix(control,b.p[i],v),v):mix(p,b.p[i],v)
    })
    pts.forEach((p,i)=>nodes[i].setAttribute('transform','translate('+fmt(p)+')'))
    const giver=to>0?frames[to-1].holder:b.holder
    let ball=pts[b.holder]
    if(giver!==b.holder){
      const [first,last]=b.pass||[.15,.9]
      const v=from===to?1:clamp((u-first)/(last-first))
      ball=mix(pts[giver],pts[b.holder],v)
      part('pass').setAttribute('d',u>=first?'M'+fmt(pts[giver])+' L'+fmt(pts[b.holder]):'')
    }else part('pass').setAttribute('d','')
    part('ball').setAttribute('transform','translate('+fmt([ball[0]+1.05,ball[1]-.85])+')')
  }
  function paths(frames,i){
    const b=frames[i],a=frames[Math.max(i-1,0)]
    part('trails').replaceChildren()
    for(let k=0;k<5;k++){
      if(a.p[k].every((v,n)=>v===b.p[k][n]))continue
      const control=b.curves?.[k], d='M'+fmt(a.p[k])+(control?' Q'+fmt(control)+' ':' L')+fmt(b.p[k])
      part('trails').append(svg('path',{d,class:'trail'}))
    }
    if(b.screen!=null){
      const [x,y]=b.p[b.screen]
      part('trails').append(svg('path',{d:'M'+fmt([x-1,y+1.5])+'l20 -4',class:'screen'}))
    }
  }
  return {draw,paths,nodes,part}
}
