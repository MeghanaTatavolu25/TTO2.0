import React from 'react';
import LoginPage from '../subtl-react/src/Pages/LoginPage/LoginPage.tsx';

const Randomtry = () => {
  return (
    <div style={{paddingTop:"10em"}}>
      <LoginPage />
      <h1>heyy</h1>
    </div>
  );
};

export default Randomtry;



// <Modal
// isOpen={modalIsOpen}
// onRequestClose={closeModal}
// contentLabel="Example Modal"
// style={{
//     overlay: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'rgba(71, 70, 70, 0.75)',
//     },
//     content: {
//         width: '60%',
//         height: '60%',
//         margin: 'auto',
//         backgroundColor: 'linear-gradient(0deg, rgba(2, 134, 142, 0.05), rgba(2, 134, 142, 0.05)), #FFFBFE',
//         borderRadius: '10px',
//     },
// }}
// >


// <Grid container spacing={0} >
//     <Grid item xs={4} sm={4} md={4}>
//         {/* <p style={{ color: "#2C2C2C", fontSize: "1.87vw", fontWeight: 600 }}>Upload Technology</p> */}
//     </Grid>
//     <Grid item xs={4} sm={4} md={4}>
//         <p style={{ textAlign: 'center', font: "Prompt", fontSize: "1.63vw", fontColor: "#2C2C2C", fontWeight: "400" }}>Add Technology</p>
//     </Grid>
//     <Grid item xs={3} sm={3} md={3}>
//         {/* <Button variant="contained" style={{ font: "Roboto", fontWeight: 500, textTransform: 'none', fontSize: "1.14vw", backgroundColor: '#09A5AF', color: '#FFFFFF', borderRadius: "2.7vw", padding: "1vw 2.2vw", maxHeight: '3.2vw' }}>
//         Upload Technology
//     </Button> */}
//     </Grid>
//     <Grid item xs={1} sm={1} md={1} container justify="flex-end">
//         <button onClick={closeModal} style={{ transform: 'scale(0.6)', width: '1.5vw', height: '1.5vw', borderRadius: '1vw' }}>X</button>
//     </Grid>
// </Grid>




// <form onSubmit={handleSubmit}>
//     <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '32px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>
//         <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Name</label>
//         <input
//             type="text"
//             value={techName}
//             onChange={(e) => settechName(e.target.value)}
//             style={{ width: '50%', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}
//         />
//     </div>

//     <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '32px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>
//         <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Center Name</label>
//         <select value={techCenter} onChange={(e) => settechCenter(e.target.value)} style={{ width: '100%', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}>
//             {centers.map(result => (
//                 <option value={result.Name}>{result.Name}</option>
//             ))}
//         </select>
//     </div>

//     <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '32px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>
//         <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Faculty Name</label>
//         <select value={techCenter} onChange={(e) => settechFaculty(e.target.value)} style={{ width: '100%', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}>
//             {faculties.map(result => (
//                 <option value={result.Name}>{result.Name}</option>
//             ))}
//         </select>
//     </div>



//     <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '32px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>

//         <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Overview of Technology</label>
//         <input
//             type="text"
//             value={techOverview}
//             onChange={(e) => settechOverview(e.target.value)}
//             style={{ width: '100%', height: '14vh', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}

//         />
//     </div>

//     <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '32px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>

//         <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Description of Technology</label>
//         <input
//             type="text"
//             value={techDescription}
//             onChange={(e) => settechDescription(e.target.value)}
//             style={{ width: '100%', height: '14vh', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}

//         />
//     </div>
//     <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '32px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>

//         <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Potential Applications</label>
//         <input
//             type="text"
//             value={potentialApplications}
//             onChange={(e) => setpotentialApplications(e.target.value)}
//             style={{ width: '100%', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}

//         />
//     </div>
//     <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '32px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>

//         <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Related Publications</label>
//         <input
//             type="text"
//             value={relatedPublications}
//             onChange={(e) => setrelatedPublications(e.target.value)}
//             style={{ width: '100%', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}

//         />
//     </div>
//     <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '32px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>

//         <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Type of Work</label>
//         <input
//             type="text"
//             value={typeOfWork}
//             onChange={(e) => settypeOfWork(e.target.value)}
//             style={{ width: '100%', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}

//         />
//     </div>
//     <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '32px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>

//         <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>State of Work</label>
//         <input
//             type="text"
//             value={stateofWork}
//             onChange={(e) => setstateofWork(e.target.value)}
//             style={{ width: '100%', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}

//         />
//     </div>
//     <div style={{ marginBottom: '2%', marginLeft: '2%', marginRight: '2%', display: 'flex', alignItems: 'center', fontFamily: 'Prompt', fontStyle: 'normal', fontWeight: 300, fontSize: '32px', lineHeight: '48px', letterSpacing: '-0.04em', color: '#2C2C2C' }}>

//         <label style={{ flex: '0 0 10.8vw', marginRight: '7%' }}>Demo Link</label>
//         <input
//             type="text"
//             value={demoLink}
//             onChange={(e) => setdemoLink(e.target.value)}
//             style={{ width: '100%', backgroundColor: '#F1FEFF', border: '1px solid #09A5AF', boxSizing: 'border-box', paddingLeft: '5px', paddingRight: '1px' }}

//         />
//     </div>

//     <div style={{ bottom: '10px', right: '0%' }}>
//         <Grid container spacing={0} justify="space-between">
//             <Grid item xs={4} sm={4} md={4}>
//                 {/* <p style={{ color: "#2C2C2C", fontSize: "1.87vw", fontWeight: 600 }}>Upload Technology</p> */}
//             </Grid>
//             <Grid item xs={4} sm={4} md={4}>
//                 {/* <p style={{ color: "#2C2C2C", fontSize: "1.87vw", fontWeight: 600 }}>Upload Technology</p> */}
//             </Grid>
//             <Grid item xs={4} sm={4} md={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button type="submit" variant="contained" style={{ font: "Roboto", fontWeight: 500, textTransform: 'none', fontSize: "1.14vw", backgroundColor: '#09A5AF', color: '#FFFFFF', borderRadius: "2.7vw", padding: "1vw 2.2vw", maxHeight: '3.2vw' }}>
//                     Upload Patent
//                 </Button>
//             </Grid>

//         </Grid>
//     </div>
// </form>
// </Modal>