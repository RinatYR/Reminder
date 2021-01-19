const state = JSON.parse(localStorage.getItem('state')) || [];

$('body').on('click', '.note__check', function(){
    const index = $(this).parent('.note').data('idx');
    state[index].checked = !state[index].checked;
    $(this).parent('.note').toggleClass('note_checked')
    saveNotes();
});

$('.add').click(function(){
    $('.editor').toggleClass('editor__show');
    $('.add').toggleClass('add_close');
});

function render(){
    $('.note-list').html(state.map(renderNote).join(''));
}

function renderNote(data, idx){
    return `
        <li class="note ${data.checked && 'note_checked'}" data-idx="${idx}">
            <div class="note__check">
                <div class="note__checkcircle"></div>
            </div>
            <div class="note__info">
                <h2 class="note__title">${data.title}</h2>
                <p class="note__preview">${data.text}</p>
                <span class="note__date">${data.date} ${data.time}</span>
            </div>
        </li>
    `;
}

$('.editor__form').submit(function(event){
    console.log($('.editor__date').val())
    event.preventDefault();
    state.push({
        checked: false,
        title: $('.editor__title').val(),
        text: $('.editor__content').val(),
        date: $('.editor__date').val(),
        time: $('.editor__time').val()
    });
    $('.editor__title').val('');
    $('.editor__content').val('');
    $('.editor__date').val('');
    $('.editor__time').val('');
    $('.editor').toggleClass('editor__show');
    $('.add').toggleClass('add_close');
    saveNotes();
    render();
});

function saveNotes(){
    const saveState = state.filter((note) => !note.checked);
    localStorage.setItem('state', JSON.stringify(saveState));
}

render();