module.exports = p => `
    <div class="row subview" data-js="container">
        <div class="col-xs-12">
            <div class="row step">Step 1 of 5 - Write Ad Text</div>
            <div class="row prompt">
                <div class="pull-left">Ad Text:</div>
                <div class="pull-right help">(100 characters max)</div>
            </div>
            <div class="row">
                <textarea data-js="adText" class="form-control" placeholder="Come eat delicious buns for lunch at Chang's Food Cart" rows="4"></textarea>
            </div>
        </div>
    </div>
`
