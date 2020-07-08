$('document').ready(function() {
    $("#form").submit(function(event) {
        event.preventDefault();
        $('#results').empty();

        var movie = $('#movie').val();
        var key = '2a2c8444adab25f6589b73bbc1372f9d';
        $.ajax({
            url: "https://api.themoviedb.org/3/search/movie?&query=" + movie,
            data: { 'api_key': key},
            contentType: "application/json",
            dataType: 'json',
            success: function(result) {
                if (result.results.length > 0) {
                    for (i in result.results) {
                        id = result.results[i].id;
                        $.ajax({
                            url: 'https://api.themoviedb.org/3/movie/'+ id +'/images?api_key=' + key + '&language=en-US&include_image_language=en,null',
                            contentType: "application/json",
                            dataType: 'json',
                            success: function(res) {
                                console.log(res);
                                for (x in res.posters) {
                                    var url = 'https://image.tmdb.org/t/p/w500/' + res.posters[x].file_path;
                                    var img = '<img src="'+ url +'">';
                                    $('#results').append(img);
                                }
                            }
                        })
                    }
                } else {
                    var errorMessage = '<h2>No posters found :(</h2>';
                    $('#results').append(errorMessage);
                }
            }
        })
    })
})