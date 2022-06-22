import "./styles.css";
import styled from "@emotion/styled";

import SearchForm from "./search/search";

export default function App() {
  return (
    <div className="App">
      <Wrapper>
        <div>
          <h1>Old Search</h1>
          <SearchForm requestType={'GET'}/>
        </div>
        <div>
          <h1>New Search</h1>
          <SearchForm requestType={'POST'}/>
        </div>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;
