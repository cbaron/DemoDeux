module.exports = Object.assign( {}, require('./__proto__'), {

    template: require('./templates/writeAd'),

    validate() {
        this.ad.set( { content: this.templateData.adText.val() || this.templateData.adText.attr('placeholder') } )
        return new Promise( ( resolve, reject ) => resolve(true) )
    }
    
} )
