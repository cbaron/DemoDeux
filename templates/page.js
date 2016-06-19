module.exports = ( p ) => {
    var jsBundle = ( p.isDev ) ? 'debug' : 'bundle'
    return `<!DOCTYPE html>
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="/static/css/${p.style}.css">

                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                
                <script src="/static/js/${jsBundle}.js"></script>
                
                <title>${p.title}</title>
            </head>

            <body>
                <div class="container-fluid">
                   <div class="row" id="content"></div>
                </div>
            </body>

        </html>`
}
