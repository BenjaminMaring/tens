import React from 'react';

export default function Box(props) {


    return (
        <button className={props.isLocked ? "box box-locked" : "box box-unlocked"} onClick={props.toggleLock}>{props.num}</button>
    )
}