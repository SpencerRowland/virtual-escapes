import React from "react";

import styled from 'styled-components'
import {ReactComponent as CursorSVG} from 'images/cursor.svg'


const StyledCursor = styled.div`
	svg {
		width: 15px;
	}
	span {
		background-color: ${props => props.color[0]};
		border: 1px solid ${props => props.color[1]};
		border-radius: 8px;
		color: ${props => props.color[1]};
		font-size: 10px;
		left: 135%;
		padding: 0 5px;
		position: absolute;
		top: 15px;
	}
`
	
const Cursor = ({id, name, color}) => {

	console.log('re-rendered cursor: ', id)

	return (
			<StyledCursor id={id} className="cursor" color={color}>
				<CursorSVG />
				<span>{id}</span>
			</StyledCursor>
  )
}

function cursorPropsAreEqual(prevCursor, nextCursor) {
	return prevCursor.id === nextCursor.id 
		&& prevCursor.name === nextCursor.name
}

export default React.memo(Cursor, cursorPropsAreEqual);
