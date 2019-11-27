
/* MINE
********************************/
var theme             = `oneezy-css`;
var url               = `oneezy-css`;

exports.themeName     = theme[0].toUpperCase() + theme.substring(1);
exports.themeLocation = `./`;
exports.themeBuild    = `./dist`;
exports.urlToPreview  = `http://${url}`;

/* REFERENCE PATHS
********************************/
// http://127.0.0.1/wordpress/wp-content/themes/fictional-university-theme/images/library-hero.jpg
// http://localhost:3000/wordpress/wp-content/themes/fictional-university-theme/images/library-hero.jpg



/* THERES
********************************
exports.themeLocation = './app/wp-content/themes/fictional-university-theme/';
exports.urlToPreview = 'http://fictional-university.test';
*/

// If you're using Local by Flywheel you will
// want your settings to be similar to the examples below:

// exports.themeLocation = './public/wp-content/themes/fictional-university-theme/';
// exports.urlToPreview = 'http://fictional-university.local/';

// Simply remove the two slashes at the front of those lines
// to uncomment them and then delete lines #1 and #2.

// Be SURE to update urlToPreview to YOUR domain and not mine.
// Be SURE to update themeLocation to YOUR theme folder name