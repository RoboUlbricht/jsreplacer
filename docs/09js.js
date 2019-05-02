$.fn.wrapInTag = function (opts) {

    let tag = opts.tag || '',
        words = opts.words || [],
        regex = RegExp(words.join('|'), 'gi');
    let links = [];
    for (let i = 0; i < opts.url.length; i++) {
        links.push('<a class="btn btn-primary btn-xs" href="' + opts.url[i].url + '">' + opts.url[i].name + '</a>');
    }
    links = links.join(', ');

    let tag_left = tag.length ?  `<${tag}>` : '';
    let tag_right = tag.length ?  `</${tag}>` : '';
    let wrap_left = opts.wrap ? opts.wrap[0] : '';
    let wrap_right = opts.wrap ? opts.wrap[1] : '';
    let replacement = `${tag_left}$&${tag_right} ${wrap_left}${links}${wrap_right}`;
    if(opts.origin==false)
        replacement = replacement.replace('$&', '');

    return this.html(function () {
        return $(this).html().replace(regex, replacement);
    });
};

$(document).ready(function () {
    $.getJSON('09.json', (data) => {
        for (let i = 0; i < data.modify.length; i++) {
            $(data.modify[i].selector).wrapInTag(data.modify[i]);
        }
    });
});
