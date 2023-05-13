$('#search-button').on('click', function() {

    $('#movie-list').html('');
    
    $.ajax({
        url: 'https://www.omdbapi.com/?',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '195d42e6',
            's': $('#search-input').val(),
        },
        success: function (result) {
            if (result.Response == 'True') {
                let movies = result.Search;

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                    <div class="col-md-3 py-3 px-3">
                        <div class="card">
                        <img src="`+ data.Poster +`" class="card-img-top" alt="..." height="460px">
                        <div class="card-body">
                            <h5 class="card-title">`+ data.Title +`</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                        </div>
                    </div>
                    `)
                })
            } else {
                $('#movie-list').html('<h1>Movie not found</h1>')
            }
        }
    });
});