import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;


export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -35px;

  animation: ${appearFromLeft} 1s;

  h3 {
    font-size: 15px;
    color: #023e8a;
  }

  form {
    margin: 10px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-top: -35px;
      margin-bottom: 10px;
    }

    a {
      color: ${props => props.theme.colors.text};
      font-weight: bold;
      display: block;
      margin-top: 10px;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: ${props => props.theme.colors.text};
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.3s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#023e8a')};
    }
  }
`;
