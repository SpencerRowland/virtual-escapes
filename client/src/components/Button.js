import styled from 'styled-components'


const StyledButton = styled.button`
	background-color: ${props => props.isActive ? '#007bff' : 'transparent'};
	border: 2px solid #007bff;
	border-radius: 100px;
	${props => props.isActive && `
		box-shadow: 0 0 0 0.2rem rgba(38,143,255,.5);
	`}
	color: ${props => props.isActive ? '#e4e4e4' : '#007bff'};
	cursor: ${props => props.isActive ? 'default' : 'pointer'};
	font-weight: 900;
	padding: 8px 20px;
	position: relative;
	text-transform: uppercase;
	transition: all .2s;
	${props => !props.isActive && `
		&:hover {
			background-color: #007bff30;
			// color: #e4e4e4;
		}
	`}
`

const StyledActiveClients = styled.div`
	display: flex;
	left: 50%;
	position: absolute;
	top: 120%;
	transform: translateX(-50%);
`

const StyledActiveClient = styled.div`
	background-color: ${props => props.bgColor};
	border-radius: 9999px;
	height: 5px;
	width: 5px;
`


const Button = (props) => {

	function changeActiveAsset(e) {
		props.onClick(props.asset)
	}

	return (
    <StyledButton isActive={ props.isActive } onClick={changeActiveAsset}>
			{ props.asset.label }
			<StyledActiveClients>
				{Object.values(props.asset.activeClients).map((client, idx) => (
					<StyledActiveClient key={idx} bgColor={client.color[0]}></StyledActiveClient>
				))}
			</StyledActiveClients>
    </StyledButton>
  );
}

export default Button;
