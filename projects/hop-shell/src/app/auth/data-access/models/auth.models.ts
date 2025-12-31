export type Role = 'Admin' | 'Editor' | 'Viewer';

export type LoginResponse = {
  token: string;
  username: string;
  role: Role;
};

export type Session = {
  token: string;
  username: string;
  role: Role;
};
