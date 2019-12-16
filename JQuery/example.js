const testClasses = function() {
    $('#list').addClass('flex-class background-class');
    setTimeout(() => {
        $('#list').removeClass(() => { return 'background-class'; });
    }, 2000);
}

const testAttr = function() {
    document.getElementById("result").value = "old value " + $('#list').attr('att1') + "\n";
    $('#list').attr({
        att1: "newattr1",
        att2: "newattr2"
    });
    document.getElementById("result").value += "new value " + $('#list').attr('att1');
}

const testCss = function() {
    document.getElementById("result").value = 'old value ' + $('#list').css('display') + '\n';
    $('#list').css({ display: 'inline' });
    document.getElementById("result").value += 'new value ' + $('#list').css('display');
}

const testText = function() {
    document.getElementById("result").value = $('#list').text();
    $('#list').text('new text');
}

const testClick = function() {
    $('#click_test').click(() => { alert('Hello!') });
}

const testChildren = function() {
    document.getElementById("result").value = $('#list').children();
}

const testEmpty = function() {
    $('#list').empty();
}

const testAppend = function() {
    $('#list').append(() => {
        return '<li id="#inserted">insert</li>'
    });
    setTimeout(() => {
        $('#list').remove('.li1');
    }, 2000);
}

const testWrap = function() {
    $('.wrapped-element').wrap('<div class="wrapping-element">Wrapping </div>');
}