// word.js
/**
 * 액션 타입을 정해주고, 
 * 액션 생성자를 만들고,
 * 리듀서를 만들어줘요!
 * 
 * 그리고 나면, configureStore.js에서 rootReducer로 묶어주고 -> 미들웨어랑 엮어서 -> 스토어를 만들어줍니다.
 */

import { firestore } from "../../firebase";

const word_db = firestore.collection("dict");

// Actions
const LOAD = "word/LOAD";
const CREATE = "word/CREATE";

// wordList에 있던 가짜 데이터를 initialState로 옮겨옵니다.
const initialState = {
  word_list: [
    {
      id: "list_0",
      word: "ㅎ1ㅎ1",
      desc: "히히를 변형한 단어. 숫자 1을 'ㅣ'로 쓴다.",
      example: "저 친구가 초콜릿을 줬어. ㅎ1ㅎ1",
    },
    {
      id: "list_1",
      word: "ㅎ1ㅎ1",
      desc: "히히를 변형한 단어. 숫자 1을 'ㅣ'로 쓴다.",
      example: "저 친구가 초콜릿을 줬어. ㅎ1ㅎ1",
    },
    {
      id: "list_2",
      word: "ㅎ1ㅎ1",
      desc: "히히를 변형한 단어. 숫자 1을 'ㅣ'로 쓴다.",
      example: "저 친구가 초콜릿을 줬어. ㅎ1ㅎ1",
    },
    {
      id: "list_3",
      word: "ㅎ1ㅎ1",
      desc: "히히를 변형한 단어. 숫자 1을 'ㅣ'로 쓴다.",
      example: "저 친구가 초콜릿을 줬어. ㅎ1ㅎ1",
    },
  ],
};
// Action Creators
export const loadWord = (word_list) => {
  return { type: LOAD, word_list };
};

export const createWord = (word) => {
  return { type: CREATE, word };
};

export const loadWordFB = () => {
  return function (dispatch){

    word_db.get().then((docs) => {
      let word_data = [];

      docs.forEach((doc) => {
        if(doc.exists){
          word_data = [...word_data, doc.data()];
        }
      });
      console.log(word_data);
      dispatch(loadWord(word_data));
    });
  }
}

export const createWordFB = (word) => {
  return function (dispatch) {
    console.log(word);
    // 생성할 데이터를 미리 만들게요!
    let word_data = { text: word, completed: false };

    // add()에 데이터를 넘겨줍시다!
    word_db
      .add(word_data)
      .then((docRef) => {
        // id를 추가한다!
        word_data = { ...word_data, id: docRef.id };

        console.log(word_data);

        // 성공했을 때는? 액션 디스패치!
        dispatch(createWord(word_data));
      })
      .catch((err) => {
        // 여긴 에러가 났을 때 들어오는 구간입니다!
        console.log(err);
        window.alert('오류가 났네요! 나중에 다시 시도해주세요!');
      });
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "word/LOAD": {
      if(action.word.length > 0) {
        return {list: action.word};
      }

      return state;
    }
      

    case "word/CREATE":
        // 받아온 데이터를 추가한 새 리스트 만들기
      const new_word_list = [...state.word_list, action.word];

    //   state를 갈아끼워요
      return {...state, word_list: new_word_list };

    default:
      return state;
  }
}