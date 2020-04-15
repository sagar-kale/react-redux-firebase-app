import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { Pagination } from '../decoration/Pagination';
import Loader from '../layout/Loader';
import ProjectList from '../projects/ProjectList';
import Notifications from './Notifications';

class Dashboard extends Component {
    state = {
        currentPage: 1,
        projectPerPage: 4
    }
    indexFirstProject = 0
    indexLastProject = 0
    currentProject = [];
    setUpPagination = (projects) => {
        this.indexLastProject = this.state.currentPage * this.state.projectPerPage;
        this.indexFirstProject = this.indexLastProject - this.state.projectPerPage;
        this.currentProject = projects.slice(this.indexFirstProject, this.indexLastProject);
    }

    changePage = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        });
    }


    render() {
        const { projects } = this.props;
        if (!isLoaded(projects))
            return (
                <Loader />
            )

        this.setUpPagination(projects);
        return (
            <div className="container dashboard">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={this.currentProject} />
                        <Pagination
                            projectPerPage={this.state.projectPerPage}
                            totalProjects={projects.length}
                            paginate={this.changePage}
                            cur={this.state.currentPage} />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications />
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        projects: state.firestore.ordered.projects
    };
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        { collection: 'projects', orderBy: ['createdAt', 'desc'] }
    ])
)(Dashboard); 