type User = {
  name: string;
  email: string;
  role: 'teacher' | 'student' | 'secretary' | 'admin';
};

class Session {
  constructor(user: User) {
    this.user = user;
  }
  user: {
    name: string;
    email: string;
    role: string;
  };
  getRole() {
    return this.user.role;
  }
}
