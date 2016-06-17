module.exports = Object.assign( {}, require('./__proto__'), {

    postRender() {
        return this.update()
    },

    io: require('socket-io'),

    template: require('./templates/confirm'),

    validate() {
        return new Promise( ( resolve, reject ) => {
            this.ad.save()
            .fail( () => resolve(false) )
            .done( () => new Promise( resolve => this.io().emit( 'adCreated', this.ad.attributes, () => resolve() ) ) )
            .then( () => resolve(true) )
        } )
    },

    update() {
        this.templateData.adText.text( this.ad.get('content') )
        this.templateData.adLink.text( this.ad.get('link') )
        this.templateData.adKeywords.text( this.ad.get('keywords') )
        this.templateData.adBudget.text( this.ad.get('budget') )
        this.templateData.adStart.text( this.ad.get('starttime') )
        this.templateData.adEnd.text( this.ad.get('endtime') )

        return this
    }
    
} )
