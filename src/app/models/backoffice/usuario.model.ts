export class Usuario {
  constructor(
    public nombre: string,
    public nick: string,
    public password: string,
    public role?: string,
    public uid?: string
  ) { }
}
