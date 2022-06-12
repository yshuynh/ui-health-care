const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    assetsDir: 'static',
    transpileDependencies: [
        'vuetify'
    ],
    pages: {
        auth: {
            // entry for the page
            entry: './src/pages/auth/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'templates/auth.html',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'auth']
        },
        doctor_management: {
            // entry for the page
            entry: './src/pages/doctor_management/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'templates/doctor_management.html',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'doctor_management']
        },
        pharmacist_management: {
            // entry for the page
            entry: './src/pages/pharmacist_management/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'templates/pharmacist_management.html',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'pharmacist_management']
        }
    }
})
