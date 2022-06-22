import { useRef, useState, useEffect, forwardRef } from "react";
import { useSpring, animated } from "react-spring";
import Popper from "@material-ui/core/Popper";

import SearchInput from "./search-input";
import SearchResults from "./search-results";
import axios from "axios";

import styled from "@emotion/styled";
import { getSearchQuery } from './utils';

const Fade = forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const SearchForm = ({searchType}) => {
  const [searchText, setsearchText] = useState("");
  const [isOpen, setisOpen] = useState(false);
  const [searchHistory, setsearchHistory] = useState([]);
  const [searchSuggestions, setsearchSuggestions] = useState([]);
  const [searchResults, setsearchResults] = useState({
    hasError: false,
    isFetching: false,
    data: []
  });

  const inputEl = useRef(null);
  const es = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setAnchorEl(inputEl.current);
  }, [inputEl]);

  useEffect(() => {
    let browserSearchHistory = JSON.parse(
      localStorage.getItem("searchHistoryKey") || "[]"
    );
    setsearchHistory(browserSearchHistory);
    setsearchSuggestions(
      JSON.parse(
        !!browserSearchHistory &&
          !!browserSearchHistory.length &&
          !!browserSearchHistory[0] &&
          !!browserSearchHistory[0].suggested_posts
          ? browserSearchHistory[0].suggested_posts
          : "[]"
      )
    );

    return () => {};
  }, []);

  useEffect(() => {
    setsearchResults({
      hasError: false,
      data: [],
      total: 0,
      isFetching: true
    });

    // wait 500ms before executing search
    let timeoutID = setTimeout(() => {
      if (searchText) {
        getSearchResults(searchText);
      } else {
        setsearchResults({
          hasError: false,
          data: [],
          total: 0,
          isFetching: false
        });
      }
    }, 500);

    // clear current timer
    return () => {
      clearTimeout(timeoutID);
    };
  }, [searchText]);

  

  const getSearchResults = (searchText) => {
    if(searchType == 'NEW') {

      axios
      .post(
        `${"https://devguide.payu.in/wordpress/index.php/wp-json/es"}`, 
        getSearchQuery(searchText)
      )
      .then(function (response) {
        //   console.log(response);
        if (response.status >= 200 && response.status < 299) {
          let body = response.data;
          try {
            body = JSON.parse(body);
          } catch {
            // throw Error(response, statusText);
          }
          //---------------
          let items = [];
          body &&
            body.hits &&
            body.hits.hits &&
            body.hits.hits.forEach((element) => {
              let item = {
                id: element._source.ID,
                title: element._source.post_title,
                description: element._source.post_excerpt,
                path:
                  element._source.meta &&
                  element._source.meta.path &&
                  element._source.meta.path.length > 0 &&
                  element._source.meta.path[0] &&
                  element._source.meta.path[0].value,
                slug: element._source.post_name,
                icon:
                  element._source.meta &&
                  element._source.meta.post_icon &&
                  element._source.meta.post_icon.length > 0 &&
                  element._source.meta.post_icon[0] &&
                  element._source.meta.post_icon[0].value,
                suggested_posts:
                  element._source.meta &&
                  element._source.meta.suggested_posts &&
                  element._source.meta.suggested_posts.length > 0 &&
                  element._source.meta.suggested_posts[0] &&
                  element._source.meta.suggested_posts[0].value
              };
              items.push(item);
            });

          let total = body?.hits?.total?.value;

          setsearchResults({
            hasError: items.length > 0 ? false : true,
            data: items,
            total: total,
            isFetching: false
          });

          //---------------
        } else {
          // throw Error(response, statusText);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }
    else {

      axios
      .get(
        `${"https://devguide.payu.in/wordpress/index.php/wp-json/es"}?search=${searchText}`
      )
      .then(function (response) {
        //   console.log(response);
        if (response.status >= 200 && response.status < 299) {
          let body = response.data;
          try {
            body = JSON.parse(body);
          } catch {
            // throw Error(response, statusText);
          }
          //---------------
          let items = [];          
          body &&
            body.hits &&
            body.hits.hits &&
            body.hits.hits.forEach((element) => {
              let item = {
                id: element._source.ID,
                title: element._source.post_title,
                description: element._source.post_excerpt,
                path:
                  element._source.meta &&
                  element._source.meta.path &&
                  element._source.meta.path.length > 0 &&
                  element._source.meta.path[0] &&
                  element._source.meta.path[0].value,
                slug: element._source.post_name,
                icon:
                  element._source.meta &&
                  element._source.meta.post_icon &&
                  element._source.meta.post_icon.length > 0 &&
                  element._source.meta.post_icon[0] &&
                  element._source.meta.post_icon[0].value,
                suggested_posts:
                  element._source.meta &&
                  element._source.meta.suggested_posts &&
                  element._source.meta.suggested_posts.length > 0 &&
                  element._source.meta.suggested_posts[0] &&
                  element._source.meta.suggested_posts[0].value
              };
              items.push(item);
            });

          let total = body?.hits?.total?.value;

          setsearchResults({
            hasError: items.length > 0 ? false : true,
            data: items,
            total: total,
            isFetching: false
          });

          //---------------
        } else {
          // throw Error(response, statusText);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }

  };

  const handleSearchInputFocusChange = (isActive) => {
    //isActive && setisOpen(isActive)
    // setisOpen(isActive);
    setisOpen(true)
  };

  const handleSearchInputTextChange = (searchText) => {
    setsearchText(searchText);
  };

  const handleItemSelection = ({ item, source }) => {
    if (source == "results" || source == "history") {
      handleUpdateSearchHistory(item);
    }
  };

  const handleUpdateSearchHistory = (item) => {
    let matchingItemFound = false;
    let filteredSearchHistory = searchHistory.filter((elem, index) => {
      if (elem.id == item.id && elem.path == item.path) {
        matchingItemFound = true;
        return false;
      }
      if (matchingItemFound == false && index >= 4) {
        return false;
      }
      return true;
    });

    filteredSearchHistory.unshift(item);

    localStorage.setItem(
      "searchHistoryKey",
      JSON.stringify(filteredSearchHistory)
    );
    setsearchHistory(filteredSearchHistory);

    // set suggestions;
    setsearchSuggestions(JSON.parse(item.suggested_posts || "[]"));
  };

  return (
    <StyledContainer>
      <SearchInputWrapper ref={inputEl}>
        <SearchInput
          onChange={(searchText) => {
            handleSearchInputTextChange(searchText);
          }}
          onFocusChange={(isActive) => {
            handleSearchInputFocusChange(isActive);
          }}
        />
      </SearchInputWrapper>

      <Popper open={isOpen} anchorEl={anchorEl} placement="bottom" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <SearchResults
              onSelect={({ item, source }) => {
                handleItemSelection({ item, source });
              }}
              searchResults={searchResults}
              searchHistory={searchHistory}
              searchSuggestions={searchSuggestions}
              searchText={searchText}
              searchType={searchType}
            />
          </Fade>
        )}
      </Popper>
      {/* {searchText && <Elasticsearch ref={elasticsearch}/>} */}
      {/* <Elasticsearch ref={es}/> */}
    </StyledContainer>
  );
};

export default SearchForm;

const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
