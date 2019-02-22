export class SigninDto {
  readonly email: string;
  readonly password: string;
  
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
  }
}
