
import env from '@/helpers/env';
import { Movie, Scene } from 'json2video-sdk';
import randomColor from 'randomcolor';

const generateNewVideo = async (word: string) => {
    let movie = new Movie;
    movie.setAPIKey(env.JSON2Video);
    movie.set("comment", "Hello world example");
    movie.set("resolution", "full-hd");
    movie.set("quality", "high");
    movie.set("draft", false);

    // Create the scenes of the movie
    var color = randomColor();
    // Create SCENE 1
    let scene1 = new Scene;
    scene1.set("background-color", color);
    scene1.addElement(
        {
            "type": "text",
            "style": "002",
            "text": word,
            "settings": {
                "color": "white",
                "font-size": "10vw",
                "font-family": "Bebas Neue"
            },
            "duration": 5,
            "cache": true
        });
    movie.addScene(scene1);

    // Finally, render the movie
    const render = await movie.render();
    console.log(render);

    // Wait for the movie to be rendered
    const result = await movie.waitToFinish();

    console.log(result);

    return result;
}


export default generateNewVideo;