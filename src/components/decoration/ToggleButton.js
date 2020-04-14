import React from 'react'

const ToggleButton = (props) => {
    const { isLoading, btnName, disableBtnName } = props;
    return (
        <div>
            {
                isLoading ? <button className="btn disabled z-depth-0">{disableBtnName}</button>
                    : <button type="submit" className="btn pink lighten-1 z-depth-0">{btnName}</button>
            }
        </div>
    )
}

export default ToggleButton;
