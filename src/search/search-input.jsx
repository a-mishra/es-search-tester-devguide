import { useState } from "react";
import styled from "@emotion/styled";
import InputBase from "@material-ui/core/InputBase";

const SearchInput = ({ onChange, onFocusChange }) => {
  const [active, setactive] = useState(false);

  const handleActivation = (isActive) => {
    setactive(isActive);
    onFocusChange(isActive);
  };

  return (
    <StyledInput active={active}>
      <IconWrapper></IconWrapper>
      <InputWrapper>
        <InputBase
          placeholder="Search"
          onChange={(event) => {
            onChange(event.target.value);
          }}
          onFocus={(event) => {
            handleActivation(true);
          }}
          onBlur={(event) => {
            handleActivation(false);
          }}
          fullWidth={true}
        />
      </InputWrapper>
    </StyledInput>
  );
};

export default SearchInput;

const StyledInput = styled.div`
  width: min(calc(100%), 500px);
  height: 42px;
  border: solid 0.5px #ccc;
  width: 462.9px;
  height: 42px;
  padding: 9px 27.9px 9px 17.7px;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  color: #ccc;
  display: flex;
  flex-direction: row;
  align-items: center;

  input {
    width: 100%;
    border: 0;
    height: 1.1876em;
    margin: 0;
    display: block;
    padding: 6px 0 7px;
    min-width: 0;
    background: none;
    box-sizing: content-box;
  }
`;

const IconWrapper = styled.div`
  width: 16px;
  height: 16px;
  margin: 4px 16px 4px 0;
  color: #ccc;
`;

const InputWrapper = styled.div`
  margin-right: 16px;
  width: 100%;
`;
