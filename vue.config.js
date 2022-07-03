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
        },
        hospital_management: {
            // entry for the page
            entry: './src/pages/hospital_management/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'templates/hospital_management.html',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'hospital_management']
        },
        home: {
            // entry for the page
            entry: './src/pages/home/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'templates/home.html',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'home']
        },
        admin_management: {
            // entry for the page
            entry: './src/pages/admin_management/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'templates/admin_management.html',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'admin_management']
        },
        drugstore_management: {
            // entry for the page
            entry: './src/pages/drugstore_management/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'templates/drugstore_management.html',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'drugstore_management']
        }
    }
})
