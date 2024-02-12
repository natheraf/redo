//IMPORTANT: This is for testing purposes only. This is not a secure way to store user data.
//This function is used to store user data in the local storage.
//In production this would be done on the server.
const storeUserDataSetup = () => {
    const usersData = [
      { username: 'user1', password: 'pass1' },
      { username: 'user2', password: 'pass2' },
      
    ];
  
    localStorage.setItem('users', JSON.stringify(usersData));
  };
  
  export default storeUserDataSetup;
  