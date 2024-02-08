import { useState } from 'react';
import './App.css';
import { useReducer } from 'react';

const initialState = {
  input: "",
};

const reducer = (state, action) => {

  switch (action.type) {
    case "ADD_INPUT":
      if("+/-".includes(state.input.slice(-1)) && "+/-".includes(action.payload)){
        return {
          ...state,
          input: state.input.slice(0,-1) + action.payload,
        };
      }else{
        return {...state,input:state.input + action.payload};
      }
    case "CALCULATE":
      return {...state,input:eval(state.input).toString()};
    case "CLEAR":
      return initialState;
    case "DELETE":
      return { ...state, input: state.input.slice(0, -1) };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (btnVal) => {
    if (btnVal === "=") {
      dispatch({ type: "CALCULATE" });
    } else if(btnVal === "AC") {
      dispatch({ type: "CLEAR" });
    } else if(btnVal === "Del") {
      dispatch({ type: "DELETE" }); 
    } else {
      if (state.input==="" && "+/-*".includes(btnVal)){
         return;
      }else{
        dispatch({ type: "ADD_INPUT", payload: btnVal });
      }
    
    }
  }
  return (
    <>
      <h1 className='heading'>Calculator App</h1>
      <div>
        <input className="input-btn" type="text" placeholder="0" readOnly value={state.input} />
      </div>
      <div>
        <div>
          <button onClick={() => handleClick(0)}>0</button>
          <button onClick={() => handleClick(1)}>1</button>
          <button onClick={() => handleClick(2)}>2</button>
          <button onClick={() => handleClick(3)}>3</button>
          <button onClick={() => handleClick(4)}>4</button>
          <button onClick={() => handleClick(5)}>5</button>
          <button onClick={() => handleClick(6)}>6</button>
          <button onClick={() => handleClick(7)}>7</button>
          <button onClick={() => handleClick(8)}>8</button>
          <button onClick={() => handleClick(9)}>9</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={() => handleClick("+")}>+</button>
        </div>
        <div>
         
          <button onClick={() => handleClick("-")}>-</button>
          <button onClick={() => handleClick("/")}>/</button>
          <button onClick={() => handleClick("=")}>=</button>
        </div>
        <div>
          <button onClick={() => handleClick("Del")}>Del</button>
          <button onClick={() => handleClick("AC")}>AC</button>
        </div>
      </div>
    </>
  );
}
export default App;