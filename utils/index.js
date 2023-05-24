const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d' 
    })
}


const hashToken = (token) => {
    const secret = 'kn7151283'; // Replace with your own secret key
    const bufferToken = Buffer.from(token.toString(), 'utf8');
    const hashedToken = crypto.createHmac('sha256', secret).update(bufferToken).digest('hex');
    return hashedToken;
  };

//Hash Token    
// const hashToken = (token) =>{
//     return crypto.createHash("sha256").update(token.
//         toString().digest("hex"))
// }

module.exports = {
    generateToken,
    hashToken,
}