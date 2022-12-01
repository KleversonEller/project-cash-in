module.exports = {
    presets: [
        [
        '@babel/preset-env',
        {
            targets: {
            node: 'current'
            }
        }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
        alias: {
            '@controllers': './src/controllers',
            '@services': './src/services',
            '@middleware': './src/middleware',
            '@utils': './src/utils',
            '@models': './src/models'
        }
        }]
    ],
    ignore: [
        '**/*.spec.ts'
    ]
}