import React, { useState } from 'react';
import Spin from './Spin';

const useSpinner = overlay => {
    const [visible, setVisible] = useState(false);

    const showSpinner = () => setVisible(true);
    const hideSpinner = () => setVisible(false);
    const spinner = visible ? <Spin overlay={overlay}/> : null;

    return [spinner, showSpinner, hideSpinner];
}

export default  useSpinner;