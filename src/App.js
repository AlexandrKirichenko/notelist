import React, {useId, useState} from 'react'
import './App.css';
import InputNote from './components/InputNote'

function App() {
  const [value, setValue] = useState('');
  const [parId,setParId] = useState(null);
  const [notes,setNotes] = useState({[new Date().getTime()] : { title: '', parentId: parId }});
  
  // notes-item2Data
  // getNotes-getnotesForRender
  // notesForRender-notesForRender
  const getNotes = (notes)=> {
    const notesForRender = {};
    const notesKeyList = Object.keys(notes);
    
    console.log('notesKeyList',notesKeyList)
    
    notesKeyList.forEach((notesKey) => {
      const { parentId, ...currentNotesForRender } = notes[notesKey];
      if (!notesForRender[notesKey]) {
        notesForRender[notesKey] = {
          ...currentNotesForRender,
          children: [],
        };
      }
    });
    notesKeyList.forEach((notesKey) => {
      const { parentId } = notes[notesKey];
      if (parentId) {
        notesForRender[parentId].children.push(notesKey);
      }
    });
    
    return notesForRender;
  };
  
  const notesForRender = getNotes(notes);
  
  console.log('notesForRender', notesForRender)
  
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addNote();
  };
  
  const addNote = () => {
    console.log('notes1', notes)
    if (value) {
      setNotes(prev=>({
          ...prev,
          [new Date().getTime()]:  { title: value, parentId: parId }
        })
      );
      setValue('');
    }
  };
  
  console.log('notes2', notes)

const addSublist = () => {
  setParId(Object.keys(notes).at(-1))
  console.log(parId)
};
  
  // const Notes = ( { notesForRender} ) => {
  //   return (
  //
  //     Object.keys(notes).map(id =>  <ul key={notesForRender[id].title}>
  //       <li>
  //         <span>{notesForRender[id].title}</span>
  //         {notesForRender[id].children.map((childId) => <Notes key={notesForRender[id].title} id={childId} parentId={id} notesForRender={notesForRender}/>)}
  //       </li>
  //     </ul>)
  //   )
  // }
  
  let lastId =  Object.keys(notes).at(-1)
  
  console.log('lastId',lastId)
  
  return (
    <div>
      {/*<Notes notesForRender={notesForRender}/>*/}
      <InputNote value={value} onChange={handleChange} onKeyDown={handleKeyDown} placeholder='Type here...' />
      <button onClick={addNote}>Add</button>
      <button onClick={addSublist}>Add Sublist</button> 
    </div>
  );
}

export default App;