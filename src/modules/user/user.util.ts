import bcrypt from "bcrypt";


export class UserUtil {
  static async hash(plain: string, salt: string | number): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plain, 10, (err, hashed) => {
        if (err) return reject(err);
        return resolve(hashed);
      })
    })
  }
}