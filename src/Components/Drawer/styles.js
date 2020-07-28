import styled from "styled-components/native";
import { StatusBar, Platform } from "react-native";

export const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS == "ios" ? 32 : StatusBar.currentHeight}px;
`;

export const Header = styled.View`
  padding: 24px;
`;

export const EnterpriseBrand = styled.ImageBackground`
  width: 100%;
  height: 100px;
`;
