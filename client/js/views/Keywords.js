module.exports = Object.assign( {}, require('./__proto__'), {

    template: require('./templates/keywords'),

    validate() {
        return new Promise( ( resolve, reject ) => resolve(true) )
    }
    
} )
