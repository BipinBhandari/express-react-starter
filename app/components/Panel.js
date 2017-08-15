import React from 'react';

export default (props) => {
    return <div className="panel">
        <div className="panel-body">
            {props.children}
        </div>
    </div>
}