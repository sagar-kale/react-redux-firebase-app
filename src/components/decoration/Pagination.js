import React from 'react'

export const Pagination = ({ projectPerPage, totalProjects, paginate, cur }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProjects / projectPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <ul className="pagination">
                <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                {pageNumbers.map(number =>
                    <li key={number} className={`waves-effect ${cur === number ? "active" : ""}`}>
                        <a onClick={() => paginate(number)} href="/#">{number}</a>
                    </li>
                )}
                <li className=" disabled waves-effect"><a href="/#"><i className="material-icons">chevron_right</i></a></li>
            </ul>
        </div>
    )
}
