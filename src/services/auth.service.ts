import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

export class AuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

    async register(data: any): Promise<IUser> {
        const { username, email, password } = data;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, passwordHash });
        return user;
    }

    async login(data: any): Promise<{ token: string, user: IUser }> {
        const { email, password } = data;

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, email: user.email }, this.JWT_SECRET, { expiresIn: '1h' });

        return { token, user };
    }
}
