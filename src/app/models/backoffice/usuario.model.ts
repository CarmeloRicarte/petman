export class Usuario {
  constructor(
    public nombre: string,
    public nick: string,
    public password: string,
    public img?: string,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public uid?: string
  ) { }
}
