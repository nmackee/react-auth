/* eslint no-unused-expressions: "off" */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


const Home = (props: { name: string }) => {
  const [name, setName] = useState('');
  const [navigate, setNavigate] = useState(false)

  useEffect(() => {
    async () => {
      try {
        const { data } = await axios.get('user');
        setName(data.name);
      } catch(e) {
        setNavigate(true)
      }
      

      
    };
  }, []);

  const logout = async () => {
    await axios.post('logout', {}, {withCredentials: true})

    setNavigate(true)
  }

  if (navigate) {
    return <Navigate to="/login" />;
  }

  return <div>
    <h3>{props.name ? 'Hi ' + props.name : 'You are not logged in'}></h3>

    <a href="javascript:void(0)" className='btn bun-lg btn-primary' onClick={logout}>Logout</a>
    </div>;
};

export default Home;
