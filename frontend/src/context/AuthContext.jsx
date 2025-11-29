import {createContext, useState, useEffect} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check if user is already saved in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser){
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // login
    const login = (userData, token) => {
    localStorage.setItem('token', token); // Save token for future API calls
    localStorage.setItem('user', JSON.stringify(userData)); // Save user details
    setUser(userData); // Update React State
  };

   // Logout 
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;