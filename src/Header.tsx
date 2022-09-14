import logo from './logo.svg';
import { Link } from 'react-router-dom';

function Header(){
    return (
        <div className="well">
            <div className='row'>
            <div className='col-md-2'>
                <img src={logo} alt="logo" style={{margin:"-10px"}} height="60px" width="60px" />
            </div>
            <div className='col-md-6'>
            </div>
            <div className='col-md-2'>
              <Link to={`/details/${'EUR'}/${'USD'}/${10}/${1.0}/${10}`}>
                <button type="button" className="btn btn-default">EUR-USD Details</button>
              </Link>
            </div>
            <div className='col-md-2'>
              <Link to={`/details/${'EUR'}/${'GBP'}/${10}/${0.86}/${8.60}`}>
                <button type="button" className="btn btn-default">EUR-GBP Details</button>
              </Link>
            </div>
            </div>
        </div>
    );
}        

export default Header;