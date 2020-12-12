import { useState } from "react";
import styled, {css} from 'styled-components'


const StyledModal = styled.div`
	position: fixed;
	background: #fff;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	display: ${props => props.show ? 'flex' : 'none'};
	z-index: 99;
	justify-content: center;
	align-items: center;
`

const StyledForm = styled.div`
	width: 500px;
	height: 500px;
	background: gray;
	display: flex;
	flex-direction: column;
`


const Modal = (props) => {
	const {showModal, onClick} = props

	function setPlayerName(e) {
		onClick(e)
	}


	return (
    <StyledModal show={showModal}>
			<StyledForm >
				<label>Name</label>
				<input name="playerName" type="text" />
				<button type="submit" onClick={setPlayerName}>Submit</button>
			</StyledForm>
    </StyledModal>
  );
}

export default Modal;
