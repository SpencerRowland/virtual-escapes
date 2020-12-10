import styled from 'styled-components'

import bgImg from 'images/bg.jpg'
import gameLogo from 'images/game-logo.png'
import tegLogo from 'images/teg_lock_logo.png'


const StyledPageContainer = styled.div`
	background-image: url(${bgImg});
	background-size: 100% 100%;
	min-height: 100vh;
	position: relative;
	width: 100%;
`

const StyledPageWrapper = styled.div`
	margin: 0 auto;
	max-width: 1000px;
`

const Header = styled.header`
	display: flex;
	justify-content: center;
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

const Container = ({ children }) => {
  return (
    <StyledPageContainer>
			<StyledPageWrapper>
				<Header>
					<LogoContainer>
						<Logo src={ tegLogo } />
						<Logo src={ gameLogo } />
					</LogoContainer>
				</Header>
				{ children }
			</StyledPageWrapper>
    </StyledPageContainer>
  );
}

export default Container;
