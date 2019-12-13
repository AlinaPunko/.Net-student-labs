var testClasses = function() {
    $('#list').addClass('a b');
    setTimeout(() => {
        $('#list').removeClass(() => { return 'b'; });
    }, 2000);
}

var testAttr = function() {
    document.getElementById("result").value = "old value " + $('#list').attr('att1') + "\n";
    $('#list').attr({
        att1: "newattr1",
        att2: "newattr2"
    });
    document.getElementById("result").value += "new value " + $('#list').attr('att1');
}

var testCss = function() {
    document.getElementById("result").value = 'old value ' + $('#list').css('display') + '\n';
    $('#list').css({ display: 'inline' });
    document.getElementById("result").value += 'new value ' + $('#list').css('display');
}

var testText = function() {
    document.getElementById("result").value = $('#list').text();
    $('#list').text('new text');
}

var testClick = function() {
    $('#click_test').click(() => { alert('Hello!') });
}

var testChildren = function() {
    document.getElementById("result").value = $('#list').children();
}

var testEmpty = function() {
    $('#list').empty();
}

var testAppend = function() {
    $('#list').append(() => {
        return '<li id="#inserted">insert</li>'
    });
    setTimeout(() => {
        $('#list').remove('.li1');
    }, 2000);
}

var testWrap = function() {
    $('.wrapped-element').wrap('<div class="wrapping-element">Wrapping </div>');
}