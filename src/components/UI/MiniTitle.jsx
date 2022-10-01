import React from 'react';
import cl from '../../styles/MiniTitle.module.css'
const MiniTitle = ({text}) => {
    return (<div className={cl.miniTitle}>{text}</div>);
};

export default MiniTitle;
