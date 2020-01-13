import React from 'react';
import SpinnerIcon from './SpinnerIcon';
import './Spinner.css';

const Spin = props => {
    const styled = props.overlay ? {
        background: '#000000',
        height: '100vh',
        width: '100vw',
        position: 'fixed'
    } : null;
    return (
        <div className="Spin" style={styled}>
            <SpinnerIcon/>
        </div>
    )
}

export default Spin;
