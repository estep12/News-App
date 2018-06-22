$.getJSON("/articles", (data) => {
    for(i = 0; i< data.length; i++){
        $("#card-body").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});