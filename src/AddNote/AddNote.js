 import React from 'react'
 import ApiContext from '../ApiContext'
 
 export default class AddNote extends React.Component {
     state = {notes: {
       name: '',
       content: '',
       folderId: ''
     }}
     
     static contextType = ApiContext

     setName = name => {
       this.setState({notes: {
        name: name,
        content: this.state.notes.content,
        folderId: this.state.notes.folderId
        }})
     }

     setContent = content => {
       this.setState({
         notes: {
           name: this.state.notes.name,
           content: content,
           folderId: this.state.notes.folderId
         }
       })
     }

     setFolderId  = folderId => {
      this.setState({
        notes: {
          name: this.state.notes.name,
          content: this.state.notes.content,
          folderId: folderId
        }
      })
    }
     
  postNote = () => {
    fetch(`http://localhost:9090/notes`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: this.state.notes.name,
          content: this.state.notes.content,
          folderId: this.state.notes.folderId
        })
      })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    .then((data) => {
      this.context.addNote(data)
      this.props.history.push('/')
    })
    .catch(error => {
      console.error({ error })
    })
  }
  
  
  
  render() {
    console.log(this.state.notes)
    const { folders } = this.context;
     return (
      <section>  
        <form onSubmit={e => {
          e.preventDefault()
          this.postNote()}}>
          <div>
            <label htmlFor= 'content'>Note Name</label>
            <input
              type='name'
              name='name'
              id='name'
              placeholder='Name of Note'
              required
              onChange={e => this.setName(e.target.value)}
              />
          </div>
          <div>>
            <label>Content goes here</label>
            <textarea
              name='content'
              id='content'
              placeholder='Content'
              onChange={e => this.setContent(e.target.value)}
              />
          </div>
          <div>
            <label htmlFor='folderId'>select folder</label>
            <select 
              type='text'
              name='folderId'
              id='folderId'
              required
              onChange={e => this.setFolderId(e.target.value)}
              >
                <option value='default'>Choose Folder</option>
                {folders.map(folder => {
                  return (
                    <option value={folder.id} key={folder.id}>
                      {folder.name}
                    </option>
                    )})}
            </select>
          </div>
          <div>
            <button type='submit'>Add Note</button>
          </div>
          </form>
        </section>
      )
    }
}
 

//  body: JSON.stringify({
//         name: data.name,
//         content: data.content,
//         folderId: data.folderId,
//         modified: data.modified
//       })