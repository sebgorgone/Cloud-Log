import JumpWidget from '../components/JumpWidget';
import { useEffect, useState } from 'react'



function ResultsPage (props) {

   console.log("results page sees", props.jumps)
   
   //state

   const [jumps, setJumps] = useState(null);

   //pdf
   function unPackPdf(obj) {
  const base64Bytes = new Uint8Array(obj.data);
  const b64String = new TextDecoder().decode(base64Bytes);

  const binaryString = atob(b64String);

  const len = binaryString.length;
  const pdfUint8 = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    pdfUint8[i] = binaryString.charCodeAt(i);
  }

  const pdfBlob = new Blob([pdfUint8], { type: 'application/pdf' });
  return pdfBlob;
   }
   //tags
   const [tagsArray, setTags] = useState(null)

   function getTags (jumpsArray) {
      let jumpsIdArray = [];
      if (Array.isArray(jumpsArray)) {
         for (let jump of jumpsArray) {
            jumpsIdArray.push(jump.jump_id)
         }
      }
   tagsRoute(jumpsIdArray)
   
}

const tagsRoute = async (array) => { 
   console.log('async func data sees: ', array);
      try {
         const response = await fetch('http://localhost:5009/gettags', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({jumpsIdArray: array}),
         });
         const data = await response.json();
         if(data.ok){
            const flattenedTags = data.results.flatMap(r =>
              r.tags.map(inner => ({ name: inner.name, cat: inner.cat, jump_ref: r.jump_ref }))
            );
            console.log('Flattened tagsArray:', flattenedTags);
            setTags(flattenedTags);
            
         }
         else {
            console.error('no tags imported', data)
         }
      } catch (err) {
         console.error('client failed to load user tags')
      }
   }

   function getThisJumpsTags(id) {
     if (!Array.isArray(tagsArray)) return [];
     const thisJumpsTags = tagsArray
       .filter(tag => tag.jump_ref === id)
       .map(tag => ({ name: tag.name, cat: tag.cat }));
   //   console.log('retrieved tags for jump_id:', id, '->', thisJumpsTags);

     return thisJumpsTags.map((tag, idx) => {
         return(
            <div key={idx}>
            <p>{tag.name}</p>
            </div>
         )
      })
   }

   //useEffect 
   useEffect(() => {
      Array.isArray(jumps) && getTags(jumps);
      setJumps(props.jumps);
   }, [props.jumps]); 
   

   return (
      <div>


         {Array.isArray(jumps) ? jumps.map((jump, idx) => (
            <div key={idx}
               style={{marginBottom: "2.5vh", marginTop: "1vh"}}
            >
               {Array.isArray(jumps) && <JumpWidget 
                  jumpNum={jump.jump_num}
                  jumpDate={jump.jump_date.slice(0,10)}
                  dz={jump.dropzone}
                  aircraft={jump.aircraft}
                  rig={jump.equipment}
                  exitAlt={jump.alt}
                  time={jump.t}
                  notes={jump.notes}
                  signature={unPackPdf(jump.pdfSig)}
                  jump_id={jump.jump_id}
                  tags={getThisJumpsTags(jump.jump_id)}
                  context={"gathered"}
               /> }
            </div>
         )) : <p style={{fontFamily: "L1", textAlign: "center"}}>{'loading...'}</p>}
      </div>
   );
}

export default ResultsPage