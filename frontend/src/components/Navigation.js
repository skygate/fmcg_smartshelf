import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { colors, fontSize } from "../styles/variable";

export const MenuWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
  background-color: ${colors.menu};
  align-items: center;
`;

export const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 12.5rem;
  display: flex;
  justify-content: center;
  height: 3rem;
  background-color: ${colors.tab};
  border-radius: 5px;

  :last-child {
    margin-left: 25rem;
  }
`;

export const IconWrapper = styled.img`
  margin-right: 0.625rem;
`;

export const NavLinkWrapper = styled(NavLink)`
  display: flex;
  text-align: center;
  font-size: ${fontSize.medium};
  color: ${colors.white};
  text-transform: uppercase;
  width: 12.5rem;
  justify-content: center;
  border-radius: 5px;
  line-height: 3rem;
  text-decoration: none;

  &:hover {
    color: ${colors.white};
  }

  &.active {
    background-color: ${colors.tab};
  }
`;

const data = [
  { src: "MenuIcon.svg", path: "/", title: "Menu" },
  { src: "StatisticsIcon.svg", path: "/statistics", title: "Statistics" },
];

export const Navigation = () => {
  return (
    <MenuWrapper>
      {data.map(({ src, path, title }) => {
        return (
          <NavLinkWrapper to={path} exact activeClassName="active" key={src}>
            <IconWrapper src={src} alt={title} />
            {title}
          </NavLinkWrapper>
        );
      })}
    </MenuWrapper>
  );
};
