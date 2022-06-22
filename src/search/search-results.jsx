import styled from "@emotion/styled";

const NoResult = () => {
  return (
    <NoResultContainer>
      <img
        src="https://devguide.payu.in/static/images/warning-afd8ae536e409984f2911dad9da0565a.png"
        alt="Warning"
      />
      <h2>No Results Found</h2>
      <h4>
        Try a different or less-specific query. Example searches include:
        Checkout, Android SDK or BuyNowPayLater Javascript
      </h4>
    </NoResultContainer>
  );
};

const Results = ({ items, onSelect, searchText, isFetching }) => {
  return (
    <ResultContainer>
      <SectionHeading>{`Results for “${searchText}”`}</SectionHeading>
      {isFetching ? (
        <LoadingWrapper>
          <p>Loading...</p>
        </LoadingWrapper>
      ) : (
        items &&
        items.length &&
        items.map((item) => {
          return (
            <ResultItem
              title={item.title}
              description={item.description}
              path={item.path}
              key={item.id}
              onSelect={() => {
                onSelect({ item, source: "results" });
              }}
            />
          );
        })
      )}
    </ResultContainer>
  );
};

const History = ({ items, onSelect }) => {
  return (
    <ResultContainer>
      <SectionHeading>Recently Viewed</SectionHeading>
      {items &&
        items.length &&
        items.map((item) => {
          return (
            <ResultItem
              title={item.title}
              path={item.path}
              key={item.id}
              onSelect={() => {
                onSelect({ item, source: "history" });
              }}
            />
          );
        })}
      <Spacer />
    </ResultContainer>
  );
};

const Suggestions = ({ items, onSelect }) => {
  return (
    <ResultContainer>
      <SectionHeading>Suggested</SectionHeading>
      {items &&
        items.length &&
        items.map((item) => {
          return (
            <ResultItem
              title={item.title}
              key={item.id}
              onSelect={() => {
                onSelect({ item, source: "suggestions" });
              }}
            />
          );
        })}
    </ResultContainer>
  );
};

const ResultItem = ({ title, description, path, onSelect }) => {
  return (
    <ResultItemContainer onClick={onSelect}>
      {title && <h4>{title}</h4>}
      {description && <h5>{description}</h5>}
      {path && <h6>{path}</h6>}
    </ResultItemContainer>
  );
};

const SearchResults = ({
  onSelect,
  searchResults,
  searchHistory,
  searchSuggestions,
  searchText
}) => {
  // to handle first time user
  if (
    searchResults.hasError ||
    (searchResults.data && searchResults.data.length > 0) ||
    searchResults.isFetching ||
    (searchHistory && searchHistory.length > 0) ||
    (searchSuggestions && searchSuggestions.length > 0)
  ) {
    return (
      <StyledContainer>
        {searchResults.hasError ? (
          <NoResult />
        ) : (searchResults.data && searchResults.data.length > 0) ||
          searchResults.isFetching ? (
          <Results
            items={searchResults.data}
            onSelect={onSelect}
            searchText={searchText}
            isFetching={searchResults.isFetching}
          />
        ) : (
          <>
            {searchHistory && searchHistory.length > 0 && (
              <History items={searchHistory} onSelect={onSelect} />
            )}
            {searchSuggestions && searchSuggestions.length > 0 && (
              <Suggestions items={searchSuggestions} onSelect={onSelect} />
            )}
          </>
        )}
      </StyledContainer>
    );
  } else {
    return <></>;
  }
};

export default SearchResults;

const StyledContainer = styled.div`
  height: max-content;
  border: solid 0.5px #ccc;
  width: 462.9px;
  padding: 16px 16px;
  margin-top: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  color: #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: calc(100vw - 32px);
`;

const NoResultContainer = styled.div`
  height: 377px;
  width: 90%;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    height: 64px;
  }

  h2 {
    width: 100%;
    // font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: 0.5px;
    text-align: center;
    color: #414141;
    margin-bottom: 16px;
  }

  h4 {
    width: 100%;
    // font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: 0.16px;
    text-align: center;
    color: #808080;
  }
`;

const SectionHeading = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: 0.14px;
  text-align: left;
  color: #808080;
`;

const ResultContainer = styled.div`
  width: 100%;
  margin: 0px auto;
`;

const Spacer = styled.div`
  width: 100%;
  height: 16px;
`;

const ResultItemContainer = styled.div`
  width: 100%;
  padding: 6px 8px 6px 8px;
  border-radius: 4px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: left;
  cursor: pointer;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: #ecfaf4;
  }

  h4 {
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: 0.16px;
    text-align: left;
    color: #414141;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h5 {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #414141;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h6 {
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #808080;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const LoadingWrapper = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
