var repl_counter = 0;

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
    replacement = `<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#jsrepdlg${repl_counter}">Shop ${repl_counter}</button>
<div id="jsrepdlg${repl_counter}" class="modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Shop ${repl_counter}</h3>
            </div>
            <div class="modal-body">
                ${replacement}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>`;
    repl_counter++;

    return this.html(function () {
        return $(this).html().replace(regex, replacement);
    });
};

$(document).ready(function () {
    $.getJSON('12.json', (data) => {
        for (let i = 0; i < data.modify.length; i++) {
            $(data.modify[i].selector).wrapInTag(data.modify[i]);
        }
    });
});
