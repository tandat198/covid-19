import React from "react";

const Loader = (props) => (
    <svg style={{ height: "10%" }} viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'>
        <path d='M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50' fill={props.fill ? props.fill : "#3e8ef7"} stroke='none' transform='rotate(53.2058 50 51)'>
            <animateTransform attributeName='transform' type='rotate' dur='1s' repeatCount='indefinite' keyTimes='0;1' values='0 50 51;360 50 51'></animateTransform>
        </path>
    </svg>
);

export default Loader;
