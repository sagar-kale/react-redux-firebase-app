import React from 'react'
import { Link } from 'react-router-dom'

export const PageHeader = (props) => {

    const { pageName } = props;
    return (
        <div>
                <div className="chip grey darken-3">
                    <div className="col s12">
                        <Link to="/" className="breadcrumb">Home</Link>
                        <Link to="/" className="breadcrumb">Posts</Link>
                        <span className="breadcrumb">{pageName}</span>
                    </div>
                </div>
        </div>
    )
}

export default PageHeader;