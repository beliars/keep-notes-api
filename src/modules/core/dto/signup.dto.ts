export class SignupDto {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  
  constructor(data) {
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
  }
}
