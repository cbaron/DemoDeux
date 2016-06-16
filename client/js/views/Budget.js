module.exports = Object.assign( {}, require('./__proto__'), {

    template: require('./templates/budget'),

    validate() {
        this.ad.set( { budget: this.templateData.input.val() || this.templateData.input.attr('placeholder') } )
        return new Promise( ( resolve, reject ) => resolve(true) )
    }
    
} )
