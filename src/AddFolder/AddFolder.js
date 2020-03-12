import React from 'react'
import ApiContext from '../ApiContext.js'
class AddFolder extends React.Component {
  static contextType = ApiContext;
  
  postFolder = (name) => {
    fetch(`http://localhost:9090/folders`, 
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: name})
      }
    )
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    .then((data) => {
      this.context.addFolder(data)
      this.props.history.push('/')
    })
    .catch(error => {
      console.error({ error })
    })
  }
  
  handleSubmit = (event, name) => {
      event.preventDefault();
      this.postFolder(name);
  }
  
  render(){
    return (
            <form className="" onSubmit= {e => {
              e.preventDefault();
              this.handleSubmit(e, e.target.name.value)}}>
                <label htmlFor= 'label-name'></label>
                <input type= 'name' 
                        name= 'name' 
                        id= 'name' 
                        placeholder= 'Folder Name' 
                        required/>
                <button type= 'submit'>Save</button>
            </form>
    );
  }
}

export default AddFolder