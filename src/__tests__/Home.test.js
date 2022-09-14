import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Home from '../Home';
import * as Constants from '../Constants';
import axios from 'axios';
import { MemoryRouter as Router } from 'react-router-dom';

jest.mock('axios');

describe("render home component", ()=>{
  it("should render text", ()=>{
    render(<Router><Home /></Router>);
    expect(screen.getByText('Currency Exchanger')).toBeInTheDocument();
  })

  it("should type and valid number", ()=>{
    render(<Router><Home /></Router>);
    const input = screen.getByTestId('amtInput');
    fireEvent.change(input, {target: {value: 20}});
  })

  it("should render blue button", ()=>{
    render(<Router><Home /></Router>);
    expect(screen.getByRole('button', {name: 'Convert'})).toBeInTheDocument();
  })

  it("should disabled button on no input", ()=>{
    render(<Router><Home /></Router>);
    const input = screen.getByPlaceholderText('Amount');
    fireEvent.change(input, {target:{value: ''}})
    const btn = screen.getByRole('button', {name: 'Convert'})
    expect(btn).toHaveAttribute('disabled')
  })

  it("should convert currency successfully", async()=>{
    render(<Router><Home /></Router>);
    fireEvent.click(screen.getByTestId("convertBtn"));
      const response = 
        {
          "date": "2022-08-29",
          "historical": "",
          "info": {
            "rate": 79.43,
            "timestamp": 1519328414
          },
          "query": {
            "amount": 25,
            "from": "USD",
            "to": "INR"
          },
          "result": 1985.78,
          "success": true
        };

      axios.post.mockImplementation(() => {
        return Promise.resolve({ data: response })
      });
      const result = await Constants.GetAPI(`convert?to=INR&from=USD&amount=25&apikey=${Constants.APIKEY}`);
    expect(result).toEqual(response);
  })

})