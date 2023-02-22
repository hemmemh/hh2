class UserToTokenDto{
    constructor(user){
        this.id = user.id
        this.email = user.email
        this.activationLink = user.activationLink
    }
}

module.exports =  UserToTokenDto