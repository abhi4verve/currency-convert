import { useState, useEffect } from 'react';
import * as Constants from './Constants';
import Header from './Header';
import { Link } from 'react-router-dom';
import {data} from './Currencies';

function Home() {

  const [getArray, setArray] = useState([]);
  const [inputField , setInputField] = useState({
    from: 'AED',
    to: 'AED',
    amt: '',
    rate: '',
    result: ''
  });

  const getDropDownValues = async() => {
    // var data = await Constants.GetAPI('symbols?apikey=${Constants.APIKEY}', null);
    setArray(data.symbols)
  }

  useEffect(()=>{
    getDropDownValues();
  },[])

  const inputHandler = (e:any) =>{
    setInputField({...inputField, [e.target.name]: e.target.value});
  }

  const onExchange = async(event:any) => {
    event.preventDefault();
    //setInputField({...inputField, from: inputField.to, to:inputField.from })
  }

  const onConvert = async(event:any) => {
    event.preventDefault();
    var data = await Constants.GetAPI(`convert?to=${inputField.to}&from=${inputField.from}&amount=${inputField.amt}&apikey=${Constants.APIKEY}`, null);
    setInputField({...inputField, rate: data.info.rate, result:data.result })
  }

  return (
    <div style={{margin:"10px"}}>
      
      <Header />

      <h2>Currency Exchanger</h2>

      <div className="well">
        <div className='row'>
          <div className='col-md-4'>
            <div className="form-group">
              <label htmlFor="usr">Amount:</label>
              <input type="number" placeholder='Amount' data-testid="amtInput" className="form-control" min={1} id="amt" name="amt" onChange={inputHandler}/>
            </div>
          </div>
          <div className='col-md-3'>
            <div className="form-group">
              <label htmlFor="sel1">From:</label>
              <select className="form-control from" id="from" name="from" defaultValue={inputField.from} onChange={inputHandler} required>
                
                {
                  Object.keys(getArray).map(function(key, value) {
                    return <option key={key} value={key}>{key}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className='col-md-2'>
            <button type="button" id="swap" onClick={onExchange} className="btn btn-default swap" style={{marginTop:"25px", width:"100%"}}>
              <i className="fa fa-exchange" aria-hidden="true"></i>
            </button>
          </div>
          <div className='col-md-3'>
            <div className="form-group">
              <label htmlFor="sel1">To:</label>
              <select className="form-control to" id="to" name="to" defaultValue={inputField.to} onChange={inputHandler} required>
                
                {
                  Object.keys(getArray).map(function(key, value) {
                    return <option key={key} value={key}>{key}</option>
                  })
                }
              </select>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4'>
          </div>
          <div className='col-md-8'>
            <button type="button" disabled={!inputField.amt} onClick={onConvert} data-testid="convertBtn" className="btn btn-primary" style={{marginTop:"5px", width:"100%"}}>
              Convert
            </button>
          </div>
        </div>
        <div className='row' style={{marginTop:"20px"}}>
          <div className='col-md-4'>
            <div className="form-group">
              <input type="text" value={inputField.rate ? '1 '+inputField.from+' = '+inputField.rate+' '+inputField.to : ''} disabled className="form-control" />
            </div>
          </div>
          <div className='col-md-4'>
            <div className="form-group">
              <input type="text" value={inputField.result ? inputField.result+' '+inputField.to : ''} disabled className="form-control" id="answer" name="answer" />
            </div>
          </div>
          <div className='col-md-4'>
            {inputField.result ? 
              <Link to={`/details/${inputField.from}/${inputField.to}/${inputField.amt}/${inputField.rate}/${inputField.result}`}>
                <button type="button" className="btn btn-primary" style={{width:"100%"}}>Details</button>
              </Link>
            : 
              <Link to={`/details/`}>
                <button type="button" disabled className="btn btn-primary" style={{width:"100%"}}>Details</button>
              </Link>
            }
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <div className="well">
          </div>
        </div>
        <div className='col-md-4'>
          <div className="well">
          </div>
        </div>
        <div className='col-md-4'>
          <div className="well">
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;