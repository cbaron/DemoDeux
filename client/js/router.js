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

            Object.create( this.Views[ ( /lovely/.test(document.location.hostname) ) ? 'Lovely' : 'MatchWords' ], {
                request: { value: request },
                router: { value: this },
                user: { value: this.user }
            } ).constructor()
        },

        routes: {
            '(*request)': 'handler'
        },

        user: require('./models/User')

    } )
)()
