import React, {Component} from 'react';

class ComposeMsg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      body: ''
    }
  }

  input = (e) => {
    const value = e.target.value
    const name = e.target.name

    this.setState({
      [name]: value
    })
  }


render(){
  return (
    <form className="form-horizontal well" onSubmit={this.submit}>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <h4>Compose Message</h4>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange={this.input} value={this.state.subject}></input>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="body" className="col-sm-2 control-label">Body</label>
        <div className="col-sm-8">
          <textarea name="body" id="body" className="form-control" onChange={this.input} value={this.state.body}></textarea>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <input type="submit" value="Send" className="btn btn-primary"></input>
        </div>
      </div>
    </form>
  )
  }
}
export default ComposeMsg;
