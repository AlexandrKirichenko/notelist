// import React, { useState} from 'react'
// import './App.css';
// import InputNote from './components/InputNote'
//
// function App() {
//   const [value, setValue] = useState('');
//   const [parId,setParId] = useState(null);
//   const [notes,setNotes] = useState({[new Date().getMilliseconds()] : { title: '', parentId: parId }});
//
//   // notes-item2Data
//
//   const getNotes = (notes)=> {
//     const notesForRender = {};
//     const notesKeyList = Object.keys(notes);
//
//     console.log('notesKeyList',notesKeyList)
//
//     notesKeyList.forEach((notesKey) => {
//       const { parentId, ...currentNotesForRender } = notes[notesKey];
//       if (!notesForRender[notesKey]) {
//         notesForRender[notesKey] = {
//           ...currentNotesForRender,
//           children: [],
//         };
//       }
//     });
//     notesKeyList.forEach((notesKey) => {
//       const { parentId } = notes[notesKey];
//       if (parentId) {
//         notesForRender[parentId].children.push(notesKey);
//       }
//     });
//
//     return notesForRender;
//   };
//
//   const notesForRender = getNotes(notes);
//
//   console.log('notesForRender', notesForRender)
//
//   const handleChange = (e) => {
//     setValue(e.target.value)
//   }
//
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') addNote();
//   };
//
//   const addNote = () => {
//     console.log('notes1', notes)
//     if (value) {
//       setNotes(prev=>({
//           ...prev,
//           [new Date().getTime()]:  { title: value, parentId: parId }
//         })
//       );
//       setValue('');
//     }
//   };
//
//   console.log('notes2', notes)
//
// const addSublist = (id) => {
//   setParId(id)
//   console.log(parId)
// };
//
//   const Notes = ( { notesForRender} ) => {
//     return (
//       Object.keys(notesForRender).map(id =>  <ul key={notesForRender[id].title}>
//         <li>
//           <span>{notesForRender[id].title}</span>
//           {/*{notesForRender[id].children.map((childId) => <Notes  id={childId} parentId={id} notesForRender={notesForRender}/>)}*/}
//         </li>
//         <button onClick={() => addSublist(id)}>Add Sublist</button>
//       </ul>)
//     )
//   }
//
//   let lastId =  Object.keys(notes).at(-1)
//
//   console.log('lastId',lastId)
//
//   return (
//     <div>
//       <Notes notesForRender={notesForRender}/>
//       <InputNote value={value} onChange={handleChange} onKeyDown={handleKeyDown} placeholder='Type here...' />
//       <button onClick={addNote}>Add</button>
//
//     </div>
//   );
// }
//
// export default App;

import React, { useState} from 'react'
import './App.css';
import InputNote from './components/InputNote'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [value, setValue] = useState('');
  const [parId, setParId] = useState(null);
  
  const [notes, setNotes] = useState({
    1: {title: value, parentId: 0},

  },);
  
  const [maxId, setMaxId] = useState(9);
  
  console.log('value: ', value, 'parId: ', parId, 'notes:', notes);
  
  
  const getNotes = (notes) => {
    const notesForRender = {};
    const notesKeyList = Object.keys(notes);
    
    
    notesKeyList.forEach((notesKey) => {
      const {parentId, ...currentNotesForRender} = notes[notesKey];
      if (!notesForRender[notesKey]) {
        notesForRender[notesKey] = {
          ...currentNotesForRender,
          children: [],
        };
      }
    });
    notesKeyList.forEach((notesKey) => {
      const {parentId} = notes[notesKey];
      if (parentId) {
        notesForRender[parentId].children.push(notesKey);
      }
    });
    
    return notesForRender;
  };
  
  const notesForRender = getNotes(notes);
  
  console.log('notes2', notes)
  const [addSubElementParentId, setAddSubElementParentId] = useState(null);
  const [addSubElementTitle, setAddSubElementTitle] = useState('');
  
  const handleAddSubElement = (id) => {
    
    setAddSubElementParentId(id);
  }
  
  const handleAddSubElementCancel = () => {
    setAddSubElementParentId(null);
    setAddSubElementTitle('');
  }
  
  const handleSaveSubElement = (parentId, title) => {
    setAddSubElementParentId(null);
    setAddSubElementTitle('');
    
    const newMaxId = maxId + 1;
    setMaxId(newMaxId);
    
    const newSubItem = {title, parentId};
    
    setNotes(prev => ({...prev, [newMaxId]: newSubItem}))
  }
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
          [uuidv4()]: { title: value, parentId: parId }
        })
      );
    }
  };
  
  const Notes = ({id,value,handleChange,handleKeyDown}) => {
   
  
    return (
      <ul key={id} style={{
        padding: "20px",
        border: '1px solid black',
        width: 'fit-content',
        display: "flex",
        flexDirection: "column",
        gap: '20px'
      }}>
        <li>
          {notesForRender[id].title}{` - `}
          <input
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder='Type here...'
          />
          {
            id === addSubElementParentId
            ?
            <div>
              Введите заголовок
              <input type="text"
                     value={addSubElementTitle}
                     autoFocus={true}
                     onChange={e => setAddSubElementTitle(e.target.value)}/>{' '}
              
              <button onClick={() => handleSaveSubElement(id, addSubElementTitle)}>Сохранить</button>
              {' '}
              <button onClick={handleAddSubElementCancel}>Отмена</button>
            </div>
            : <button
              onClick={() => handleAddSubElement(id)}>add субэлемент</button>
          }
        </li>
        
        <ul style={{
          paddingLeft: '20px', display: "flex",
          flexDirection: "column",
          gap: '20px'
        }}><li>{notesForRender[id].children.map((childId) => <Notes key={childId} id={childId}/>)}</li></ul>
      
      </ul>
    )
  }
  
  return (
    <div>
      <Notes id={1} handleChange={handleChange} handleKeyDown={handleKeyDown}/>
    </div>
  );
}

export default App;

