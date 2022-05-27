import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signIn = async (callback: (data: any) => void) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    })
      .then(async (res) => {
        if (!res.ok) {
          // ログイン失敗時の：エラー処理をここに書く
          console.log(`ログイン失敗！ -> ${res.status}:${res.statusText}`);
          return;
        }
        const data = await res.json();
        callback(data);
      })
      .catch(() => {
        // サーバー通信失敗時の処理をここに書く
        console.log('サーバーエラーが発生しました');
      });
    return response;
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    signIn((data) => {
      // MEMO: localStorageにサインインフラグを格納
      localStorage.setItem('isAuthenticated', data.isAuthenticated);
      navigate('/');
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

      <input
        type="email"
        className="form-control"
        placeholder="Email address"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default Login;
