/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as crypto from 'crypto';

export default function PasswordHash (password: string) {
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(password);
        const passwordHashString = passwordHash.digest('hex').toString().toUpperCase();

        return passwordHashString;
}