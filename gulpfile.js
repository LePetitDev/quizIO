var gulp = require('gulp')
  , path = require('path')
  , webpack = require('webpack')
  , fs = require('fs')
  , sass = require('gulp-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , babel = require('gulp-babel')
  , ROOT_PATH = path.resolve(__dirname);

var webpackConfig = {
  // Configure the JS bundles that we need.
  entry: {
    webcam: path.resolve(ROOT_PATH, 'jsx/CamApp.jsx'),
    quizApp: path.resolve(ROOT_PATH, 'jsx/QuizApp.jsx'),
    overviewApp: path.resolve(ROOT_PATH, 'jsx/OverviewApp.jsx')
  },
  module: {
    // Run 'loaders' on the jsx to compile it into js that the browser understands.
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?stage=1'],
        include: path.resolve(ROOT_PATH, 'jsx/')
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?indentedSyntax'
      }
    ]
  },
  plugins: [],
  resolve: {
   extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.resolve(ROOT_PATH, 'public/js'),
    filename: '[name].js',
    // The app (port 3000) doesn't run on the same port as webpack (port 8080), so add this to enable communication with webpack's bundle.js and the app.
    publicPath: 'http://localhost:8080/'
  }
};

// Remove the following commented-out block when in production.
/*
webpackConfig.plugins = webpackConfig.plugins.concat(
  new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify("production")
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
);
*/

gulp.task('frontend-build', function(done) {
  webpack(webpackConfig).run(function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }
    done();
  });  
});

gulp.task('frontend-watch', function(done) {
  webpack(webpackConfig).run(function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }
    done();
  });  
});

gulp.task('es6', function () {
  return gulp.src('public/js/es6/**.js')
  .pipe(babel())
  .pipe(gulp.dest('./public/js'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/**.scss')
    .pipe(sass({
      // outputStyle: 'compressed',
      outputStyle: 'nested',
      sourceComments: 'map',
      includePaths: []
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('build', ['frontend-build']);
gulp.task('watch', function() {
  // gulp.watch('scss/*.scss', ['sass']);
  // gulp.watch('jsx/*.jsx', ['frontend-build']);
  gulp.watch('public/js/es6/*.js', ['es6']);
});
