module.exports = {
    plugins: [
        {
            resolve: `gatsby-plugin-s3`,
            options: {
                bucketName: 'recipes.mschilton.com'
            }
        }
    ]
}