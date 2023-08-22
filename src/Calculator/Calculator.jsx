import { useState } from 'react'
import './Calculator.css'

const Calculator = () => {
    const [input , setInput]= useState("");

    const isValid = (value)=>{
        const op = ['+', '-', '*', '/'];
        const lastChar = input.charAt(input.length -1);
        
        return ! (op.includes(value) && op.includes(lastChar));
    }

    const display = (value)=>{
        if(isValid(value)){
            setInput(input + value);
        }else{
            alert('Error two operators following each other')
        }
        
    }
    const handleChange = (e)=>{
        setInput(e.target.value);

    }

    const calculate = ()=>{
        try{
            let answers = eval(input);
            setInput(answers.toFixed(2));

        }catch{
            setInput('Error');
        }
       
    }
    const clear = ()=>{
        setInput("");
    }
  return (
    <>
    <form name="calc" className="calculator">
        <h3>Calculator</h3>
        <input 
        type="text" 
        className='value' 
        value={input}
        onChange={handleChange} />

        <span className="num clear" onClick={()=> clear()}>c</span>
        <span onClick={()=> display("*")}>*</span>
        <span onClick={()=> display("/")}>/</span>
        <span onClick={()=> display("7")}>7</span>
        <span onClick={()=> display("8")}>8</span>
        <span onClick={()=> display("9")}>9</span>
        <span onClick={()=> display("-")}>-</span>
        <span onClick={()=> display("4")}>4</span>
        <span onClick={()=> display("5")}>5</span>
        <span onClick={()=> display("6")}>6</span>
        <span className='plus' onClick={()=> display('+')}>+</span>
        <span onClick={()=> display("1")}>1</span>
        <span onClick={()=> display("2")}>2</span>
        <span onClick={()=> display("3")}>3</span>
        <span onClick={()=> display("0")}>0</span>
        <span onClick={()=> display("00")}>00</span>
        <span onClick={()=> display(".")}>.</span>
        <span className='num equal' onClick={()=> calculate()}>=</span>
     

    </form>
    </>
  )
}

export default Calculator