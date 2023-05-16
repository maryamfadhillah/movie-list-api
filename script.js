$('#search-button').on('click', function() {

    $('#movie-list').html('');


    $.ajax({
        url: 'https://www.omdbapi.com/',
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
                            <a type="button" class="btn btn-primary detail-button" data-bs-toggle="modal" data-bs-target="#modal-detail" data-id="`+ data.imdbID +`">See Detail</a>
                        </div>
                        </div>
                    </div>

                    <div class="modal fade" id="modal-detail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 header-movie" id="exampleModalLabel"></h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <div class="content-movie"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
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

$('#movie-list').on('click', '.detail-button', function() {
    var movieId = $(this).data('id');

    $('.movie-content').html('');

    $.ajax({    
        url: 'https://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '195d42e6',
            'i': movieId
        },
        success: function (result) {
            if (result.Response == 'True') {
                $('.header-movie').html(result.Title)
                $('.content-movie').html(`
                <div class="row">
                    <div class="col">
                        <img src="`+ result.Poster +`" alt="`+ result.Poster +`" height="250px" width="auto">
                        <p><strong>`+ result.Title +`</strong><br>
                        Year : `+ result.Year +`<br>
                        Rated : `+ result.Rated +`<br>
                        Genre : `+ result.Genre +`<br>
                        Director : `+ result.Director +`<br>
                        Actors : `+ result.Actors +`</p>
                    </div>
                </div>
                `)
            } else {
                console.log('gagal');
            }
        }
    })
})