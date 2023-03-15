export default class AuthService {

  constructor(http,tokenStorage){
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(username, password, name, email, url) {
    const data = await this.http.fetch(`/auth/signup`,{
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url
      }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async login(username, password) {
    const data = await this.http.fetch(`/auth/login`,{
      method: 'POST',
      body: JSON.stringify({
        username, 
        password
      }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async me() {
    const token = this.tokenStorage.getToken(); //token을 읽어와서
    return this.http.fetch(`/auth/me`,{
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`}, //token을 헤더에 추가해서 
    });
  }

  async logout() {
    this.tokenStorage.clearToken();
  }
}
