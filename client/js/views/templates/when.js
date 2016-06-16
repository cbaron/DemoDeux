module.exports = p => `
    <div class="row subview when" data-js="container">
        <div class="col-xs-12">
            <div class="row step">Step 5 of 5 - When to Display</div>
            <div class="row prompt">Start Date / Time</div>
            <div class="row">
                <i class="fa fa-calendar with-input" aria-hidden="true"></i>
                <input data-js="start" class="form-control with-fa start" type="text" placeholder="28-06-2016 10:00" />
            </div>
            <div class="row prompt">End Date / Time</div>
            <div class="row">
                <i class="fa fa-calendar with-input" aria-hidden="true"></i>
                <input data-js="end" class="form-control with-fa" type="text" placeholder="28-06-2016 13:00" />
            </div>
        </div>
    </div>
`
