module.exports = p => `
    <div class="row subview confirm" data-js="container">
        <div class="col-xs-12">
            <div class="row step">Confirm Your Ad</div>
            <div class="row item ad-text" data-js="adText"></div>
            <div class="row item">
                <i class="fa fa-link" aria-hidden="true"></i>
                <span data-js="adLink"></span>
            </div>
            <div class="row item">
                <i class="fa fa-search" aria-hidden="true"></i>
                <span data-js="adKeywords"></span>
            </div>
            <div class="row item">
                <i class="fa fa-rmb" aria-hidden="true"></i>
                <span data-js="adBudget"></span>
            </div>
            <div class="row item start">
                <i class="fa fa-calendar" aria-hidden="true"></i>
                <div class="text-center start" data-js="adStart"></span>
            </div>
            <div class="row to">
                <div class="col-xs-4 col-xs-offset-1">
                    <hr></hr>
                </div>
                <div class="col-xs-2">to</div>
                <div class="col-xs-4">
                    <hr></hr>
                </div>
            </div>
            <div class="row item text-center" data-js="adEnd"></div>
        </div>
    </div>
`
