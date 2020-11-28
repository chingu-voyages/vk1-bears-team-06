import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Sam Norton',
        email: 'samuelnick.norton@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        phone: '09068467856',
        role: 'administrator'
    },
    {
        name: 'Harold Nocos',
        email: 'nocosharold@gmail.com',
        password:  bcrypt.hashSync('123456', 10),
        phone: '09564523153',
        role: 'regular'
    },
    {
        name: 'Nicole Esposo',
        email: 'nicoleesposo.web@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        phone: '09168467856',
        role: 'resortOwner'
    }
]

export default users