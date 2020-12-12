import styled from 'styled-components'


const StyledAsset = styled.div`
	align-items: center;
	bottom: 0;
	background-color: #000;
	display: flex;
	justify-content: center;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	img.asset {
		max-height: 100%;
		max-width: 100%;
		object-fit: contain;
	}
`

const Asset = (props) => {
	const id = props.assetType === "pannellum" ? "360" : props.assetType
	// const isActiveAsset = (props.activeAsset.type === props.assetType)
	const isActiveAsset = (props.activeAsset.type === props.assetType || id === '360')
	return (
    <StyledAsset id={id} style={{ display: isActiveAsset ? 'flex' : 'none' }}>
				{ props.children }
    </StyledAsset>
  );
}

export default Asset;
