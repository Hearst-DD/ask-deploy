"use strict";

/**
 * FILE UTILS
 *
 */

const c = require( "./constants" ),
    fs = require( "fs" ),
    yaml = require( "js-yaml" );

const fileUtils = {
    checkForFile: function( path ) {
        try {
            const stat = fs.statSync( path );

            return true;
        } catch( err ) {
            return false;
        }
    },

    confirmDirectoryExists: function( dir ) {
        if ( !fs.existsSync( dir ) ) {
            fs.mkdirSync( dir );
        }
    },

    read: function( path ) {
        let p = new Promise( function( resolve, reject ){
            try {
                const data = fs.readFileSync( path, "utf8" );

                resolve( data )
            } catch ( err ) {
                console.error( err );

                reject( err );
            }
        });

        return p;
    },

    readTemplate: function( path ) {
        let p = new Promise( function( resolve, reject ){
            fileUtils.read( process.cwd() + "/" + path + c.TEMPLATE_EXTENSION, "utf8" )
            .then( ( data ) => {
                resolve( data );
            } )
            .catch( ( err ) => {
                console.error( err );

                reject( err );
            } )
        });

        return p;
    },

    readYml: function( path ) {
        let p = new Promise( function( resolve, reject ){
            try {
                const config = yaml.safeLoad( fs.readFileSync( process.cwd() + "/" + path + c.YML_EXTENSION, "utf8" ) );

                resolve( config )
            } catch ( err ) {
                console.error( err );

                reject( err );
            }
        });

        return p;
    },

    rm: function( path ) {
        let p = new Promise( function( resolve, reject ){
            try {
                fs.unlinkSync( path );

                resolve();
            } catch( err ) {
                reject( err );
            }
        });

        return p;
    },

    write: function( path, body ) {
        let p = new Promise( function( resolve, reject ){
            fs.writeFile( process.cwd() + "/" + path, body, ( err, data ) => {
                if ( err ) {
                    console.error( err );
                    reject( err );
                }

                // console.log( "[fileUtils::write] --> " + path );
                resolve();
            });
        });

        return p;
    }
};

module.exports = fileUtils;
