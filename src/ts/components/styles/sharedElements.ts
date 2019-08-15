import styled from "styled-components";
import { green } from './themes';

export const Button = styled('button')` 
    display: inline-block;
    position: relative;
    padding: 10px 20px;
    border: 1px solid ${green};
    background-color: white

    font-size: 14px;
    color: ${green};
    cursor: pointer;
    user-select: none;

    &:active {
        background: #169499;
    }
`;

export const ButtonGreen = styled('button')` 
	display: inline-block;
	position: relative;
    padding: 10px 20px;
	border: 1px solid ${green};
    background: ${green}
    color: white;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
    
    font-color: white
    &:active {
        background: #169499;
    }
`;

export const ButtonUnstyled = styled('button')`
    background: transparent;
    border: none;
`;

export const Controls = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    min-width: 300px;
    margin: 10px 5px;
`;

export const Display = styled('div')`
    font-size: 16px;
    justify-self: left;
    margin: 5px 0px;
`;

export const BoldDisplay = styled('div')`
font-size: 16px;
justify-self: left;
font-weight: bold;
margin: 5px 0px;
`;