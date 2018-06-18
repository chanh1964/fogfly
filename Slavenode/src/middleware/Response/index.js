const responseGenerator = (body: Object) => {
    // console.log("something")
    return (req, res) => {
        console.log("body");
        res.status(status).json(body);
    }

}
// const responseGenerator = (req, res) => {
//     console.log("something");
// }

export default responseGenerator;