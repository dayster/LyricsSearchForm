import { API } from './api.js';
import * as UI from './ui.js';

UI.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const artistName = UI.artistInput.value, 
          songName = UI.songInput.value;
    
    if(artistName === '' || songName === ''){
        UI.messageDiv.innerHTML = 'Error...All fields are mandatory';
        UI.messageDiv.classList.add('error');
        setTimeout(() => {
            UI.messageDiv.innerHTML = '';
            UI.messageDiv.classList.remove('error');
        },3000);
    }else{
        // Query Rest Api
        const lyric = new API(artistName, songName);
        lyric.queryAPI()
            .then(data => {
                if(data.lyric.lyrics){
                    let result = data.lyric.lyrics;
                    UI.resultDiv.innerHTML = result;
                }else{
                    UI.messageDiv.innerHTML = 'No Lyrics Found';
                    UI.messageDiv.classList.add('error');
                    setTimeout(() => {
                        UI.messageDiv.innerHTML = '';
                        UI.messageDiv.classList.remove('error');
                        UI.searchForm.reset();
                    },3000);
                }
            })
            .catch(error => console.log(error));
        // 
    }
});