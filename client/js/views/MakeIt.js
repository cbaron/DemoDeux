module.exports = Object.assign( {}, require('./__proto__'), {

    events: {
        radio: { event: 'change', method: 'radioChanged' }
    },

    radioChanged(e) {
        if( ( e.target.defaultValue === "sms" ) ) {
            this.templateData.textLabel.text( "Phone Number to Receive Message" )
            this.templateData.input.attr( { placeholder: "18582457939" } )
        } else {
            this.templateData.textLabel.text( "Web Page URL" )
            this.templateData.input.attr( { placeholder: "http://www.tellient.com/changsbuns" } )
        }
    },

    template: require('./templates/makeIt'),

    validate() {
        return new Promise( ( resolve, reject ) => resolve(true) )
    }
} )
