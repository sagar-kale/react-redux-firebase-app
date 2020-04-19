import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/productActions';
import ToggleButton from '../decoration/ToggleButton';

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
        this.createProject(this.state);
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="gray-text text-darken-3">Create New Post</h5>
                    <div className="input-field">
                        <label htmlFor="title">Post Title</label>
                        <input type="text" id="title" onChange={this.handleChange} required minLength="5" maxLength="40" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Post Content</label>
                        <textarea className="materialize-textarea" id="content"
                            onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                        <ToggleButton btnName="Create" disableBtnName="Sending Post..." isLoading={this.props.isLoading} />
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log('under comp create pr', state);
    return {
        isLoading: state.project.isLoading
    }
}
export default connect(mapStateToProps, { createProject })(CreateProject);
