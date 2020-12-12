import styled, {css} from 'styled-components'


const AssetContainer = styled.div`
	cursor: pointer;
	display: flex;
	flex-direction: column;
	margin-bottom: 16px;
	position: relative;
	span {
		color: #aaa;
		margin-top: 4px;
	}
`

const ImgContainer = styled.div`
	height: 0;
	padding-bottom: 56.25%;
	position: relative;
	width: 100%;
	div {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
		width: 100%;
		img {
			height: 100%;
			object-fit: contain;
			width: 100%;
		}
	}
`

const StyledActiveClients = styled.div`
	display: flex;
	flex-direction: column;
	${props => props.position === "left" ?
		css`right: -12px;` :
		css`left: -12px;`
	}
	position: absolute;
	top: 2px;
`

const StyledActiveClient = styled.div`
	background-color: ${props => props.bgColor};
	border-radius: 9999px;
	height: 6px;
	width: 6px;
	margin-bottom: 4px;
`

const AssetThumbnail = ({ activeAssetName, asset, onClick, position }) => {


	function changeActiveAsset(e) {
		onClick(asset)
	}
		
	return (
		<AssetContainer isActive={activeAssetName === asset.name} onClick={changeActiveAsset}>
			<ImgContainer>
				<div>
					<img src={asset.thumbnail} alt={asset.label}></img>
				</div>
			</ImgContainer>
			<span>{asset.label}</span>
			<StyledActiveClients position={position}>
				{Object.values(asset.activeClients).map((client, idx) => (
					<StyledActiveClient key={idx} bgColor={client.color[0]}></StyledActiveClient>
				))}
			</StyledActiveClients>
		</AssetContainer>
  )
}

export default AssetThumbnail
