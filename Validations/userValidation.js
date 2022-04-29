const Joi = require('joi');

const uservalidation = (data)=>{

    const schema = Joi.object({

        username: Joi.string().required().min(4).label('Username'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().min(6).max(20).label('Password'),
        conform_password: Joi.any().equal(Joi.ref('password'))
        .required()
        .label('conform password')
        .messages({ 'any.only': '{{#label}} does not match' }),
    })

  
        return schema.validate(data);
}

module.exports=uservalidation;