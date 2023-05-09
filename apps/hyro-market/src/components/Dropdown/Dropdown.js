import React, { forwardRef } from 'react';
import BootstrapDropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';

import theme, { colors } from '../../styles/theme';

const StyledBootstrapDropdown = styled(BootstrapDropdown)``;

const Menu = styled.div`
  border-radius: ${theme.border.small};
  box-shadow: 0 1px 24px 0 rgb(0 0 0 / 8%);
  background-color: white;
  border: 1px solid ${colors.grayLight};
  max-height: 180px;
  overflow-y: auto;
  overflow-x: hidden;

  ul {
    width: 100%;
    margin: 0 0 8px 0;
    font-size: ${theme.font.medium};
  }

  .dropdown-item {
    padding: 0;
    white-space: break-spaces;

    p {
      padding: 8px 16px;
      margin-bottom: 0;
    }
  }

  .dropdown-item:hover,
  .dropdown-item:focus {
    background-color: ${() => colors.graySoft};
  }

  .dropdown-item:active {
    background-color: ${() => colors.graySoft};
  }
`;

const MenuWrapper = styled.div`
  .dropdown-menu {
    visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
    min-width: 300px;
    width: max-content;
    padding: 0;
  }
`;

const Toggle = styled.div`
  min-width: 300px;
  padding: 0 25px;
  display: flex;
  row-gap: 20px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 50px;
  cursor: ${(props) => (props.selectable && !props.disabled ? 'pointer' : 'default')};
  color: ${(props) => props.disabled && theme.colors.gray};
  border: 1px solid ${theme.colors.grayBorder};
  border-radius: 35px;
`;

const CustomToggle = forwardRef(({ children, selectable, small, disabled, onClick }, ref) => (
  <Toggle onClick={onClick} selectable={selectable} disabled={disabled} small={small} ref={ref}>
    {children}
  </Toggle>
));
CustomToggle.displayName = 'CustomToggle';

const CustomMenu = forwardRef(
  ({ children, small, style, className, 'aria-labelledby': labeledBy }, ref) => {
    return (
      <Menu ref={ref} style={style} small={small} className={className} aria-labelledby={labeledBy}>
        <ul className="list-unstyled">{React.Children.toArray(children)}</ul>
      </Menu>
    );
  },
);
CustomMenu.displayName = 'CustomMenu';

const Arrow = styled(Image)`
  height: 5px;
`;

const Value = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #b7b7b7;
  text-transform: uppercase;
  font-family: Montserrat, sans-serif;
`;

const Dropdown = ({ value, small, disabled, children }) => {
  const isSelectable = React.Children?.toArray(children)?.length;

  return (
    <StyledBootstrapDropdown>
      <BootstrapDropdown.Toggle
        as={CustomToggle}
        selectable={isSelectable}
        id="dropdown-custom-components"
        small={small}
        disabled={disabled}
      >
        <Value>{value}</Value>
        {isSelectable > 0 && <Arrow disabled={disabled} src={'/arrow.svg'} />}
      </BootstrapDropdown.Toggle>

      {!disabled && children && (
        <MenuWrapper hidden={!React.Children?.toArray(children)?.length}>
          <BootstrapDropdown.Menu as={CustomMenu} small={small} value={value}>
            <ul className="list-unstyled">
              <div className="mt-2" />
              {React.Children?.toArray(children)?.map((child, index) => (
                <BootstrapDropdown.Item eventKey={index} active={child === value} key={index}>
                  {child}
                </BootstrapDropdown.Item>
              ))}
            </ul>
          </BootstrapDropdown.Menu>
        </MenuWrapper>
      )}
    </StyledBootstrapDropdown>
  );
};

export default Dropdown;
