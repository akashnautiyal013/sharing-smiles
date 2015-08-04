
var blob = {
  url: 'https://www.filepicker.io/api/file/AMltoa8ATECOsFTMduLz',
  filename: 'hello.txt',
  mimetype: 'text/plain',
  isWriteable: true,
  size: 100
};

$('#big-freaking-button').click(function() {

    // Settings
    filepicker.pick({
        mimetype: 'image/*', /* Images only */
        maxSize: 1024 * 1024 * 5, /* 5mb */
        imageMax: [1500, 1500], /* 1500x1500px */
        cropRatio: 1/1, /* Perfect squares */
        services: ['*'] /* From anywhere */
    }, function(blob) {

        // Returned stuff for example
        var filename = blob.filename;
        var url = blob.url;
        var id = blob.id;
        var isWriteable = blob.isWriteable;
        var mimetype = blob.mimetype;
        var size = blob.size;

        // Save to a database somewhere
        // Alternatively you can have filepicker do it for you: https://www.filepicker.com/documentation/storage/
        $.ajax({
            url: '/api/links',
            type: 'POST',
            data: {
                url: blob.url
            },
            success: function(data) {

                // Response from storing the URL successfully
                console.log(data);

            }
        });

    });

});