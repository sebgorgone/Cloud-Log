import JumpWidget from '../components/JumpWidget';
import { useEffect, useState } from 'react'



function ResultsPage (props) {

   const svr = import.meta.env.VITE_SVR_URL;
   
   //state

   const [jumps, setJumps] = useState(null);

   //tags
   const [tagsArray, setTags] = useState(null)


   function flattenTagsMap(map) {
      if (!map || typeof map !== 'object') return [];
      const flattened = [];
      for (const [jumpRef, tags] of Object.entries(map)) {
         if (!Array.isArray(tags)) continue;
         for (const tag of tags) {
            flattened.push({
               name: tag.name,
               cat: tag.cat,
               jump_ref: Number(jumpRef),
            });
         }
      }
      return flattened;
   }

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
         const response = await fetch(`${svr}/gettags`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({jumpsIdArray: array}),
         });
         const data = await response.json();
         if(data.ok){
            console.log('results: ', data.results)
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
      setJumps(props.jumps);

      const flattenedFromServer = flattenTagsMap(props.tagsMap);
      if (flattenedFromServer.length > 0 || (props.tagsMap && Object.keys(props.tagsMap).length === 0)) {
         setTags(flattenedFromServer);
         return;
      }

      if (Array.isArray(props.jumps)) {
         getTags(props.jumps);
      } else {
         setTags(null);
      }
   }, [props.jumps, props.tagsMap]);

   

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