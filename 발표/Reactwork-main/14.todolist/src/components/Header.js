const Header = () => {
    return (
      <div className='Header'> 
        <h3>TODOList 😈</h3>
        <h2>{new Date().toDateString()}</h2>
      </div>
    );
  }
  
  export default Header;
  