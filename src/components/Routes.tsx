import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../App";
import { theme } from "../utils/theme";
import { css, Global, ThemeProvider } from "@emotion/react";
import "typeface-overpass";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          *,
          *:before,
          *:after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          html {
            text-rendering: optimizeLegibility;
            overflow-x: hidden;
            -ms-overflow-style: scrollbar;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          #gatsby-focus-wrapper {
            width: 100vw;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          body {
            display: flex;
            flex-direction: column;
            background: ${theme.colors.background.ddark};
            font-family: ${theme.fontFamily.body};
          }
          h1 {
            font-family: ${theme.fontFamily.heading};
          }
        `}
      />
      <BrowserRouter>
        {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/me">Me</Link>
      </nav> */}
        <Switch>
          <Route exact path="/" component={App} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};
