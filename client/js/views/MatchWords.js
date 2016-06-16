module.exports = Object.assign( {}, require('./__proto__'), {

    done() { this.templateData.btn.hide() },

    events: {
        'btn': { method: 'validateView' }
    },

    getIndex() { return this.user.get('state').index || 0 },

    getTemplateOptions() {
        return { header: this.header() }
    },

    header: require('./templates/contentHeader'),
    
    instances: { },

    postRender() {
        this.user.promise.done( () => this.updateState() )

        return this
    },

    saveState() {
        this.$.ajax( {
            data: JSON.stringify( { state: this.user.get('state') } ),
            method: "PATCH",
            url: "/user" } )
        .fail( e => new this.Error(e) )
    },

    serializeAd( ad ) {
        return {
            id: ad.id,
            selectedDelivery: ad.get('selectedDelivery')
        }
    },

    showNext() {
        var currentIndex = this.getIndex()

        this.instances[ this.views[ currentIndex ].name ].hide()
        this.instances[ this.views[ currentIndex ].name ].templateData.container.removeClass('slide-in-left').removeClass('slide-in-right')

        currentIndex += 1
        
        this.user.set( { state: Object.assign( this.user.get('state'), { index: currentIndex } ) } )

        //this.saveState()

        this.showProperView()
    },

    showProperNav() {
        this.templateData.btn.text( ( this.currentIndex !== 6 ) ? 'Next' : 'Confirm' )
    },

    showProperView( back ) {
        var index = this.getIndex(),
            currentViewName = this.views[ index ].name,
            slideDir = ( back ) ? 'left' : 'right',
            klass = `slide-in-${slideDir}`

        this.showProperNav()
        
        if( this.instances[ currentViewName ] ) {
            this.instances[ currentViewName ].show().templateData.container.addClass(klass)
            if( this.instances[ currentViewName ].goBack ) this.goBack()
            return
        }
        
        this.instances[ currentViewName ] = Object.create( this.views[ index ].view, {
            container: { value: this.templateData.subview },
            containerClass: { value: klass },
            ad: { value: this.user.get('ad') }
        } ).constructor()
        
        if( this.instances[ currentViewName ].templateData ) this.instances[ currentViewName ].templateData.container.addClass(klass)

        if( this.views[ index ].on ) {
            this.views[ index ].on.forEach( eventData =>
                this.instances[ currentViewName ].on( eventData.event, () => this[ eventData.method ]() ) )
        }

        return this
    },

	template: require('./templates/matchwords'),

    updateState( data ) {
        if( ! this.user.get('state').index ) this.user.set( { state: { index: 0, ad: new this.Model() } } )
        
        this.showProperView()
    },

    validateView() {
        var view = this.instances[ this.views[ this.getIndex() ].name ]
        
        this.templateData.btn.off()

        view.validate()
        .then( result => { if( result ) this.showNext() } )
        .catch( e => new this.Error(e) )
        .then( () => window.setTimeout( () => this.delegateEvents( 'btn', this.templateData.btn ), 1000 ) )
    },

    views: [
        { name: 'write', view: require('./WriteAd') },
        { name: 'make', view: require('./MakeIt') },
        { name: 'keywords', view: require('./Keywords') },
        { name: 'budget', view: require('./Budget') },
        { name: 'when', view: require('./When') },
        { name: 'confirm', view: require('./Confirm') },
        { name: 'thankyou', view: require('./ThankYou') },
    ]

} )


