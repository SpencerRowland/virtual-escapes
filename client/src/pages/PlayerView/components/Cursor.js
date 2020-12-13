import React from "react";

import styled, {css} from 'styled-components'
import {ReactComponent as CursorSVG} from 'images/cursor.svg'
import {ReactComponent as CaretSVG} from 'images/caret-up.svg'


const StyledCursor = styled.div`
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
	
const Cursor = ({id, name, color, outOfView}) => {

	console.log('re-rendered cursor: ', id)

	return (
			<StyledCursor id={id} className="cursor" color={color} outOfView={outOfView}>
				{outOfView
					? <CaretSVG />
					: <CursorSVG />
				}
				<span>{name}</span>
			</StyledCursor>
  )
}

function cursorPropsAreEqual(prevCursor, nextCursor) {
	return prevCursor.id === nextCursor.id 
		&& prevCursor.name === nextCursor.name
		&& prevCursor.outOfView === nextCursor.outOfView
}

export default React.memo(Cursor, cursorPropsAreEqual);
