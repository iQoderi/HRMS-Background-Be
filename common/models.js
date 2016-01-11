/**
 * Created by qoder on 16-1-10.
 */
module.exports = {
    users: {
        username: {type: String, required: true},
        department:{type:String},
        tel: {type: String, required: true},
        mySpareTime: {type: Array, require: true}
    }
}
