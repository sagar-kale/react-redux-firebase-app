import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/productActions';

class CreateProject extends Component {
    state = {
        title: '',
        content: ''
    }

    createProject(project) {
        this.props.createProject(project);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.createProject(this.state);
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="gray-text text-darken-3">Create New Project</h5>
                    <div className="input-field">
                        <label htmlFor="title">Project Title</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Project Content</label>
                        <textarea className="materialize-textarea" id="content"
                            onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}
// const mapStateToProps = (state) => {
//     console.log('under comp create pr',state);
//     return {
//         project: state.project
//     }
// }
export default connect(null, { createProject })(CreateProject);
