import styled from 'styled-components'


const StyledPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	width: 100%;
`

const StyledPageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`

const Header = styled.header`
	background-color: #252525;
	flex: 0 0 56px;
	width: 100%;
`

const LogoContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px 0;
	width: 230px;
`

const Logo = styled.img`
	max-width: 100px;
	object-fit: contain;
`

const Content = styled.div`
	background-color: #000;
	display: flex;
	flex: 1 1 0;
	overflow: hidden;
	width: 100%;
`

const Container = ({ children }) => {
  return (
    <StyledPageContainer>
			<Header>
				<LogoContainer>
					{/* <Logo src={ tegLogo } />
					<Logo src={ gameLogo } /> */}
				</LogoContainer>
			</Header>
			<Content>
				{ children }
			</Content>
    </StyledPageContainer>
  );
}

export default Container;
