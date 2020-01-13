import React, { useState} from 'react';
import useSpinner from './useSpinner';
import "./Spinner.css";

function Spinner() {
    const [overlay, setOverlay] = useState(false);
    const [spinner, showSpinner, hideSpinner] = useSpinner(overlay);

    const Load = () => {
        showSpinner();
        setTimeout(() => hideSpinner(), 3000);
    };
    return (
        <div className="Spinner">
            <div className="Input-group">
            <label className="labelBox" htmlFor="overlay">Overlay</label>
            <input 
            className="checkBox"
            type="checkbox" 
            name="overlay"
            onChange={e => setOverlay(e.target.checked)} 
            value={overlay}
            /> 
        </div>
        <button className="spinBTN" onClick={Load}>Submit</button>
        {spinner}
        </div>
    )
}

export default Spinner;
