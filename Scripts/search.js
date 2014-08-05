$(document).ready(function () {
    SearchSite();
});

function SearchSite() {
    var search = $.url().param("search");
    search = search.toLowerCase();
    if (search != null && search != "") {
        var pages = [
            { title: "Anatomy", url: "anatomy.html" },
            { title: "Diet", url: "diet.html" },
            { title: "Interesting Facts", url: "facts.html" },
            { title: "Habitat", url: "habitat.html" },
            { title: "All About Ligers", url: "index.html" },
            { title: "Mating and Reproduction", url: "mating-and-reproduction.html" },
            { title: "Behavior", url: "behavior.html" }
        ];
        var results = [];

        $(pages).each(function () {
            var page = this;
            $.ajax({
                type: "GET",
                url: page.url,
                async: false,
                success: function (content) {
                    content = content.toLowerCase();
                    if (content.indexOf(search) > -1) {
                        results.push(page);
                    }
                },
                error: function (jqXHR) {}
            });
        });

        if (results.length > 0) {
            var html = "<p class='big-text'>" + results.length.toString() + " results for '" + search + "' found in:</p>";
            $(results).each(function () {
                html += "<div><a href='" + this.url + "'>" + this.title + "</p></div>"
            });
            $("#results").html(html);
        }
        else {
            $("#results").html("<p class='big-text'>No Results Found</p>");
        }
    }
    else {
        $("#results").html("<p class='big-text'>No Results Found</p>");
    }
}