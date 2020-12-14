import { useState } from "react";
import styled, {css} from 'styled-components'


const StyledModal = styled.div`
	position: fixed;
	background: #ededed;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	display: ${props => props.show ? 'flex' : 'none'};
	z-index: 99;
	justify-content: center;
	align-items: center;
`

const StyledForm = styled.form`
	width: 100%;
	max-width: 500px;
	background: #fff;
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
	margin: 20px;
	padding: 20px;
	h1 {
		text-align: center;
		margin-bottom: 30px;
	}
	label {
		margin-bottom: 8px;
		text-align: center;
	}
	input {
		border: 1px solid #dedddc;
		border-radius: .25rem;
		font-size: .875rem;
    line-height: 1.25;
    padding: .5rem .75rem;
    width: 100%;
		color: rgba(0,0,0,0.87);
		box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06);
		margin-bottom: 16px;
		&:focus {
			outline: 0;
			box-shadow: 0 0 0 3px rgba(66,119,206,0.5);
		}
	}
	button {
		background-color: #716b67;
    color: #fff;
    font-size: 1rem;
    height: 2.25rem;
    line-height: 2.25rem;
    padding: 0 1.125rem;
    align-items: center;
    border: none;
    border-radius: .125rem;
    cursor: pointer;
    display: flex;
    font-family: inherit;
    font-weight: 400;
    position: relative;
    text-align: center;
    transition: all 0.2s ease-in-out 0s;
    user-select: none;
    vertical-align: middle;
		white-space: nowrap;
		max-width: 200px;
    margin: 0 auto;
    width: 200px;
		justify-content: center;
		&:hover {
			background-color: #56524f;
		}
	}
`


const Modal = (props) => {
	const {showModal, onSubmit} = props

	function setPlayerName(e) {
		e.preventDefault()
		onSubmit(e)
	}


	return (
    <StyledModal show={showModal}>
			<StyledForm onSubmit={setPlayerName}>
				<h1>Virtual Escapes</h1>
				<label>Enter Your Name</label>
				<input name="playerName" type="text" />
				<button type="submit" >Submit</button>
			</StyledForm>
    </StyledModal>
  );
}

export default Modal;
