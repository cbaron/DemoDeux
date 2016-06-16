module.exports = p => `
    <div class="row subview" data-js="container">
        <div class="col-xs-12">
            <div class="row step">Step 2 of 5 - Make it Interactive</div>
            <div class="row">
                <form>
                    <div>
                        <div class="radio">
                            <label>
                                <input data-js="radio" type="radio" name="interactive" value="url" checked>
                                Go to a web page
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input data-js="radio" type="radio" name="interactive" value="sms">
                                Send an SMS message
                            </label>
                        </div>
                    </div>
                    <div class="prompt" data-js="textLabel">Web Page URL</div>
                    <input class="form-control"data-js="input" type="text" placeholder="http://www.tellient.com/changsbuns" />
                </form> 
            </div>
`
