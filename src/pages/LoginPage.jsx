import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../state/reducers';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && password) {
      try {
        setLoading(true);

        const response = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          dispatch(login(data));
          setLoading(false);
          navigate('/cart');
        } else {
          setLoading(false);
          setError('Invalid credentials');
        }
      } catch (error) {
        setLoading(false);
        setError('Network error');
      }
    } else {
      setError('Username and Password required!');
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/cart');
    }
  }, [user]);


  return (
    <LoginForm handleSubmit={handleSubmit} loading={loading} error={error} setUsername={setUsername} setPassword={setPassword} />
  )
}

export default LoginPage