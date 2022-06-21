import { useEffect, useState } from "react";
let internalToken = null;

export function getToken() {
  return internalToken;
}

async function getTokenInternal() {
  const url = `${process.env.REACT_APP_API_HOST}/token`;
  try {
    const response = await fetch(url, {
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      internalToken = data.token;
      return internalToken;
    }
  } catch (e) {}
  return false;
}

export function useToken() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    async function fetchToken() {
      const token = await getTokenInternal();
      setToken(token);
    }
    if (!token) {
      fetchToken();
    }
  }, [token]);

  async function logout() {
    if (token) {
      const url = `${process.env.REACT_APP_API_HOST}/token`;
      await fetch(url, {method: 'delete', credentials: 'include'});
      internalToken = null;
      setToken(null);
    }
  }

  async function login(username, password) {
    const url = `${process.env.REACT_APP_API_HOST}/token`;
    const form = new FormData();
    form.append('username', username);
    form.append('password', password);
    const response = await fetch(url, {
      method: 'post',
      credentials: 'include',
      body: form,
    });
    if (response.ok) {
      const token = await getTokenInternal();
      setToken(token);
      return;
    }
    let error = await response.json();
    return error.detail;
  }

  async function signup(username, email, dob, password) {
    const url = `${process.env.REACT_APP_API_HOST}/api/login/new`;
    const response = await fetch(url, {
      credentials: 'include',
      method: 'post',
      body: JSON.stringify({
        username,
        password,
        date_of_birth: dob,
        email,
        first_name: '',
        last_name: '',
        location: '',
        interested: {
          interested: [],
        }
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.ok) {
      await login(username, password);
    }
    return false;
  }

  return [token, login, logout, signup];
}
