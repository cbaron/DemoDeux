module.exports = Object.assign( {}, require('./__proto__'), {

    template: require('./templates/keywords'),

    validate() {
        this.ad.set( { keywords: this.templateData.input.val() || this.templateData.input.attr('placeholder') } )
        return new Promise( ( resolve, reject ) => resolve(true) )
    }
    
} )
