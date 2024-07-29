import bcrypt from "bcrypt"

const saltrounds = 10;

export const hashpasswords = (password) => {
    const salt = bcrypt.genSaltSync(saltrounds);
    console.log(salt)
    return bcrypt.hashSync(password, salt)
}

export const comparepasswords = (plain,hashed) => {
    return bcrypt.compareSync(plain,hashed)
}