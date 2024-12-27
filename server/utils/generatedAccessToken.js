import jwt from 'jsonwebtoken'

const generatedAccessToken = async(userId)=>{
    console.log("userid---", userId);
    
    const token = await jwt.sign({ id : userId},
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn : '5h'}
    )

    console.log("token---",token);
    

    return token
}

export default generatedAccessToken