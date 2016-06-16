module.exports = p =>
`<div data-js="container" class="col-xs-12">
    <div class="row heading">
        <div class="col-xs-2">
            <img src="/static/img/chinawirelesslogobug.png"/>
        </div>
        <div class="col-xs-8">
            <span>Match</span>
            <span>Words</span>
        </div>
        <div class="col-xs-2">LTE-D</div>
    </div>
    <div class="row content">
        <div class="col-xs-12">
            <div class="row">${p.header}</div>
            <div class="row">
                <div class="col-xs-12" data-js="subview"></div>
            </div>
            <div class="row btn-row">
                <button class="my-btn" data-js="btn">Next</button>
            </div>
        </div>
    </div>
</div>
`
