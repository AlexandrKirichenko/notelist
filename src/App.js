import React, {useId, useState} from 'react'
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [parId, setParId] = useState(null);
  
  const [notes, setNotes] = useState({
    1: {title: 'title 1', parentId: 0},
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
      if (parentId || 0) {
        notesForRender[parentId].children.push(notesKey);
      }
    });
    
    return notesForRender;
  };
  
  const notesForRender = getNotes(notes);
  
  console.log('notesForRender',notesForRender)
  
  const [addSubElementParentId, setAddSubElementParentId] = useState(null);
  const [addSubElementTitle, setAddSubElementTitle] = useState('');
  const [ITitle,setITitle] = useState('');
  
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
  
  const handleAdd = (id,title) => {
    const newMaxId = maxId + 1;
    setMaxId(newMaxId);
    setNotes(prev => ({...prev, [newMaxId]: {title: title, parentId: Object.values(notes).at(-1).parentId}}))
    setITitle('')
  }
  
  const Notes = ({id}) => {
    
    return (
      <>
        <div>
          <input type="text" value={ITitle}
                 autoFocus={true}
                 onChange={e => setITitle(e.target.value)}/>{' '}
  
          <button onClick={() => handleAdd(id, ITitle)}>ADD</button>
        </div>
        
      <div key={id}  style={{
        padding: "20px",
        border: '1px solid black',
        width: 'fit-content',
        display: "flex",
        flexDirection: "column",
        gap: '20px'
      }}>
        
        <div>
          {notesForRender[id].title}
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
      </>
    )
  }
  
  
  return (
    <div>
      <Notes id={1}/>
    </div>
  );
}

export default App;
