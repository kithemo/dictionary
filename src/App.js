import React from 'react';
import { Route } from 'react-router';
import {BrowserRouter} from "react-router-dom";
import styled from "styled-components";
import Write from "./Write";
import WordList from "./WordList";
import { firestore } from './firebase';
import { loadWordFB } from './redux/modules/word';
import { createWordFB } from './redux/modules/word';

const word_db = firestore.collection("dict");

const mapDispatchToProps = (dispatch) => ({
  load: () => {
    dispatch(loadWordFB());
  },
  create: (new_item) => {
    console.log(new_item);
    dispatch(createWordFB(new_item));
  }
});


const App = () => {
  
  return (
    <React.Fragment>
      <Wrapper>
        <BrowserRouter>
          <Route path="/" exact component={WordList} />
          <Route path="/write" exact component={Write} />
        </BrowserRouter>
      </Wrapper>
    </React.Fragment>
  );

  
}



// 가장 바깥에 있을 div 스타일을 잡아줄거예요.
const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #E2FFF8;
`;


export default App;