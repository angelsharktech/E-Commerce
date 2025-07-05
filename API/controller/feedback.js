import feedback from "../model/feedback.js"

export const addFeedback = async (req, res, next) => {
    try {
        const result = await feedback(req.body).save()
        res.status(200).json({ msg: 'Thank You for connecting with us' })
    } catch (error) {
        next(error)
    }
}
export const getFeedback = async (req, res, next) => {
    try {
        const result = await feedback.find()
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}