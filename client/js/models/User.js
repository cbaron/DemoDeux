module.exports = new ( require('backbone').Model.extend( {
    defaults: { state: {} },
    initialize() {
        this.promise = this.fetch()
        return this
    },
    url() { return "/user" }
} ) )()
