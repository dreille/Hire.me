import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const ProgressTracker = props => {

  const history = useHistory();

  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    console.log('props changed');
    console.log(props.appId);
    console.log(props.userId);

    if (props.appId !== undefined) {
      fetch(`/api/applications/${props.appId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          // set notes
          console.log('notes: ',res);
          setNotes(res.notes);
          setTodos(res.todos);
        });
    }
  }, [props, refresh]);

  function handleAddTodo(e) {
    e.preventDefault();
    const content = document.getElementById('todos-content').value;

    if (content !== '') {
      fetch(`/api/applications/${props.appId}/todos`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      })
        .then(res => {
          if (res.status === 200) {
            history.push(`/applicationView/${props.appId}`);
          }
        });
    }
  }

  function handleNoteDelete(e, noteId, appId) {
    e.preventDefault();
    fetch(`/api/applications/${props.appId}/note/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'applicaiton/json'
      }
    })
      .then(res => {
        if (res.status === 200) {
          setRefresh(!refresh);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }


  function handleAddNote(e) {
    e.preventDefault();
    const content = document.getElementById('notes-content').value;

    if (content !== '') {
      console.log('adding note');
      fetch(`/api/applications/${props.appId}/notes`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
        }),
      })
        .then(res => {
          if (res.status === 200) {
            console.log('refresh');
            history.push(`/applicationView/${props.appId}`);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  const handleTodoCheck = function(e, id) {
    // e.preventDefault();
    console.log(document.getElementById('todoCheck').checked);
    console.log(e.target.checked);

    // if (e.target.checked) {
      fetch(`/api/applications/${props.appId}/todo/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          checked: e.target.checked
        })
      })
        .then(res => {
          console.log(res);
          setRefresh(!refresh);
          // history.go(0);
        })
        .catch(err => {
          console.log('err: ',err)
        })
    // }
  }
  //`/api/applications/${appId}/todo/${id}`
  //`/api/applications/${appId}/note/${id}`
  
  let showNotes = notes?.sort((first, second) => {
    return first._id > second._id;
  }).map(note => {
    return (
      <li className="notes-list" key={note._id}>
        {note.content}
        <button
          type="button"
          id="noteDelete"
          className="list-group-item btn btn-dark"
          onClick={(e) => handleNoteDelete(e, note._id, note.applications_id)} >
            X
        </button>
      </li>
    )
  })

  const handleTodoDelete = function(e, todoId, appId) {
    e.preventDefault();
    fetch(`/api/applications/${appId}/todo/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setRefresh(!refresh);
        }
      })
  }
  
  let showTodos = todos?.sort((first, second) => {
    return first._id > second._id;
  }).map(todo => {
    return (
      <li className="todos-list" key={todo._id}>
        {todo.content}
        <div>
          <input 
            type = "checkbox"
            id ="todoCheck"
            className="list-group-item btn btn-dark"
            onChange={(e) => handleTodoCheck(e, todo._id)} checked={todo.checked}>
          </input>
          <button
            type="button"
            id="todoDelete"
            className="list-group-item btn btn-dark"
            onClick={(e) => handleTodoDelete(e, todo._id, todo.applications_id)} >
              X
          </button>
        </div>
      </li>
    );
  })


  return <div id="progress-tracker">

    <h1 id="todos-header">Todos</h1>
    <div id='todos-view' className="small-card card">
      <ul className='list-group list-group-flush'>
        {showTodos}
      </ul>
    </div>
    <form onSubmit={(e) => handleAddTodo(e)}>
      <textarea type="text" id="todos-content"></textarea>
      <br />
      <button className="btn btn-dark" type="submit">Add New Todo</button>
    </form>
    <br />
    <h1 id="notes-header">Notes</h1>
    <div id='notes-view' className="small-card card">
      <ul className='list-group list-group-flush'>
        {showNotes}
      </ul>
    </div>
    <form onSubmit={(e) => handleAddNote(e)}>
      <textarea type="text" id="notes-content"></textarea>
      <br />
      <button className="btn btn-dark" type="submit" >Add New Note</button>
    </form>
  </div>
}

export default ProgressTracker;
