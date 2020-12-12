import styled from 'styled-components'

import AssetThumbnail from 'pages/PlayerView/components/AssetThumbnail'


const StyledAssetContainer = styled.div`
	display: flex;
	flex: 0 0 175px;
	flex-direction: column;
`

const StyledAssetHeader = styled.div`
	color: #fff;
	text-align: ${props => props.position === 'left' ? "left" : "right"};
	text-transform: uppercase;
	font-size: 13px;
	font-weight: 500;
	margin: ${props => props.position === 'left' ? "10px 0 10px 22px" : "10px 22px 10px 0"};
`

const StyledAssetList = styled.div`
	display: flex;
	flex: 1 1 0;
	flex-direction: column;
	overflow: auto;
	padding: ${props => props.position === 'left' ? "5px 12px 16px 18px" : "5px 18px 16px 12px"};
	position: relative;
	span {
		text-align: ${props => props.position};
	}
	.simplebar-scrollbar:before {
		background-image: linear-gradient(-131deg, rgb(103, 101, 101) 0%, rgb(51, 51, 51) 100%);
	}
`

const AssetContainer = (props) => {
	const {position, assets, activeAssetName, changeActiveAsset, header, section} = props
	const simplebarDirection = position === 'left' ? 'rtl' : 'ltr'

	return (
		<StyledAssetContainer>
			<StyledAssetHeader position={position}>{header}</StyledAssetHeader>
			<StyledAssetList
				position={position}
				data-simplebar
				data-simplebar-direction={simplebarDirection}
				data-simplebar-auto-hide="false"
			>
				{assets.filter(asset => asset.section === section).map((asset, idx) => (
					<AssetThumbnail
						key={idx}
						asset={asset}
						activeAssetName={activeAssetName}
						onClick={changeActiveAsset}
						position={position}
					>
					</AssetThumbnail>
				))}
			</StyledAssetList>
    </StyledAssetContainer>
  );
}

export default AssetContainer;
