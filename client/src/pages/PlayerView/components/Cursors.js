import styled, { css } from 'styled-components'
import Cursor from 'pages/PlayerView/components/Cursor'


function createCursorCSS(props) {
	let styles = ''
	let clientList = Object.values(props.clients)
	for (let i = 0; i < clientList.length; i++) {
		styles += `
			#${clientList[i].id} {
				transform: translate(${clientList[i].x}px, ${clientList[i].y}px);
				display: ${clientList[i].display};
				${clientList[i].outOfView === 'top'
					? `svg {
							width: 10px;
							stroke: #fff;
							stroke-width: 1px;
							transform: rotate(180deg);
						}
						span {
							left: 50%;
							top: 18px;
							transform: translateX(-50%);
						}`
					: clientList[i].outOfView === 'bottom'
					? `svg {
							width: 10px;
							stroke: #fff;
							stroke-width: 1px;
							transform: translateY(-12px);
						}
						span {
							left: 135%;
							top: 15px;

							top: -27px;
							left: 50%;
							transform: translateX(-50%);
						}`
					: clientList[i].outOfView === 'left'
					? `svg {
							width: 10px;
							stroke: #fff;
							stroke-width: 1px;
							transform: rotate(90deg);
						}
						span {
							left: 110%;
							top: 50%;
							transform: translateY(-60%);
						}`
					: clientList[i].outOfView === 'right'
					? `svg {
							width: 10px;
							stroke: #fff;
							stroke-width: 1px;
							transform: translateX(-12px) rotate(-90deg);
						}
						span {
							left: -15px;
							top: 50%;
							transform: translate(-100%, -60%);
						}`
					: `svg {
							width: 15px;
						}
						span {
							left: 135%;
							top: 15px;
						}`
				}
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
    <StyledCursors id="cursors" clients={props.clients}>
			{Object.values(props.clients).map((client, idx) => (
				<Cursor
					key={client.id}
					id={client.id}
					name={client.name}
					color={client.color}
					outOfView={client.outOfView}
				></Cursor>
			))}
    </StyledCursors>
  )
}

export default Cursors
