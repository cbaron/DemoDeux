module.exports = Object.assign( {}, require('./__proto__'), {

    template: require('./templates/when'),

    validate() {
        this.ad.set( {
            endtime: this.Moment( this.templateData.end.val() || this.templateData.end.attr('placeholder'), 'DD-MM-YYYY HH:mm' ).utc().format(),
            starttime: this.Moment( this.templateData.start.val() || this.templateData.start.attr('placeholder'), 'DD-MM-YYYY HH:mm' ).utc().format()
        } )

        return new Promise( ( resolve, reject ) => resolve(true) )
    }
    
} )
