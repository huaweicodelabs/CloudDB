module.exports = {
    resolve: {
        fallback: {
            "zlib": require.resolve("browserify-zlib"),
            "crypto": require.resolve("crypto-browserify"),
            "assert": require.resolve("assert"),
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util"),
            "buffer": require.resolve("buffer")
        }
    }
}