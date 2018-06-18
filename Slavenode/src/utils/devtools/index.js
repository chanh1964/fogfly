export default {
    instanceToString: object => {
        Object.keys(object).map((attr, index) => {
            index == 0 && console.log("{")
            console.log("\t" + attr + " : " + object[attr])
            index == (Object.keys(object).length - 1) && console.log("}");
        })
    }
}