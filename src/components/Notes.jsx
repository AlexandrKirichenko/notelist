import React, {useId, useState} from 'react'
import './App.css';


function App() {
  const [value, setValue] = useState('');
  const [parId, setParId] = useState(null);
  
  const [notes, setNotes] = useState({
    1: {title: 'title 1', parentId: 0},
    2: {title: 'title 2', parentId: 1},
    3: {title: 'title 3', parentId: 1},
    4: {title: 'title 4', parentId: 2},
    5: {title: 'title 5', parentId: 2},
    6: {title: 'title 6', parentId: 3},
    7: {title: 'title 7', parentId: 3},
    8: {title: 'title 8', parentId: 7},
    9: {title: 'title 9', parentId: 7},
  },);
  
  const [maxId, setMaxId] = useState(9);
  
  // console.log('value: ', value, 'parId: ', parId, 'notes:', notes);
  
  
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
  
  console.log('notesForRender',notesForRender)
  
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
  
  
  const Notes = ({id}) => {
    
    return (
      <div key={id} style={{
        padding: "20px",
        border: '1px solid black',
        width: 'fit-content',
        display: "flex",
        flexDirection: "column",
        gap: '20px'
      }}>
        <div>
          {notesForRender[id].title}{` - `}
          {
            id === addSubElementParentId
            ?
            <div>
              Введите заголовок
              <input type="text" value={addSubElementTitle}
                     autoFocus={true}
                     onChange={e => setAddSubElementTitle(e.target.value)}/>{' '}
              
              <button onClick={() => handleSaveSubElement(id, addSubElementTitle)}>Сохранить</button>
              {' '}
              <button onClick={handleAddSubElementCancel}>Отмена</button>
            </div>
            : <button
              onClick={() => handleAddSubElement(id)}>add субэлемент</button>
          }
        </div>
        
        <div style={{
          paddingLeft: '20px', display: "flex",
          flexDirection: "column",
          gap: '20px'
        }}>{notesForRender[id].children.map((childId) => <Notes key={childId} id={childId}/>)}</div>
      
      </div>
    )
  }
  
  
  return (
    <div>
      <Notes id={1}/>
    </div>
  );
}

export default App;
