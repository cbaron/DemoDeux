module.exports = new (
    require('backbone').Router.extend( {

        Error: require('../../lib/MyError'),

        Views: {
            Lovely: require('./views/Lovely'),
            MatchWords: require('./views/MatchWords')
        },
        
        initialize() {

            return this
        },

        handler( request ) {

            Object.create( this.Views.MatchWords, { user: { value: this.user }, router: { value: this } } ).constructor()
        },

        routes: {
            '(*request)': 'handler'
        },

        user: require('./models/User')

    } )
)()
