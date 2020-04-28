const Feedback = require('../models/Feedback');


exports.addFeedBack = async (req, res) => {
    const feedback = new Feedback({
        idUser: req.body.userId,
        name:req.body.name,
        text:req.body.text
    })

    feedback.save(err=>{
        if(err){
            res.end(JSON.stringify({status:'error'}))
        }
        res.end(JSON.stringify({status:'added'}))
    })
}

exports.getLatestFeedback = async (req, res) => {
    const feedback = await Feedback.find().sort({ _id: -1 }).limit(3)

    res.end(JSON.stringify(feedback));
}


