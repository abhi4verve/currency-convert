import { useState, useEffect } from 'react';
import * as Constants from './Constants';
import Header from './Header';
import { Link, useParams } from 'react-router-dom';
import { data } from './Currencies';
import { Line } from "react-chartjs-2";

function Details() {

  let urlData = useParams();
  const [getArray, setArray] = useState([]);
  const [getData, setData] = useState([33, 53, 85, 41, 44, 65, 88, 25, 45, 66, 12, 77]);
  const [inputField, setInputField] = useState({
    from: '',
    to: '',
    amt: '',
    rate: '',
    result: ''
  });

  const getDropDownValues = async () => {
    // var data = await Constants.GetAPI(`symbols?apikey=${Constants.APIKEY}`, null);
    setArray(data.symbols)
  }

  const convertedData = async () => {
    setInputField({ ...inputField, ...urlData })
  }

  var chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: inputField.to,
        data: getData,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  const setChartData = async () => {
    var chart = await Constants.GetAPI(`timeseries?start_date=${'2021-01-01'}&end_date=${'2021-12-31'}&base=${urlData.from}&symbols=${urlData.to}&apikey=${Constants.APIKEY}`, null);
    var apiData = chart.rates;
    const pick = (obj:any, ...args:any) => ({
      ...args.reduce((res:any, key:any) => ({ ...res, [key]: obj[key] }), { })
    })
    var selectedData = [pick(apiData, '2021-01-31', '2021-02-28', '2021-03-31', '2021-04-30', '2021-05-31', '2021-06-30', '2021-07-31', '2021-08-31', '2021-09-30', '2021-10-31', '2021-11-30', '2021-12-31')];
    var removeKeys = Object.values(selectedData[0]);
    var result = removeKeys.map((a:any)=>{ return a[Object.keys(a)[0]] });
    setData(result)
  }

  useEffect(() => {
    getDropDownValues();
    convertedData();
    setChartData();
  }, [urlData])


  const inputHandler = (e: any) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  }

  const onExchange = async (event: any) => {
    event.preventDefault();
    //setInputField({...inputField, from: inputField.to, to:inputField.from })
  }

  const onConvert = async (event: any) => {
    event.preventDefault();
    var data = await Constants.GetAPI(`convert?to=${inputField.to}&from=${inputField.from}&amount=${inputField.amt}&apikey=${Constants.APIKEY}`, null);
    setInputField({ ...inputField, rate: data.info.rate, result: data.result })
  }

  return (
    <div style={{ margin: "10px" }}>

      <Header />

      <h2>{inputField.from} - {data.symbols[inputField.from]}</h2>

      <Link to={`/`}>
        <button type="button" className="btn btn-primary" style={{ float: "right", marginTop: "-45px", width: "15%" }}>Back to Home</button>
      </Link>

      <div className="well">
        <div className='row'>
          <div className='col-md-4'>
            <div className="form-group">
              <label htmlFor="usr">Amount:</label>
              <input type="number" className="form-control" min={1} value={inputField.amt} id="amt" name="amt" onChange={inputHandler} />
            </div>
          </div>
          <div className='col-md-3'>
            <div className="form-group">
              <label htmlFor="sel1">From:</label>
              <select className="form-control from" id="from" name="from" onChange={inputHandler} required>
                <option value={inputField.from}>{inputField.from}</option>
                {
                  Object.keys(getArray).map(function (key, value) {
                    return <option key={key} value={key}>{key}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className='col-md-2'>
            <button type="button" onClick={onExchange} className="btn btn-default" style={{ marginTop: "25px", width: "100%" }}>
              <i className="fa fa-exchange" aria-hidden="true"></i>
            </button>
          </div>
          <div className='col-md-3'>
            <div className="form-group">
              <label htmlFor="sel1">To:</label>
              <select className="form-control to" id="to" name="to" onChange={inputHandler} required>
                <option value={inputField.to}>{inputField.to}</option>
                {
                  Object.keys(getArray).map(function (key, value) {
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
            <button type="button" disabled={!inputField.amt} onClick={onConvert} className="btn btn-primary" style={{ marginTop: "5px", width: "100%" }}>
              Convert
            </button>
          </div>
        </div>
        <div className='row' style={{ marginTop: "20px" }}>
          <div className='col-md-4'>
            <div className="form-group">
              <input type="text" value={inputField.rate ? '1 ' + inputField.from + ' = ' + inputField.rate + ' ' + inputField.to : ''} disabled className="form-control" id="val" name="rate" />
            </div>
          </div>
          <div className='col-md-8'>
            <div className="form-group">
              <input type="text" value={inputField.result ? inputField.result + ' ' + inputField.to : ''} disabled className="form-control" placeholder='Amount' id="answer" name="answer" />
            </div>
          </div>
        </div>
      </div>

      <div className="well">
        <div className='row'>
          <div className='col-md-8 col-md-offset-2'>
            <Line data={chartData} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Details;