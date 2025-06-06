import { useState } from 'react';
import JumpWidget from './JumpWidget';

function FullJumpLedg (props) {


   const jumps = props.jumps;

   
   

   return (
      <div>
         {jumps ? jumps.map((jump, idx) => (
            <div key={idx}
               style={{marginBottom: "1.5vh"}}
            >
               <JumpWidget 
                  jumpNum={jump.jump_num}
                  jumpDate={jump.jump_date.slice(0,10)}
                  dz={jump.dz}
                  aircraft={jump.aircraft}
                  rig={jump.equipment}
                  exitAlt={jump.alt}
                  time={jump.t}
                  notes={jump.notes}
                  signature={jump.pdfSig}
                  jump_id={jump.jump_id}
        
               /> 
            </div>
         )) : <p>loading</p>}
      </div>
   );
}

export default FullJumpLedg