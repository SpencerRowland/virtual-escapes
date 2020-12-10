import styled, { css } from 'styled-components'
import Cursor from 'pages/PlayerView/components/Cursor'


function createCursorCSS(props) {
	let styles = ''
	let clientList = Object.values(props.clients)
	console.log(Object.keys(props.clients))
	for (let i = 0; i < clientList.length; i++) {
		styles += `
			#${clientList[i].id} {
				transform: translate(${clientList[i].x}px, ${clientList[i].y}px);
				display: ${clientList[i].display};
			}
		`
	}
	return css`${styles}`
}

const StyledCursors = styled.div`
	${props => createCursorCSS(props)}
`

const Cursors = (props) => {
	return (
    // <div id="cursors" clients={props.clients}>
		// 	{Object.values(props.clients).map((client, idx) => (
		// 		<Cursor key={client.id} client={client}></Cursor>
		// 	))}
    // </div>
    <StyledCursors id="cursors" clients={props.clients}>
			{Object.values(props.clients).map((client, idx) => (
				<Cursor
					key={client.id}
					id={client.id}
					name={client.name}
					color={client.color}
				></Cursor>
			))}
    </StyledCursors>
  )
}

export default Cursors
