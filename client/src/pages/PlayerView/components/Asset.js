import styled from 'styled-components'


const StyledAsset = styled.div`
	bottom: 0;
	background-color: black;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	img.asset {
		height: 100%;
		object-fit: contain;
		width: 100%;
	}
`

const Asset = (props) => {
	const id = props.assetType === "pannellum" ? "360" : props.assetType
	// const isActiveAsset = (props.activeAsset.type === props.assetType)
	const isActiveAsset = (props.activeAsset.type === props.assetType || id === '360')
	return (
    <StyledAsset id={id} style={{ display: isActiveAsset ? 'block' : 'none' }}>
				{ props.children }
    </StyledAsset>
  );
}

export default Asset;
