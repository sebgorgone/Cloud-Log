import JumpWidget from './JumpWidget';

function FullJumpLedg (props) {


   const jumps = props.jumps;

   function unPackPdf(obj) {
  // 1) Rebuild a Uint8Array from obj.data
  const base64Bytes = new Uint8Array(obj.data);
  // 2) Decode those bytes into a UTF-8 string (the Base64 text)
  const b64String = new TextDecoder().decode(base64Bytes);
  //    (At this point b64String === "JVBERi0xLjQKJYGBgYEKMSAwIG9iago8PC9UeXBlIC9QREYvRGV2aWNlUk…" )

  // 3) Decode the Base64 string into a binary string
  const binaryString = atob(b64String);

  // 4) Convert that binary string into a Uint8Array of PDF bytes
  const len = binaryString.length;
  const pdfUint8 = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    pdfUint8[i] = binaryString.charCodeAt(i);
  }

  // 5) Wrap those bytes in a Blob, using the PDF MIME type
  const pdfBlob = new Blob([pdfUint8], { type: 'application/pdf' });
  return pdfBlob;
}

   
   

   return (
      <div>
         {jumps ? jumps.map((jump, idx) => (
            <div key={idx}
               style={{marginBottom: "2.5vh", marginTop: "1vh"}}
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
                  signature={unPackPdf(jump.pdfSig)}
                  jump_id={jump.jump_id}
                  context={"gathered"}
        
               /> 
            </div>
         )) : <p style={{fontFamily: "L1", textAlign: "center"}}>loading</p>}
      </div>
   );
}

export default FullJumpLedg