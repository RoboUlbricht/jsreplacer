$.fn.wrapInTag = function (opts) {

    let tag = opts.tag || 'strong',
        words = opts.words || [],
        regex = RegExp(words.join('|'), 'gi');
    let links = [];
    for (let i = 0; i < opts.url.length; i++) {
        links.push('<a href="' + opts.url[i].url + '">' + opts.url[i].name + '</a>');
    }
    links = links.join(', ');

    let replacement = `<${tag}>$&</${tag}> (${links})`;

    return this.html(function () {
        return $(this).html().replace(regex, replacement);
    });
};

$(document).ready(function () {
    $.getJSON('08.json', (data) => {
        for (let i = 0; i < data.modify.length; i++) {
            $(data.modify[i].selector).wrapInTag(data.modify[i]);
        }
    });
});
