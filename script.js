$('document').ready(function() {

    $("#form").submit(function(event) {
        event.preventDefault();
        $('#results').empty();
        $('#images').empty();
        $('h2').remove();
        var j = 0;
        var movie = $('#movie').val();
        var key = '2a2c8444adab25f6589b73bbc1372f9d';

        $.ajax({
            url: "https://api.themoviedb.org/3/search/movie?&query=" + movie,
            data: { 'api_key': key},
            contentType: "application/json",
            dataType: 'json',
            success: function(result) {
                if (result.results.length > 0) {
                    var message = '<h2>Posters for '+ movie +'</h2>';
                    $('#results').before(message);
                    for (i in result.results) {
                        id = result.results[i].id;
                        $.ajax({
                            url: 'https://api.themoviedb.org/3/movie/'+ id +'/images?api_key=' + key + '&language=en-US&include_image_language=en,null',
                            contentType: "application/json",
                            dataType: 'json',
                            success: function(res) {
                                for (x in res.posters) {
                                    var url = 'https://image.tmdb.org/t/p/w500/' + res.posters[x].file_path;

                                    var img = '<div class="poster">'+
                                                '<img class="img-fluid" data-target="#carousel" data-slide-to="'+j+'" src="'+ url +'">'+
                                                '</div>';
                                    $('#results').append(img);

                                    var active = '';
                                    if (j == 0) {
                                        active = 'active'
                                    }
                                    var modal = '<div class="carousel-item '+ active +'">'+
                                                    '<a href="'+ url +'" target="_blank" download>'+
                                                    '<img class="d-block" src="'+ url +'"></a>'+
                                                '</div>';
                                    $('#images').append(modal);

                                    j++;
                                }
                            }
                        })
                    }
                } else {
                    var errorMessage = '<h2>No posters found for '+ movie +'</h2>';
                    $('#results').before(errorMessage);
                }
            }
        })
    })

    $(document).bind('keyup', function(e) {
        if (e.which == 39) {
            $('.carousel').carousel('next');
        }
        else if (e.which == 37) {
            $('.carousel').carousel('prev');
        }
    });
})