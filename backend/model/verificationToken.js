const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');

const verificationTokenSchema = new mongooose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    token : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        expires : 300,
        default : Date.now()
    }
});


verificationTokenSchema.pre('save', async function (next) {
    if(this.isModified('token')){
        const hash = await bcrypt.hash(this.token, 8)
        this.token = hash;
    }
    next();
})

verificationTokenSchema.methods.comparePassword = async function(token){
    const result = await bcrypt.compareSync(token, this.token);
    return result;
}

module.exports = mongooose.model("VerificationToken", verificationTokenSchema);