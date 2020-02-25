// initialize with your api key. 
const Clarifai = require('clarifai');


const handleApiCall = (req, res) =>{
    const app = new Clarifai.App({
        apiKey: '40a4c9f4fa9f4cf2987ac1468de6b445'
       });
      
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => { 
            res.json(data)
        })
        .catch(err => res.state(400).json('Unable to work with API'))
};

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('unable to get entries'))
};

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};