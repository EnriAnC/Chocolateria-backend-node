const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dkaopml9r',
    api_key: '666124196851649',
    api_secret: 'vJ2xTDcKNA7_-Mys3XDDFToO1a4',
    secure: true
});

module.exports = cloudinary;