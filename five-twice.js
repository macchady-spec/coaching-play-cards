// Shared positions, ball exchanges and timing for the 5 Twice boards.
window.createFiveTwice = (() => {
  const ids=['o1','o2','o3','o4','o5','x1','x2','x3','x4','x5'];
  const opening=[[23,31],[35.6,19],[5.8,23.4],[3,4.5],[34,8.2],[23.3,27.1],[32.2,16.6],[9,20.7],[6.8,6.7],[31.2,9.7]];
  const frame=(title,cue,p,holder=0,extra={})=>({title,cue,p,holder,...extra});
  function run(key){
    const frames=[frame('Alignment','1 up top. Right corner empty. 5 starts low; 2 plants the first screen. 3 stays left with room to attack right.',opening,0)];
    function add(title,cue,m,holder=frames.at(-1).holder,extra={}){
      const p=frames.at(-1).p.map((v,i)=>m[ids[i]]??v);frames.push(frame(title,cue,p,holder,extra))}
    add('First window',key==='first'?'X5 is caught inside the pindown. 1 hits 5 beyond the right-slot arc: feet ready, shoot on the catch.':'5 comes up the right lane line off 2. X5 arrives in the shooting window; 5 secures the entry and keeps the ball high.',
      {o5:[35.4,27.1],x5:key==='first'?[32.1,19.2]:[33.3,23.7],x2:[32.2,15.6]},4,
      {curve:{o5:[40,18],x5:[28.6,17.3]},screen:1,pass:[.55,.96]});
    if(key==='first')return frames;
    const sw=key==='switch';
    add('Handoff and re-screen',sw?'X5 takes 1 on the handoff; X1 switches onto 5. 2 changes the screen angle for X1, the new defender.':'1 follows the entry around 5’s outside shoulder. 2 plants again, inside the recovery path to the top. 5 waits for 1 to clear.',
      {o1:[38.1,25.2],o2:sw?[32.1,28]:[30.6,25.1],x1:sw?[34.2,30.2]:[40,28.1],x2:sw?[28.9,26.8]:[28.5,22.5],x5:sw?[36.7,21.8]:[33.5,22.8]},0,
      {curve:{o1:[37.9,34.2],x1:[39.7,33.4]},screen:1,pass:[.82,1]});
    add('Read the drive',key==='return'?'X5 goes with the driving guard. 5 flares across the top behind 2’s second screen; 1 sees the throwback.':key==='switch'?'X5 contains 1, X2 takes 5 outside and X1 takes 2. Neither designed shot is open.':key==='slash'?'X5 follows 5. As 1 turns downhill, X3 leaves the left wing and steps into the paint. 3 holds width.':'X5 chases 5 back to the top. X1 trails the handoff; the empty right side is open for 1.',
      {o1:[34.4,16],o5:[23,29.5],x1:sw?[30.5,22.3]:[38,19.5],x2:sw?[25.4,27.1]:[28.9,21.4],x5:key==='return'||sw?[32.5,12.6]:[24.6,26],x3:key==='slash'?[26,12.7]:[10,19.7]},
      0,{curve:{o1:[39,19],o5:[30,29.8],x5:sw||key==='return'?[35,17]:[28.7,23.3]},screen:1});
    if(key==='return')add('Second three','1 throws back above the help. 5 catches square behind the top of the arc; 2 stays below the pass.',{},4,{pass:[.1,.8]});
    if(key==='drive')add('Turn the corner','1 keeps it and gets inside X1’s hip. Finish on the right if the rim stays open.',{o1:[27.5,8.8],x1:[31.9,11.1]},0);
    if(key==='slash'){
      add('Hit the slasher','1 passes from a visible angle before reaching the baseline. X3 is in the paint, so 3 catches on the left wing facing right.',
        {o1:[32.3,15.7],x1:[36,18.4],x3:[25.4,11.4]},2,{pass:[.1,.82]});
      add('Clear, then drive right','1 exits right. X3 is late to the catch. With the middle clear, 3 attacks right-handed; 4 holds the far corner and 5 stays above the ball.',
        {o1:[44,7],o2:[43.5,22.5],o3:[20.7,15.4],x1:[39.4,8.8],x2:[39.8,20.3],x3:[15.8,12.2]},2,{curve:{o3:[12.5,22.3],x3:[11.7,16.2]},delay:{o3:.38}});
    }
    if(sw)add('Reset','1 retreats and reverses to 3. With X3 still guarding the right-hand lane, 3 swings on or resets. No forced shot.',
      {o1:[35.7,27.9],x5:[33.7,24.6],o5:[20.4,32.6],x2:[21.4,29.1],o2:[41.8,20.8],x1:[38.9,18.6]},2,{pass:[.63,1]});
    return frames;
  }
  return run
})()
