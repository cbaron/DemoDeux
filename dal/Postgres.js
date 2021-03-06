module.exports = Object.create( Object.assign( {}, require('../lib/MyObject'), {

    query( query, args, opts = { } ) {
        return this._factory( opts ).query( query, args )
            .catch( e => { this.Error( `query: ${query}\nargs: ${args}` ); throw new Error(e) } )
    },

    querySync( query, args, opts = { } ) {
        var client = new ( require('pg-native') )(), rows
        client.connectSync( process.env.DATABASE_URL || opts.connectionString )
        rows = client.querySync( query, args )
        client.end()
        return rows
    },

    getTableData() {

        this.querySync( this._queries.selectAllTables() ).forEach( row => {
             var columnResult = this.querySync( this._queries.selectTableColumns( row.table_name ) )
             this.tables[ row.table_name ] =
                { columns: columnResult.map( columnRow => ( { name: columnRow.column_name, range: this.dataTypeToRange[columnRow.data_type] } ) ) } 
        } )

        this.querySync( this._queries.selectForeignKeys() ).forEach( row => {
            var match = /FOREIGN KEY \((\w+)\) REFERENCES (\w+)\((\w+)\)/.exec( row.pg_get_constraintdef )
                column = this.tables[ row.table_from ].columns.find( column => column.name === match[1] )
           
            column.fk = {
                table: match[2],
                column: match[3],
                recorddescriptor: ( this.tables[ match[2] ].meta ) ? this.tables[ match[2] ].meta.recorddescriptor : null
            }
        } )
    },

    _factory( data ) {
        return Object.create( {
            connect() {
                return new Promise( ( resolve, reject ) => {
                    require('pg').connect( this.connectionString, ( err, client, done ) => {
                        if( err ) return reject( err )

                        this.client = client
                        this.done = done
                     
                        resolve()
                    } )
                } )
            },

            query( query, args ) {
                return this.connect().then( () =>
                    new Promise( ( resolve, reject ) => {
                        this.client.query( query, args, ( err, result ) => {
                            this.done()

                            if( err ) return reject( err )

                            resolve( result )
                        } )
                    } )
                )
            },
        }, { connectionString: { value: data.connectionString || process.env.DATABASE_URL } } )
    },

    _queries: {

        selectAllTables() { return [
           "SELECT table_name",
           "FROM information_schema.tables",
           "WHERE table_schema='public'",
           "AND table_type='BASE TABLE';"
        ].join(' ') },

        selectForeignKeys() { return [
            "SELECT conrelid::regclass AS tableFrom, conname, pg_get_constraintdef(c.oid)",
            "FROM pg_constraint c",
            "JOIN pg_namespace n ON n.oid = c.connamespace",
            "WHERE contype = 'f' AND n.nspname = 'public';"
        ].join(' ') },

        selectTableColumns( tableName ) {
            return [
                'SELECT column_name, data_type',
                'FROM information_schema.columns',
                `WHERE table_name = '${tableName}'`
            ].join(' ')
        },

    },

    dataTypeToRange: {
        "character varying": "Text",
        "date": "Date",
        "integer": "Integer",
        "money": "Float",
        "timestamp with time zone": "DateTime"
    }
} ), { tables: { value: { } } } )
