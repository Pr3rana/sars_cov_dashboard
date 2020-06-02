import React, {useState} from 'react';
import './Search.css'

function SearchRowContent({label, value, click}){
  return(
    <div onClick={click}>
      <strong>{label}</strong>
      {value}
      <input type='hidden' value={value}/>
    </div>
  )
}

function AutoComplete ({list, filterInput, onClick}) {
  const finalList = list.filter((el) => {
    if(filterInput.length>0 && (el.substr(0, filterInput.length).toUpperCase() === filterInput.toUpperCase())){
      return true
    }
    else{
        return false
    }
  })
  return(
    <div className="autocomplete-items">
      {
      finalList.map((el, index) => {
        return (<SearchRowContent 
          key = {`${el}${index}`}
          click={() => onClick(el)} 
          value ={el.substr(filterInput.length)} 
          label={el.substr(0, filterInput.length)} 
        />)
      })
      }
    </div>
  )
}

function SearchBar(props){
  const [inputData, setInputData] = useState('')
  const [select, onSelect] = useState(true)
  // const dataList = props.list;
    return(
          <div className="autocomplete">
            <input type="hidden" value="prayer" />
            <input id="myInput" type="text" name="myCountry" placeholder="Country"
                onChange={(e)=> {
                  setInputData(e.target.value)
                  onSelect(false)
                }}
                // onKeyUp={(e) => {
                //   setInputData(e.target.value)
                //   onSelect(false)
                // }}
                // onKeyDown={onkeydown} 
                value = {inputData}
                // value={inputData}
              />
              <button onClick={()=>props.click(inputData)}><i className="fa fa-search"></i></button>
              {
                !select && <AutoComplete 
                list={props.list} 
                filterInput={inputData}
                onClick={(text) => {
                  setInputData(text)
                  onSelect(true)
                }}
               />
              }
          </div>
    )
}

export default SearchBar;

