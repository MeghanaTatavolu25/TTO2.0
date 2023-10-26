import { Search } from '@material-ui/icons';

import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div style={{
      position: 'relative',
      boxSizing: 'border-box',
      width: '518px',
      height: '58px',
      background: 'linear-gradient(270deg, #C7DCF4 43.77%, rgba(199, 220, 244, 0) 110.42%)',
      border: '1px solid #6B94C2',
      borderRadius: '30px',
    }}>
      <input type="text" placeholder="Search Here" style={{
        boxSizing: 'border-box',
        border: 'none',
        outline: 'none',
        width: '100%',
        height: '100%',
        paddingLeft: '20px',
        fontSize: '20px',
        fontFamily: 'Montserrat',
        borderRadius: '30px',
        backgroundColor: 'transparent',
      }} />
      <div style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
      }}>
        <FaSearch color="#4991E2" size={25} />
      </div>
    </div>
  );
};

export default SearchBar